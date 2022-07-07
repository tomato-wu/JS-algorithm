

Function.prototype.newCall = function(context=globalThis,...args) {

  let key = Symbol('key')
  context[key] = this
  let result = context[key](...args)
  delete context[key]
  return result;  
}
function f(a,b){
  console.log(a+b)
  console.log(this.name)
 }

 let obj={
  name:1
 }
 f.newCall(obj,1,2)