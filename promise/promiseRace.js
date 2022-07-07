// function promiceRaces(promises){

//   if(!Array.isArray(promises)){
//     throw new TypeError("promise must be an array")
//   }
//   return new Promise(function(resolve, reject){
//     promises.forEach( p =>
//       Promise.resolve(p).then(data=>{
//         resolve(data)
//       },err =>{
//         reject(err)
//       }
//       )
      
//       )
//   })

// }


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