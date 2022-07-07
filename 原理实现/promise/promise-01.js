/*
    PromiseA+ 规范
    1. then 返回一个新的 promise
    2. promise 状态不可逆
    3. then 中注册的回调函数属于上一个 promise
*/


// function _Promise(fn) {
//     let state = 'pending';
//     let value = null;
//     const callbacks = [];

//     // onFulfilled 是 then 中传入的回调函数
//     // resolve 是 then 返回新 promise 的 resolve
//     this.then = function (onFulfilled) {
//         return new Promise((resolve, reject) => {
//             handle({ //桥梁，将新 Promise 的 resolve 方法，放到前一个 promise 的回调对象中
//                 onFulfilled,
//                 resolve
//             })
//         })
//     }

//     function handle(callback) {
//         if (state === 'pending') {
//             callbacks.push(callback)
//             return;
//         }

//         if (state === 'fulfilled') {
//             if (!callback.onFulfilled) {
//                 callback.resolve(value)
//                 return;
//             }
//             const ret = callback.onFulfilled(value)
//             //处理回调
//             callback.resolve(ret) //处理下一个 promise 的resolve
//         }
//     }
//     function resolve(newValue) {
//         const fn = () => {
//             if (state !== 'pending') return

//             state = 'fulfilled';
//             value = newValue
//             handelCb()
//         }

//         setTimeout(fn, 0) //基于 PromiseA+ 规范
//     }

//     function handelCb() {
//         while (callbacks.length) {
//             // then 中传递的回调函数
//             const fulfiledFn = callbacks.shift();
//             handle(fulfiledFn);
//         };
//     }

//     fn(resolve)
// }


class _Promise {
    static PENDING = 'Pending'
    static FULFILLED = 'Fulfilled'
    static REJECTED = 'Rejected'

    constructor(executor) {
        // executor 为传入 promise 的函数
        if (typeof executor !== 'function') {
            throw new Error(`Promise ${executor} is not a function`)
        }

        this.initValue()

        this._resolve = this._resolve.bind(this)
        this._reject = this._reject.bind(this)


        // 处理 Promise 中抛错
        try {
            executor(this._resolve, this._reject)
        } catch (reason) {
            console.log('reason', reason)
            this._reject(reason)
        }
    }

    initValue() {
        // promise 实例属性
        this.state = _Promise.PENDING //状态
        this.value = null //种植
        this.reason = null //拒因
        this.onFulfilledcallbacks = [] //存储成功回调函数
        this.onRejectedcallbacks = [] //存储失败回调函数
    }

    _resolve(value) {
        // 成功后的一系列操作(状态改变、成功回调函数执行)
        if (this.state === _Promise.PENDING) {
            try {
                this.state = _Promise.FULFILLED
                this.value = value
                this.onFulfilledcallbacks.forEach(fn => fn(value))
                this.onFulfilledcallbacks = []
            }
            catch (e) {
                this._reject(e)
            }
        }
    }

    _reject(reason) {
        // 失败后的一系列操作(状态改变、失败回调函数执行)
        if (this.state === _Promise.PENDING) {
            this.state = _Promise.REJECTED
            this.reason = reason
            this.onRejectedcallbacks.forEach(fn => fn(reason))
            this.onRejectedcallbacks = []
        }
    }

    _handle_promise({ result, resolve, reject }) {
        // 防止循环调用
        if (result === this) {
            throw new Error('')
        }

        if ((result !== null && typeof result === 'object')
            || typeof result === 'function') {

            try {
                // 如果是 promise
                if (result instanceof _Promise) {
                    result.then.call(
                        result,
                        (r) => {// 递归解决多个 promise 的情况
                            this._handle_promise({ r, resolve, reject })
                        },
                        (e) => {
                            reject(e)
                        }
                    )
                }
                else {
                    resolve(result)
                }
            } catch (error) {
                reject(error)
            }

        } else {
            resolve(result)
        }
    }


    // 链式调用关键函数
    _handle(onFulfilled, onRejected, resolve, reject) {
        // 上层 promise 的状态为 fulfilled
        if (this.state === _Promise.FULFILLED) {
            setTimeout(() => {// 处理异步任务
                const result = onFulfilled(this.value)
                this._handle_promise({ result, resolve, reject })
            })
        }

        // 上层 promise 的状态为 rejected
        if (this.state === _Promise.REJECTED) {
            setTimeout(() => {
                const result = onRejected(this.reason)
                this._handle_promise({ result, resolve, reject })
            });
        }

        // 上层 promise 的状态为 pending
        if (this.state === _Promise.PENDING) {
            // 存储成功异步函数 解决 Promise 中有 setTimeout
            this.onFulfilledcallbacks.push(value => {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(value)
                        resolve(x)
                    } catch (error) {
                        reject(error)
                    }
                });
            })

            // 存储失败异步函数
            this.onRejectedcallbacks.push(reason => {
                setTimeout(() => {
                    const x = onRejected(reason)
                    reject(x)
                });
            })
        }
    }


    then(onFulfilled, onRejected) {
        // 判断是否为函数
        if (!onFulfilled || typeof onFulfilled !== 'function') {
            // 实现透传
            onFulfilled = function (value) {
                return value
            }
        }

        if (!onRejected || typeof onRejected !== 'function') {
            onRejected = function (reason) {
                return reason
            }
        }

        return new _Promise((resolve, reject) => {
            this._handle(onFulfilled, onRejected, resolve, reject)
        })
    }

    catch(onRejected) {
        return this.then(null, onRejected)
    }

    finally(ondone) {
        // 不管是 reolve 还是 reject 都可以执行
        return this.then(ondone, ondone)
    }

    // 当所有 promise 的状态变为 true 才执行
    static all(args) {
        // 传递进来的是 promise 数组

        return new _Promise((resolve, reject) => {
            if (args.length === 0) { resolve([]) }

            let isComplete = args.length

            function res(i, val) {
                console.log(typeof val)
                try {
                    if ((val && typeof val === 'object') || typeof val === 'function') {
                        const then = val.then
                        if (typeof then === 'function') {
                            then.call(val, (r) => {
                                res(i, r)
                            }, reject)
                            console.log('完成');
                            return
                        }
                    }
                    args[i] = val
                    isComplete--
                    if (isComplete === 0) {
                        console.log('结果', args)
                        resolve(args)
                    }
                } catch (reason) {
                    reject(reason)
                }
            }

            for (let i = 0; i < args.length; i++) {
                console.log('args')
                res(i, args[i])
            }
        })
    }

}

_Promise.defer = _Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new _Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}
module.exports = _Promise


// const promise = new _Promise((resolve, reject) => {
//     console.log('promise')
//     setTimeout(() => {
//         resolve('jzyismylover')
//     })
// }).then((val) => {
//     console.log(val)
//     return val
// }).then(val => {
//     console.log('twice', val)
//     throw new Error('error')
// }).catch((err) => {
//     console.log('catch捕获', err);
// }).finally(() => {
//     console.log('正常')
// })

// const promise2 = 42;
// const promise3 = new _Promise((resolve, reject) => {
//   setTimeout(() => {
//       resolve('foo')
//   }, 1000);
// });

// _Promise.all([promise2, promise3]).then((values) => {
//   console.log(values);
// });