function promiseAll(promises){
  if(!Array.isArray(promises)){
    throw new TypeError("promises must be an array")
  }

  return new Promise(function(resolve, reject){
    // 数组长度
    let promiseNum = promises.length;
    // 成功的数量
    let resolveCount  = 0;
    // 成功的值的数组
    let resolveValues = new Array(promiseNum);
    // 先遍历
    for(let i=0; i<promiseNum; i++){
      // 为什么不直接 promise[i].then, 因为promise[i]可能不是一个promise
      Promise.resolve(promises[i]).then(function(value){
        resolveValues[i] = value;
        resolveCount++;
        if(resolveCount == promiseNum){
          return resolve(resolveValues)
        }
      },
      function(err){
        return reject(err);
      }
      )
    }
  })
}