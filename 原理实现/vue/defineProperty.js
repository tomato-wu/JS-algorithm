/*
    Object.defineProperty
    学习 Object.defineProperty 有助于我们对理解 Vue 的响应式有帮助
*/

function defineReactive(obj, key, val) {
    observe(val)  // 递归监听子属性的对象（性能问题）
    Object.defineProperty(obj, key, {
        get() {
            console.log('===get===', val)
            return val  // 数据返回
        },
        set(newVal) {
            if (newVal !== val) {
                observe(newVal) // 深度监听
            }
            console.log('===set===', newVal)
            val = newVal // 数据更新
        }
    })
}

function observe(obj) {
    if (obj == null || typeof obj !== 'object') {
        return
    }
    // 递归监听多个 key
    for (let key in obj) {
        defineReactive(obj, key, obj[key])
    }
}


// object.defineProperty 的劣势
const obj = {
    foo: "foo",
    bar: "bar"
}
observe(obj)
console.log(obj.foo) // 触发 get
obj.foo = 'hello world' // 触发 set
delete obj.foo  // 并不会触发
obj.jar = 'xxx' // 并不会触发


// 针对对象内部的数组，除了直接改变变量否则无法触发监听
const obj = {
    arr: [1, 2] // 除非直接改变 arr 引用
}
