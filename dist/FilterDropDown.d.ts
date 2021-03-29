import React from 'react';
import { Filter } from './utils/types';
declare type filterCallback = (filter: Filter) => void;
interface IProps {
    items: Filter[];
    filterBy: filterCallback;
    selectAll?: (event: React.MouseEvent<HTMLElement>) => void;
    label?: string;
    noTrans?: boolean;
}
interface IState {
    dropDownActive: boolean;
}
export default class FilterDropDown extends React.PureComponent<IProps, IState> {
    state: IState;
    renderDropDownItem: (item: Filter, filterBy: filterCallback) => JSX.Element;
    renderDropDown: (items: Filter[], filterBy: filterCallback) => JSX.Element;
    render(): JSX.Element;
}
export {};
