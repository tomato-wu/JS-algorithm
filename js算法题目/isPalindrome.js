/**
 * @description 判断是否回文
 */

function isPalindrome(str) {
  const strCompare = str.split("").reverse().join("");
  return strCompare === str ? true : false;
}

function isPalindrome2(str) {
  if (!str || str.length < 2) {
    return;
  }

  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[str.length - 1 - i]) {
      return false;
    }
  }

  return true;
}
console.log(isPalindrome2("madama"));
