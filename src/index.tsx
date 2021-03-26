import * as React from 'react'
// import styles from './styles.module.css'

import './Prefixes.css'

import Checkbox from './Checkbox'
import FilterDropDown from './FilterDropDown'
import Prefixes from './Prefixes'

import {
  Filter,
  SortOption,
  IpPrefixSubscription,
  IpPrefix
} from './utils/types'
import {
  freeSubnets,
  prefixSubscriptionsByRootPrefix,
  prefix_filters
} from './api'

// Components
export { Checkbox, FilterDropDown, Prefixes }

// Types
export { Filter, SortOption, IpPrefixSubscription, IpPrefix }

// API stuff
export { freeSubnets, prefixSubscriptionsByRootPrefix, prefix_filters }

// TODO: ff goed kijken naar https://github.com/tabler/tabler-react/blob/master/src/index.js

/* OLD EXAMPLE */
interface Props {
  text: string
}

export const ExampleComponent = ({ text }: Props) => {
  return <div>Example Component: {text}</div>
}
