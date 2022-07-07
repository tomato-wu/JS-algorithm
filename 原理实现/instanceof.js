/*
    instanceof 实现原理
*/

function _instanceof(L, R) {
    // 需要对 L 和 R 的类型进行验证
    if (L == null || R == null) {
        throw ('type of params are not true')
    }
    let left = L, right = R.prototype;
    while (left) {
        if (left.__proto__ === right) {
            return true
        }
        left = left.__proto__
    }
    return false;
}

function Person() {
    console.log('person constructor')
}

console.log(_instanceof(Person, Object))