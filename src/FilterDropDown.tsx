/*
 * Copyright 2019-2020 SURF.
 */

import styles from './FilterDropDown.css'
import { EuiButton, EuiCheckbox, EuiPopover } from '@elastic/eui'

import React from 'react'
import { Filter } from './utils/types'

type filterCallback = (filter: Filter) => void

interface IProps {
  items: Filter[]
  filterBy: filterCallback
  selectAll?: (event: React.MouseEvent<HTMLElement>) => void
  label?: string
  noTrans?: boolean
}

interface IState {
  dropDownActive: boolean
}

export default class FilterDropDown extends React.PureComponent<
  IProps,
  IState
> {
  state: IState = { dropDownActive: false }

  renderDropDownItem = (item: Filter, filterBy: filterCallback) => {
    return (
      <li key={item.name} onClick={() => filterBy(item)}>
        <EuiCheckbox
          title={item.name}
          id={item.name}
          checked={item.selected}
          label={`${item.name} ${item.count}`}
          onChange={() => filterBy(item)}
        />
      </li>
    )
  }

  renderDropDown = (items: Filter[], filterBy: filterCallback) => (
    <ul className={styles.dropDown}>
      {items.map((item) => this.renderDropDownItem(item, filterBy))}
    </ul>
  )

  render() {
    const { items, filterBy } = this.props
    const { dropDownActive } = this.state
    const filtered = items.filter((item) => item.selected)
    const name = filtered.length === items.length ? 'ALL' : 'FILTERED'

    const button = (
      <EuiButton
        iconType={dropDownActive ? 'arrowUp' : 'arrowDown'}
        iconSide='right'
        fullWidth
        onClick={() => this.setState({ dropDownActive: !dropDownActive })}
      >
        {name}
      </EuiButton>
    )

    return (
      <EuiPopover
        button={button}
        isOpen={dropDownActive}
        closePopover={() => this.setState({ dropDownActive: false })}
        className={styles.filterButton}
      >
        {this.renderDropDown(items, filterBy)}
      </EuiPopover>
    )
  }
}
