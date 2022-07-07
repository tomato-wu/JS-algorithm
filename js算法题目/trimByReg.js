/**
 * @description 使用正则模拟trim
 * @returns 
 */

String.prototype.trim1 = function() {
    const str = this;
    return str.replace(/(^\s*)|(\s*$)/g, "")
}

console.log('   hello world'.trim1());
console.log('   hello world  '.trim1() === 'hello world');