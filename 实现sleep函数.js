function sleep(fn,wait) {
  if(typeof fn === 'function'){
    setTimeout(fn,wait)
  }
}
function output(){
  console.log(1);
}
sleep(output,3000);