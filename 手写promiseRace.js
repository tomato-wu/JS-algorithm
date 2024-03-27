
function PromiseRace(promises) {

  if(promises instanceof Array){
    throw new TypeError("promises must be an array")
  }

  return new Promise(function(resole,reject){
    promises.forEach( item =>{
        Promise.resolve(item).then(data=>{
          resole(data)
        },
        err =>{
          reject(err)
        }
        )
    })
  })

}