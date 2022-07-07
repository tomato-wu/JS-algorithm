Function.prototype.myBind = function (context, ...outerArgs) {
  // this->func context->obj outerArgs->[10,20]
  let self = this

  // 返回一个函数
  return function F(...innerArgs) { //返回了一个函数，...innerArgs为实际调用时传入的参数
    // 考虑new的方式
    if(self instanceof F) {
      return new self(...outerArgs, ...innerArgs)
    }
    // 把func执行，并且改变this即可
    return self.apply(context, [...outerArgs, ...innerArgs]) //返回改变了this的函数，参数合并
  }
}