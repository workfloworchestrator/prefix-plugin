/*
 * Copyright 2020-2021 SURF.
 */

import axios from 'axios'

// import { ENV } from "../env";

// const apiPath = ENV.BACKEND_URL + "/api/";
const apiPath = 'http://localhost:8080/api/'

// basic configuration for axios.
// the 'Authorization' header is set in
// index.ts:setUser
const axiosConfig = {
  baseURL: apiPath,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    post: {
      'Content-Type': 'application/json'
    },
    put: {
      'Content-Type': 'application/json'
    }
  }
}

const axiosInstance = axios.create(axiosConfig)

export default axiosInstance
