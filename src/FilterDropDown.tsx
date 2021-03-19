/*
 * Copyright 2019-2020 SURF.
 */

// import "./FilterDropDown.scss";

import CheckBox from './CheckBox'
import React from 'react'
// import { FormattedMessage } from "react-intl";
import { Filter } from './utils/types'

type filterCallback = (filter: Filter) => void

interface IProps {
  items: Filter[]
  filterBy: filterCallback
  singleSelectFilter?: (
    event: React.MouseEvent<HTMLElement>,
    filter: Filter
  ) => void
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
    const { singleSelectFilter } = this.props
    // const name = noTrans ? (
    //   item.name
    // ) : (
    //   <FormattedMessage id={`filter.${item.name.replace(/ /g, '_')}`} />
    // )
    const name = item.name
    if (singleSelectFilter) {
      return (
        <li key={item.name} onClick={() => filterBy(item)}>
          <CheckBox
            name={item.name}
            value={item.selected}
            onChange={() => filterBy(item)}
          />
          <label htmlFor={item.name}>
            {name}
            {` (${item.count})`}
          </label>
          <i
            className='fa fa-filter'
            onClick={(e) => singleSelectFilter(e, item)}
          />
        </li>
      )
    }
    return (
      <li key={item.name} onClick={() => filterBy(item)}>
        <CheckBox
          name={item.name}
          value={item.selected}
          onChange={() => filterBy(item)}
        />
        <label htmlFor={item.name}>
          {name}
          {` (${item.count})`}
        </label>
      </li>
    )
  }

  renderDropDown = (items: Filter[], filterBy: filterCallback) => (
    <ul className='drop-down'>
      {items.map((item) => this.renderDropDownItem(item, filterBy))}
    </ul>
  )

  render() {
    const { items, filterBy, label, selectAll } = this.props
    const { dropDownActive } = this.state
    const filtered = items.filter((item) => item.selected)
    // const count = filtered.reduce((acc, item) => item.count, 0)
    // const name =
    //   filtered.length === items.length ? (
    //     <FormattedMessage id='filter.all' values={{ count: count }} />
    //   ) : (
    //     <FormattedMessage id='filter.selected' values={{ count: count }} />
    //   )
    const name = filtered.length === items.length ? 'all' : 'selected'
    const faIcon = dropDownActive ? 'fa-caret-up' : 'fa-caret-down'
    return (
      <section className='filter-drop-down'>
        <div
          className='filtered'
          onClick={() => this.setState({ dropDownActive: !dropDownActive })}
        >
          <span className='filter-label'>{label}</span>
          <span className='filter-label-divider'>:</span>
          <span className='filter-name'>{name}</span>
          <span>
            {filtered.length !== items.length && selectAll && (
              <i className='fa fa-undo' onClick={selectAll} />
            )}
            <i className={`fa ${faIcon}`} />
          </span>
        </div>
        {dropDownActive && this.renderDropDown(items, filterBy)}
      </section>
    )
  }
}
