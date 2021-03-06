/*
 * Copyright 2019-2020 SURF.
 */

import styles from './Prefixes.css'

import { EuiFieldSearch } from '@elastic/eui'
import {
  freeSubnets,
  prefixSubscriptionsByRootPrefix,
  // eslint-disable-next-line camelcase
  prefixFilters,
  organisations,
  products
} from './api'
// @ts-ignore
import FilterDropDown from './FilterDropDown'
import constant from 'lodash/constant'
import debounce from 'lodash/debounce'
// @ts-ignore
import memoize from 'lodash/memoize'
import pMap from 'p-map'
import React from 'react'
import {
  Filter,
  IpPrefix,
  IpPrefixSubscription,
  Organization,
  Product,
  // Product,
  SortOption
} from './utils/types'
// @ts-ignore
import { isEmpty, isValidUUIDv4, stop } from './utils/Utils'
import {
  ipamStates,
  ipAddressToNumber,
  familyFullName,
  renderDate,
  organisationNameByUuid
} from './utils/Lookups'
interface ExtendedIpPrefixSubscription extends IpPrefixSubscription {
  customer: string
  // eslint-disable-next-line camelcase
  start_date_as_str: string
}

type Column =
  | 'customer'
  | 'sub_id'
  | 'description'
  | 'fam'
  | 'len'
  | 'prefix'
  | 'parent'
  | 'state'
  | 'start_date'

// interface IProps extends WrappedComponentProps {}
interface IProps {
  organisations?: Organization[]
  products?: Product[]
}

// @ts-ignore
interface FilterAttributes {
  state: Filter[]
  rootPrefix: Filter[]
}

interface IState {
  prefixes: ExtendedIpPrefixSubscription[]
  organisations: Organization[] | undefined
  products: Product[] | undefined
  query: string
  searchResults: ExtendedIpPrefixSubscription[]
  sortOrder: SortOption<Column>
  filterAttributes: FilterAttributes
  rootPrefixes: IpPrefix[]
  availablePrefixId: number
}

class Prefixes extends React.PureComponent<IProps, IState> {
  // context!: React.ContextType<typeof ApplicationContext>
  state: IState = {
    prefixes: [],
    organisations: this.props.organisations,
    products: this.props.products,
    query: '',
    searchResults: [],
    sortOrder: { name: 'prefix', descending: false },
    filterAttributes: {
      state: ipamStates
        .filter((s) => s)
        .map((state) => ({
          name: state || '',
          selected: state === 'Allocated',
          count: 0
        })),
      rootPrefix: []
    },
    rootPrefixes: [],
    availablePrefixId: 10000
  }

  componentDidMount() {
    // Not sure if we need to reset it?
    // this.setState({})

    if (this.state.organisations === undefined) {
      // fetch organisations ourselves
      console.log(
        'Prefixes:: No organisations props found => handling fetching of organisations internally'
      )
      this.getOrganisations().then()
    }

    if (this.state.products === undefined) {
      // fetch organisations ourselves
      console.log(
        'Prefixes:: No products props found => handling fetching of products internally'
      )
      this.getProducts().then()
    }

    prefixFilters().then((result) => {
      // @ts-ignore
      const prefixFilters = result.map((p, idx) => ({
        name: p.prefix,
        selected: idx === 0,
        count: 0
      }))
      const currentFilterAttributes = this.state.filterAttributes
      const modifiedAttributes = { rootPrefix: prefixFilters }
      this.setState({
        rootPrefixes: result,
        filterAttributes: { ...currentFilterAttributes, ...modifiedAttributes }
      })
      this.getFreePrefixes(result)
      this.getPrefixSubscriptions(result).then()
    })
  }

  componentDidUpdate(_prevProps: IProps, prevState: IState) {
    if (this.state.prefixes !== prevState.prefixes) {
      this.debouncedCount()
    }
  }

  getOrganisations = async () => {
    await organisations().then((result) =>
      this.setState({ organisations: result })
    )
  }

  getProducts = async () => {
    await products().then((result) => this.setState({ products: result }))
  }

  getPrefixSubscriptions = async (roots: IpPrefix[]) => {
    // @ts-ignore
    const { organisations } = this.state
    const mapper = async (root: IpPrefix) => {
      await prefixSubscriptionsByRootPrefix(root.id)
        .then((result) =>
          result.map((prefix) => {
            // eslint-disable-next-line camelcase
            const { customer_id, start_date, subscription_id } = prefix
            const organisation =
              customer_id === undefined
                ? 'Unknown'
                : organisationNameByUuid(customer_id, organisations)
            const subscription =
              subscription_id === undefined ? 'Unknown' : subscription_id
            return {
              ...prefix,
              subscription_id: subscription,
              start_date_as_str: renderDate(start_date),
              // start_date_as_str: 'test date',
              customer: organisation
            }
          })
        )
        .then((result) => {
          // deduping is added as a temporary fix removing the IP "root_prefix" filter
          // a more thorough redesign is called for in wf-client ticket #255
          this.setState((prevState) => {
            let newPrefixes = prevState.prefixes.concat(result)
            newPrefixes = Array.from(new Set(newPrefixes.map((p) => p.id))).map(
              (id) => {
                return newPrefixes.find((s) => s.id === id)!
              }
            )
            return { prefixes: newPrefixes }
          })
        })
        .catch(() => {
          console.log(`failed to load prefix ${root.id}`)
        })
    }
    // @ts-ignore
    return await pMap(roots, mapper, { concurrency: 2, stopOnError: false })
  }

  getFreePrefixes = (roots: IpPrefix[]) => {
    const now = Math.floor(Date.now() / 1000)
    const nowString = renderDate(now)
    return roots.map((p) =>
      freeSubnets(p.prefix).then((result) => {
        const { availablePrefixId } = this.state
        const free = result.map((r, idx) => {
          const [networkAddress, prefixlen] = r.split('/')
          return {
            id: availablePrefixId + idx,
            customer: 'N/A',
            subscription_id: 'N/A',
            start_date: now,
            start_date_as_str: nowString,
            description: 'Vrije ruimte - gegenereerd',
            family: p.version,
            prefix: r,
            network_address_as_int: ipAddressToNumber(networkAddress),
            prefixlen: parseInt(prefixlen, 10),
            parent: p.prefix,
            state: ipamStates.indexOf('Free'),
            version: 4,
            name: '',
            product: {} as Product,
            product_id: '',
            status: '',
            insync: false,
            customer_id: '',
            end_date: now,
            note: ''
          } as ExtendedIpPrefixSubscription
        })
        this.setState((prevState) => ({
          prefixes: prevState.prefixes.concat(free),
          availablePrefixId: prevState.availablePrefixId + free.length
        }))
      })
    )
  }

  count = () => {
    const { prefixes, filterAttributes } = this.state
    const { state, rootPrefix } = filterAttributes
    const stateCount = state.map((attr) => {
      const newCount = prefixes.reduce((acc, p) => {
        return ipamStates[p.state] === attr.name ? acc + 1 : acc
      }, 0)
      return newCount === attr.count ? attr : { ...attr, count: newCount }
    })
    const rootPrefixCount = rootPrefix.map((attr) => {
      const newCount = prefixes.reduce((acc, p) => {
        return p.parent === attr.name ? acc + 1 : acc
      }, 0)
      return newCount === attr.count ? attr : { ...attr, count: newCount }
    })
    this.setState({
      filterAttributes: {
        state: stateCount,
        rootPrefix: rootPrefixCount
      }
    })
  }

  debouncedCount = debounce(this.count, 1500, {
    leading: true,
    trailing: true
  })

  setFilter = (filterName: 'state' | 'rootPrefix') => (item: Filter) => {
    const currentFilterAttributes = this.state.filterAttributes
    var modifiedAttributes: Partial<FilterAttributes> = {}
    modifiedAttributes[filterName] = currentFilterAttributes[filterName].map(
      (attr) => {
        if (attr.name === item.name) {
          attr.selected = !attr.selected
        }
        return attr
      }
    )
    this.setState({
      filterAttributes: { ...currentFilterAttributes, ...modifiedAttributes }
    })
  }

  singleSelectFilter = (filterName: 'state' | 'rootPrefix') => (
    e: React.MouseEvent<HTMLElement>,
    item: Filter
  ) => {
    stop(e)
    const currentFilterAttributes = this.state.filterAttributes
    var modifiedAttributes: Partial<FilterAttributes> = {}
    modifiedAttributes[filterName] = currentFilterAttributes[filterName].map(
      (attr) => {
        if (attr.name !== item.name && attr.selected) {
          attr.selected = false
        } else if (attr.name === item.name && !attr.selected) {
          attr.selected = true
        }
        return attr
      }
    )
    this.setState({
      filterAttributes: { ...currentFilterAttributes, ...modifiedAttributes }
    })
  }

  selectAll = (filterName: 'state' | 'rootPrefix') => (
    e: React.MouseEvent<HTMLElement>
  ) => {
    stop(e)
    const currentFilterAttributes = this.state.filterAttributes
    var modifiedAttributes: Partial<FilterAttributes> = {}
    modifiedAttributes[filterName] = currentFilterAttributes[filterName].map(
      (attr) => {
        if (!attr.selected) {
          attr.selected = true
        }
        return attr
      }
    )
    this.setState({
      filterAttributes: { ...currentFilterAttributes, ...modifiedAttributes }
    })
  }

  filter = (unfiltered: ExtendedIpPrefixSubscription[]) => {
    const { state } = this.state.filterAttributes
    return unfiltered.filter((prefix) => {
      const stateFilter = state.find(
        (attr) => ipamStates.indexOf(attr.name) === prefix.state
      )

      return stateFilter ? stateFilter.selected : true
    })
  }

  sortBy = (name: Column) => (
    a: ExtendedIpPrefixSubscription,
    b: ExtendedIpPrefixSubscription
  ) => {
    console.log(a, b, name)
    // const aSafe = a[name] === undefined ? '' : a[name]
    // const bSafe = b[name] === undefined ? '' : b[name]
    // if (name === 'prefix') {
    //   return a.network_address_as_int - b.network_address_as_int
    // } else if (name === 'state') {
    //   return (ipamStates[a[name]] ?? '').localeCompare(
    //     ipamStates[b[name]] ?? ''
    //   )
    // } else {
    //   return typeof aSafe === 'string' || typeof bSafe === 'string'
    //     ? (aSafe as string)
    //         .toLowerCase()
    //         .localeCompare(bSafe.toString().toLowerCase())
    //     : aSafe - bSafe
    // }
  }

  toggleSort = (name: Column) => (
    e: React.MouseEvent<HTMLTableHeaderCellElement>
  ) => {
    stop(e)
    const sortOrder = { ...this.state.sortOrder }
    sortOrder.descending =
      sortOrder.name === name ? !sortOrder.descending : false
    sortOrder.name = name
    this.setState({ sortOrder: sortOrder })
  }

  sort = (unsorted: ExtendedIpPrefixSubscription[]) => {
    // const { name, descending } = this.state.sortOrder
    // const sorted = unsorted.sort(this.sortBy(name))
    // if (descending) {
    //   sorted.reverse()
    // }
    // return sorted
    return unsorted
  }

  search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    this.setState({ query: query })
    this.debouncedRunQuery(query)
  }

  runQuery = (query: string) => {
    console.log(query)
    const { prefixes } = this.state
    const queryToLower = query.toLowerCase()
    const results = prefixes.filter((prefix) => {
      return (
        prefix.prefix.toLowerCase().includes(queryToLower) ||
        prefix.customer.toLowerCase().includes(queryToLower) ||
        (prefix.description !== null &&
          prefix.description.toLowerCase().includes(queryToLower)) ||
        ipamStates[prefix.state]?.toLowerCase().includes(queryToLower) ||
        queryToLower === familyFullName[prefix.family].toLowerCase() ||
        prefix.start_date_as_str.includes(query)
      )
    })
    this.setState({ searchResults: results })
  }

  debouncedRunQuery = debounce(this.runQuery, 800)

  sortColumnIcon = (name: string, sorted: SortOption) => {
    if (sorted.name === name) {
      return (
        <i
          className={sorted.descending ? 'fas fa-sort-down' : 'fas fa-sort-up'}
        />
      )
    }
    return <i />
  }

  subscriptionLink = (selection: ExtendedIpPrefixSubscription) => (
    _event: React.MouseEvent<HTMLTableRowElement>
  ) => {
    // eslint-disable-next-line camelcase
    const { products } = this.state
    const { subscription_id, prefix, prefixlen } = selection
    // eslint-disable-next-line camelcase
    const product_id = memoize(
      constant(
        // @ts-ignore
        products
          .filter((p: any) => p.tag === 'IP_PREFIX')
          .map((p: any) => p.product_id)
          .pop()
      )
    )()
    if (isValidUUIDv4(subscription_id)) {
      window.location.href = '/subscriptions/' + subscription_id
    } else if (subscription_id === 'N/A') {
      const network = prefix.split('/')[0]
      window.location.href = `new-process/?product=${product_id}&prefix=${network}&prefixlen=${prefixlen}&prefix_min=${prefixlen}`
    }
  }

  render() {
    // const { intl } = this.props
    const columns: Column[] = [
      'customer',
      'sub_id',
      'description',
      'fam',
      'len',
      'prefix',
      'parent',
      'state',
      'start_date'
    ]
    const th = (index: number) => {
      const name = columns[index]
      console.log(name)
      return (
        <th
          key={index}
          className={styles[name]}
          onClick={this.toggleSort(name)}
        >
          <span>{name}</span>
          {this.sortColumnIcon(name, this.state.sortOrder)}
        </th>
      )
    }
    const { prefixes, query, searchResults, filterAttributes } = this.state
    const filteredPrefixes = isEmpty(query)
      ? this.filter(prefixes)
      : this.filter(searchResults)
    // @ts-ignore
    const sortedPrefixes = this.sort(filteredPrefixes)
    return (
      <div>
        <div className={styles.options}>
          <FilterDropDown
            items={filterAttributes.state}
            filterBy={this.setFilter('state')}
            selectAll={this.selectAll('state')}
            label='prefixes.filters.state'
          />

          <EuiFieldSearch
            placeholder='search'
            value={query}
            onChange={this.search}
            isClearable
            fullWidth
          />
        </div>
        <div>
          <table>
            <thead>
              <tr>{columns.map((_column, index) => th(index))}</tr>
            </thead>
            <tbody>
              {sortedPrefixes.map((prefix) => (
                <tr
                  key={prefix.id}
                  onClick={this.subscriptionLink(prefix)}
                  className={
                    prefix.state === 1
                      ? styles.Allocated
                      : prefix.state === 2
                      ? styles.Planned
                      : styles.Free
                  }
                >
                  <td data-label='customer' className={styles.customer}>
                    {prefix.customer}
                  </td>
                  <td data-label='subscription_id' className={styles.sub_id}>
                    {prefix.subscription_id.substring(0, 8)}
                  </td>
                  <td data-label='description' className={styles.description}>
                    {prefix.description}
                  </td>
                  <td data-label='fam' className={styles.fam}>
                    {prefix.family}
                  </td>
                  <td data-label='len' className={styles.len}>
                    /{prefix.prefixlen}
                  </td>
                  <td data-label='prefix' className={styles.prefix}>
                    {prefix.prefix}
                  </td>
                  <td data-label='parent' className={styles.parent}>
                    {prefix.parent}
                  </td>
                  <td data-label='state' className={styles.status}>
                    {prefix.state}
                  </td>
                  <td data-label='start_date' className={styles.start_date}>
                    {prefix.start_date_as_str}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

// Prefixes.contextType = ApplicationContext

// export default injectIntl(Prefixes)
export default Prefixes
