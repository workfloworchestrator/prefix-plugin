import * as React from 'react'
import styles from './styles.module.css'

import Checkbox from './Checkbox'
import FilterDropDown from './FilterDropDown'
import Prefixes from './Prefixes'

import {Filter, SortOption, IpPrefixSubscription, IpPrefix } from './utils/types'
import {  freeSubnets,
  prefixSubscriptionsByRootPrefix,
  prefix_filters } from './api'

// Components
export { Checkbox, FilterDropDown, Prefixes }

// Types
export {Filter, SortOption, IpPrefixSubscription, IpPrefix }

// API stuff
export {freeSubnets, prefixSubscriptionsByRootPrefix, prefix_filters }

/* OLD EXAMPLE */
interface Props {
  text: string
}

export const ExampleComponent = ({ text }: Props) => {
  return <div className={styles.test}>Example Component: {text}</div>
}
