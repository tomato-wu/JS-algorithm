// 第一题
function sayHi() {
  console.log(name); // undefined
  console.log(age); // ReferenceError: Cannot access 'age' before initialization
  var name = "Lyric";
  let age = 19;
}
sayHi();
