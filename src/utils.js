export function getObjVal(obj, key) {
  return isPlainObject(obj) && key ? obj[key] : obj
}

export function isPromise(val) {
  return (
    !!val &&
    (typeof val === 'object' || typeof val === 'function') &&
    typeof val.then === 'function'
  )
}

export function isArray(val) {
  return Array.isArray(val)
}

export function isFunction(val) {
  return typeof val === 'function'
}

export function isPlainObject(val) {
  if (typeof val !== 'object') return false
  return (
    val.constructor === Object &&
    Object.getPrototypeOf(val) === Object.prototype
  )
}
