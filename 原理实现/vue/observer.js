/*
    vue 的双向绑定是基于数据劫持 + 发布订阅模式来实现
    数据劫持在 vue2 中主要使用 Object.defineProperty
    在 vue3 中主要使用 Proxy
    它们之间的优缺点点对比需要去了解
*/


/**
 * 实现一个 Observer
 */

function Observer(data) {
    // this.data = data
    // this.walk(data)
}

Observer.prototype = {
    walk: function(data) {
        var self = this
        Object.keys(data).forEach(function(key) {
            self.defineReactive(data, key, data[key])
        })
    },

    defineReactive(data, key, val) {
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get() {
                console.log('===get===', val)
                return val
            },

            set(newVal) {
                if(newVal === val) {
                    return
                }
                console.log('===update===', newVal)
                val = newVal
            }
        })
    }
}

let obj = {
    name: 'jzyismylover',
    age: 18
}

const observe = new Observer(obj)

observe.defineReactive(obj, 'name', obj.name)
obj.name = 'xxxxx'