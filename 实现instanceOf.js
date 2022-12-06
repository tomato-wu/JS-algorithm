function myInstanceOf(left, right) {
  let leftValue = left.__proto__;
  let rightValue = right.prototype;

  while (true) {
    if (leftValue == null) return false;
    if (leftValue === rightValue) {
      return true;
    }
    leftValue = leftValue.__proto__;
  }
}

function getType(type) {
  return Object.prototype.toString.call(type).slice(8, -1);
}

console.log(myInstanceOf(Object, Function));
console.log(getType(1));
