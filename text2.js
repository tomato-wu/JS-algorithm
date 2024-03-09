function myNew(Fn, ...args) {
  let obj = {}
  obj.__proto__ = Fn.prototype
  let res = Fn.apply(obj, args)
  return res instanceof Object ? res : obj
}