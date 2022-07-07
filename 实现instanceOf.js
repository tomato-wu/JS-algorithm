

function myInstanceOf(left,right) {

  let leftValue = left.__proto__;
  let rightValue = right.prototype;;
  while(true){
      if(leftValue == null){
        return false;
      }
      if(leftValue == rightValue){
        return true;
      }
      leftValue = leftValue.__proto__;
  }
}

console.log(myInstanceOf(1,Number));
