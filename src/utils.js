export function isPromise(val) {
  return (
    !!val &&
    (typeof val === 'object' || typeof val === 'function') &&
    typeof val.then === 'function'
  )
}

export function isFunction(val) {
  return typeof val === 'function'
}

export function isArray(val) {
  return Array.isArray(val)
}

export function getOptionVal(option, key) {
  return key ? option[key] : option
}
