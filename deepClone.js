// 简单版本
function deepClone1(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// 面试版本
// function deepClone(obj) {

//   if(typeof obj !== 'object' && obj == null){

//     return obj;

//   }

//   let copy = {}
//   if(obj.Constructor === Array){
//     copy = []
//   }
//   for(let key in obj){
//     if(obj.hasOwnProperty(key)){
//       copy[key] = deepClone(obj[key])
//     }
//   }

// }

function deepClone(obj = {}){
  if(typeof obj !== 'object' && obj == null){
    return obj;
  }

  let result

  if(obj instanceof Array){
    result = []
  }else{
    result = {}
  }

  for(let key in obj){
  if(obj.hasOwnProperty(key)){
    result[key] = deepClone(obj[key]);
  }    
  }

  return result;

}

obj = {
  name:'kunyuan',
  age:15,
  da:{
    name:'45'
  }
};

let newObj = deepClone(obj);
newObj.name = 'laj';
newObj.da.name = 'aaaaaaaa'
console.log(obj);
console.log(newObj);