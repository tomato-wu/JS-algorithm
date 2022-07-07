

// 实现
Function.prototype.myApply = function(context=globalThis,...args){

  let key = Symbol('key');
  context[key] = this;
  let result = context[key](args);
  delete context[key];
  return result;
}

function f(a,b){
  console.log(a+b)
  console.log(this.name)
 }

 let obj={
  name:'张三'
 }
 f.myApply(obj,[1,2])
