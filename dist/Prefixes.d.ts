/// <reference types="lodash" />
import React from 'react';
import { Filter, IpPrefix, IpPrefixSubscription, Organization, Product, SortOption } from './utils/types';
interface ExtendedIpPrefixSubscription extends IpPrefixSubscription {
    customer: string;
    start_date_as_str: string;
}
declare type Column = 'customer' | 'sub_id' | 'description' | 'fam' | 'len' | 'prefix' | 'parent' | 'state' | 'start_date';
interface IProps {
    organisations?: Organization[];
    products?: Product[];
}
interface FilterAttributes {
    state: Filter[];
    rootPrefix: Filter[];
}
interface IState {
    prefixes: ExtendedIpPrefixSubscription[];
    organisations: Organization[] | undefined;
    products: Product[] | undefined;
    query: string;
    searchResults: ExtendedIpPrefixSubscription[];
    sortOrder: SortOption<Column>;
    filterAttributes: FilterAttributes;
    rootPrefixes: IpPrefix[];
    availablePrefixId: number;
}
declare class Prefixes extends React.PureComponent<IProps, IState> {
    state: IState;
    componentDidMount(): void;
    componentDidUpdate(_prevProps: IProps, prevState: IState): void;
    getOrganisations: () => Promise<void>;
    getProducts: () => Promise<void>;
    getPrefixSubscriptions: (roots: IpPrefix[]) => Promise<void[]>;
    getFreePrefixes: (roots: IpPrefix[]) => Promise<void>[];
    count: () => void;
    debouncedCount: import("lodash").DebouncedFunc<() => void>;
    setFilter: (filterName: 'state' | 'rootPrefix') => (item: Filter) => void;
    singleSelectFilter: (filterName: 'state' | 'rootPrefix') => (e: React.MouseEvent<HTMLElement>, item: Filter) => void;
    selectAll: (filterName: 'state' | 'rootPrefix') => (e: React.MouseEvent<HTMLElement>) => void;
    filter: (unfiltered: ExtendedIpPrefixSubscription[]) => ExtendedIpPrefixSubscription[];
    sortBy: (name: Column) => (a: ExtendedIpPrefixSubscription, b: ExtendedIpPrefixSubscription) => void;
    toggleSort: (name: Column) => (e: React.MouseEvent<HTMLTableHeaderCellElement>) => void;
    sort: (unsorted: ExtendedIpPrefixSubscription[]) => ExtendedIpPrefixSubscription[];
    search: (e: React.ChangeEvent<HTMLInputElement>) => void;
    runQuery: (query: string) => void;
    debouncedRunQuery: import("lodash").DebouncedFunc<(query: string) => void>;
    sortColumnIcon: (name: string, sorted: SortOption) => JSX.Element;
    subscriptionLink: (selection: ExtendedIpPrefixSubscription) => (_event: React.MouseEvent<HTMLTableRowElement>) => void;
    render(): JSX.Element;
}
export default Prefixes;
