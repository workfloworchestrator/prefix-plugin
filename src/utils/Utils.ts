/*
 * Copyright 2019-2020 SURF.
 */

export function stop(e: React.SyntheticEvent) {
  if (e !== undefined && e !== null) {
    e.preventDefault()
    e.stopPropagation()
  }
}

export function isEmpty(obj: any) {
  if (obj === undefined || obj === null) {
    return true
  }
  if (Array.isArray(obj)) {
    return obj.length === 0
  }
  if (typeof obj === 'string') {
    return obj.trim().length === 0
  }
  if (typeof obj === 'object') {
    return Object.keys(obj).length === 0
  }
  return false
}

const UUIDv4RegEx = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
export function isValidUUIDv4(id: string) {
  return UUIDv4RegEx.test(id)
}
