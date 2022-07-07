/** Promise的模拟实现 */

const { handleError } = require("@vue/runtime-core");

/**
 * @description 能链式调用，拥有状态，then中的回调属于上一个Promise
 */

function newPromise(fn) {
    let state = "pending";
    let value = null;
    let callbacks = [];

    // 理解的难点，返回一个新Promise，而resolve为下一个Promise的resolve
    this.then = function(onFulfilled, onRejected) {
        return new newPromise((resolve, reject) => {
            handle({
                onFulfilled,
                resolve,
                onRejected,
                reject
            })
        })
    }

    this.catch = function (onError){
        this.then(null,onError)
    }

    this.finally = function (onDone){
        this.then(onDone,onDone)
    }

    function handle(callback) {
        if(state === "pending") {
            callbacks.push(callback)
            return;
        }

        const cb = state === 'fulfilled' ? callback.onFulfilled: callback.onRejected;
        const next = state === 'fulfilled' ? callback.resolve : callback.reject;

        if(!cb) {
            next(value)
            return;
        }
        try {
            const ret = cb(value)
            next(ret)
        } catch(e) {
            callback.reject(e)
        }
    }

    function resolve(newValue) {
        const fn = () => {
            if(state !== 'pending') return
            
            // 如果返回的是一个promise，要能去执行它的then函数
            if(newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
                const { then } = newValue
                if(typeof then === 'function') {
                    then.call(newValue, resolve)
                    return
                }
            }
            state = 'fulfilled';
            value = newValue;
            handleCb()
        }
        setTimeout(fn, 0)   // 符合Promise的执行，主线程执行完再执行
    }

    function reject(newValue) {
        const fn = () => {
            if(state !== 'pending') return
            
            // 如果返回的是一个promise，要能去执行它的then函数
            if(newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
                const { then } = newValue
                if(typeof then === 'function') {
                    then.call(newValue, resolve, reject)
                    return
                }
            }
            state = 'rejected';
            value = newValue;
            handleCb()
        }
        setTimeout(fn, 0)   // 符合Promise的执行，主线程执行完再执行
    }

    function handleCb() {
        while(callbacks.length) {
            const fn = callbacks.shift();
            handle(fn);
        }
    }

    fn(resolve, reject);
}

new newPromise((resolve, reject) => {
    setTimeout(() => {
        reject({ test: 1 })
    }, 1000)
}).catch(err => {
    console.log(err);
})
