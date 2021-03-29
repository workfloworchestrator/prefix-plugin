import { IpPrefix, IpPrefixSubscription, Organization, Product } from '../utils/types';
export declare function catchErrorStatus<T>(promise: Promise<any>, status: number, callback: (json: T) => void): Promise<any>;
export declare function organisations(): Promise<Organization[] | undefined>;
export declare function products(): Promise<Product[]>;
export declare function prefixFilters(): Promise<IpPrefix[]>;
export declare function prefixSubscriptionsByRootPrefix(parentId: number): Promise<IpPrefixSubscription[]>;
export declare function freeSubnets(supernet: string): Promise<string[]>;
