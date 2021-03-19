/*
 * Copyright 2019-2020 SURF.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import {
    IpPrefix,
    IpPrefixSubscription,

} from "../utils/types";

import axiosInstance from "./axios";

export function catchErrorStatus<T>(promise: Promise<any>, status: number, callback: (json: T) => void) {
    return promise.catch((err) => {
        if (err.response && err.response.status === status) {
            callback(err.response.data);
        } else {
            throw err;
        }
    });
}

function fetchJson<R = {}>(
    path: string,
    options = {},
    headers = {},
    showErrorDialog = true,
    result = true
): Promise<R> {
    return axiosFetch(path, options, headers, showErrorDialog, result);
}

// @ts-ignore
function axiosFetch<R = {}>(
  path: string,
  options = {},
  headers = {},
  showErrorDialog = true,
  result = true
): Promise<R> {
  // preset the config with the relative URL and a GET type.
  // presets can be overridden with `options`.
  console.log(headers, result)
  return axiosInstance({ url: path, method: "GET", ...options })
    .then((res) => res.data)
    .catch((err) => {
      if (showErrorDialog) {
        setTimeout(() => {
          throw err;
        }, 250);
      }
      throw err;
    });
}


// export function organisations(): Promise<Organization[] | undefined> {
//     //@ts-ignore
//     return fetchJson("crm/organisations", {}, {}, false).catch(() => {
//         setTimeout(() => {
//             setFlash(intl.formatMessage({ id: "external.errors.crm_unavailable" }, { type: "Organisations" }), "error");
//         });
//         return undefined;
//     });
// }

//IPAM the user-defined filters as configured in the database for the IP PREFIX product
//THIS ONE
export function prefix_filters(): Promise<IpPrefix[]> {
    return fetchJson("ipam/prefix_filters");
}

//THIS ONE
export function prefixSubscriptionsByRootPrefix(parentId: number): Promise<IpPrefixSubscription[]> {
    return fetchJson(`ipam/prefix_subscriptions/${parentId}`);
}

// THIS ONE
export function freeSubnets(supernet: string): Promise<string[]> {
    return fetchJson(`ipam/free_subnets/${supernet}`);
}

