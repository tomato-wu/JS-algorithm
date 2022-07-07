let parent = {
  name: 'li',
  friends: ['ha','mo','gui'],
  getName:function(){
    return this.name;
  }
}

let person = object.create(parent);
person4.name = "tom";
person4.friends.push("jerry");
console.log(person4.name); // tom
console.log(person4.name === person4.getName()); // true


let person5 = Object.create(parent4);
person5.friends.push("lucy");
console.log(person5.name); // parent4

console.log(person4.friends); // ["p1", "p2", "p3","jerry","lucy"]
console.log(person5.friends); // ["p1", "p2", "p3","jerry","lucy"]

  // 缺点：因为Object.create方法实现的是浅拷贝，多个实例的引用类型属性指向相同的内存，存在篡改的可能
