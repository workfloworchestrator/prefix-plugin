import { Organization, Product, SubscriptionWithDetails } from './types';
export declare function organisationNameByUuid(uuid: string, organisations?: Organization[]): string;
export declare function enrichSubscription(subscription: Partial<SubscriptionWithDetails>, organisations: Organization[] | undefined, products: Product[]): SubscriptionWithDetails;
export declare function productNameById(id: string, products: Product[]): string;
export declare function productTagById(id: string, products: Product[]): string;
export declare function productById(id: string, products: Product[]): Product;
export declare function renderDateTime(epoch: number): string;
export declare function renderDate(epoch: number): string;
export declare function capitalize(s: string): string;
export declare const ipamStates: (string | null)[];
export declare const familyFullName: string[];
export declare function ipAddressToNumber(ipAddress: string): number;
