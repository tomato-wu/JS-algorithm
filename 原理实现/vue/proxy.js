/*
    代理器
*/

function createArray(...elements) {
    let handler = {
        get(target, propKey, receiver) {// 目标对象、拦截属性、实例本身
            let index = Number(propKey);
            if (index < 0) {
                propKey = +String(target.length + index);
                console.log('target', target)
                console.log('propkey', propKey)
                console.log('receiver', receiver)  // receiver 指向的是 proxy 实例本身
            }
            return Reflect.get(target, propKey, receiver); // Reflect 需要的是 get 的 this其实也就是实例本身
        }
    };

    let target = [];
    target.push(...elements);
    return new Proxy(target, handler);
}

// let arr = createArray('a', 'b', 'c');
// arr[-1] // c


/*
    vue3 是如何基于 proxy 去实现响应式的呢
*/

const targetMap = new WeakMap()

// 依赖收集
function track(target, key) {
    // 如果此时activeEffect为null则不执行下面
    // 这里判断是为了避免例如console.log(person.name)而触发track
    if (!activeEffect) return
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, depsMap = new Map())
    }

    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, dep = new Set())
    }
    dep.add(activeEffect) // 收集更新函数
}

// 发布信息通知订阅者
function trigger(target, key) {
    let depsMap = targetMap.get(target)
    if (depsMap) {
        const dep = depsMap.get(key)
        if (dep) {
            dep.forEach(effect => effect()) // 执行更新函数
        }
    }
}

// vue reactive 语法糖的实现
function reactive(target) {
    const handler = {
        get(target, key, receiver) {
            track(receiver, key) // 访问时收集依赖
            return Reflect.get(target, key, receiver)
        },
        set(target, key, value, receiver) {
            Reflect.set(target, key, value, receiver)
            trigger(receiver, key) // 设值时自动通知更新
        }
    }

    return new Proxy(target, handler)
}


let activeEffect = null

// 一开始先收集更新函数
function effect(fn) {
    activeEffect = fn
    activeEffect()
    activeEffect = null
}

// vue ref 语法糖 的实现
function ref(initValue) {
    return reactive({
        value: initValue
    })
}

// vue computed 语法糖的实现
function computed(fn) {
    const result = ref()
    effect(() => result.value = fn())
    return result
}

let user = { _name: "张三", get name() { return this._name; } };
let userProxy = new Proxy(user, {
    get(target, prop, receiver) {
        return Reflect.get(target, prop, receiver); // receiver = admin
    }
});
let admin = { __proto__: userProxy, _name: "李四" };
console.log(admin.name); // => 李四