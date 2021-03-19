export interface Filter {
  name: string
  count: number
  selected: boolean
}

export interface SortOption<nameStrings = string> {
  name: nameStrings;
  descending: boolean;
}



export interface Subscription {
  name: string;
  subscription_id: string;
  description: string;
  product: any;
  product_id: string;
  status: string;
  insync: boolean;
  customer_id: string;
  start_date: number;
  end_date: number;
  note: string;
}


export interface IpPrefixSubscription extends Subscription {
  id: number;
  prefix: string;
  description: string;
  state: number;
  parent: string;
  version: number;
  prefixlen: number;
  family: number;
  network_address_as_int: number;
}

export interface IpPrefix {
  id: number;
  prefix: string;
  version: number;
}
