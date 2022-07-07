/**
 * 第三次编写 promise —— 需要解决的问题
 * 1. 可以 resolve 和 reject(注意状态的唯一性)
 * 2. 可以处理 promise 内的错误
 * 3. 可以处理 promise 内的延时调用
 * 4. 可以处理 then 异步回调
 * 5. 可以处理 then 链式调用
 * 6. 可以处理 then 内部异常处理
 */

class _Promise {
    static PENDING = 'Pending'
    static FULFILLED = 'Fulfilled'
    static REJECTED = 'Rejected'

    constructor(callback) {
        this.initVal()
        this.initBind()
        try {// 2. 处理 promise 内的错误
            callback(this.resolve, this.reject)
        } catch (err) {
            this.reject(err)
        }
    }

    initVal() {
        this.status = _Promise.PENDING
        this.val = null
        this.reason = null
        this.resolveCallbacks = []
        this.rejectCallbacks = []
    }

    initBind() {
        this.resolve = this.resolve.bind(this)
        this.reject = this.reject.bind(this)
    }

    resolve(val) {
        if (this.status === _Promise.PENDING) {
            this.val = val
            this.status = _Promise.FULFILLED
            this.resolveCallbacks.forEach(fn => fn(val))
        }
    }

    reject(reason) {
        if (this.status === _Promise.PENDING) {
            this.reason = reason
            this.status = _Promise.REJECTED
            this.rejectCallbacks.forEach(fn => fn(reason))
        }
    }

    then(onFulFilled, onRejected) {
        if (!onFulFilled || typeof onFulFilled !== 'function') {
            onFulFilled = (val) => val
        }
        if (!onRejected || typeof onRejected !== 'function') {
            onRejected = (reason) => { throw (reason) }
        }

        var promise = new Promise((resolve, reject) => {
            // 根据状态机处理 then 后续；链式调用
            const ctx = (cb, x) => {
                setTimeout(() => {// 因为 then 是异步回调
                    try {
                        const res = cb(x)

                        // 避免链式循环
                        if (res == promise) {
                            throw ('TypeError: can not invoke self')
                        }

                        // 处理返回值是 promise 的情况
                        if (res instanceof _Promise) {
                            res.then(resolve, reject)
                        } else {
                            resolve(res)
                        }
                    } catch (e) {
                        reject(e)
                    }
                }, 10)
            }

            if (this.status === _Promise.FULFILLED) {// 处理成功回调
                ctx(onFulFilled, this.val)
            } else if (this.status === _Promise.REJECTED) {// 处理失败回调
                ctx(onRejected, this.reason)
            } else { // 当前存在异步 resolve 或者 reject
                this.resolveCallbacks.push(ctx.bind(this, onFulFilled))
                this.rejectCallbacks.push(ctx.bind(this, onRejected))
            }
        })

        return promise
    }

    catch(onRejected) {
        return this.then(null, onRejected)
    }

    finally(handle) {
        this.then(handle, handle)
    }

    /**添加 Promise 常见的静态方法 */

    static all(args) {
        const res = []
        let count = 0

        return new _Promise((resolve, reject) => {
            const cb = (val, i) => {
                res[i] = val
                count++
                if(count === args.length) {
                    resolve(res)
                }
            }

            for(let i=0; i<args.length; i++) {
                if(args[i] instanceof _Promise) {
                    args[i].then(res => {
                        cb(res, i)
                    }, err => {
                        reject(err)
                    })
                } else {
                    cb(res, i)
                }
            }
        })
    }


    static race(args) {
        return new _Promise((resolve, reject) => {
            const cb = (val) => {
                resolve(val)
            }
            for(let i=0; i<args.length; i++) {
                if(args[i] instanceof _Promise) {
                    args[i].then(res => cb(res), err => reject(err))
                } else {
                    cb(args[i])
                }
            }
        })
    }

    static any() {// 与 all 作用相反
        const errs = []
        let count = 0

        return new _Promise((resolve, reject) => {
            for(let i=0; i<args.length; i++) {
                if(args[i] instanceof _Promise) {
                    args[i].then(res => resolve(res), err => {
                        errs.push(err)
                        count++
                        if(count === args.length) {
                            throw ('all is error')
                        }
                    })
                } else {
                    resolve(args[i])
                }
            }
        })
    }


    static allSettled(args) {
        const res = []
        let count = 0


        return new MyPromise((resolve, reject) => {
            const cb = (status, val, i) => {
                count++
                res[i] = {// 添加状态标记 & 结果
                    status,
                    val
                }
                if (count === args.length) {
                    resolve(res)
                }
            }
            for (let i = 0; i < args.length; i++) {
                if (args[i] instanceof _Promise) {
                    args[i].then(res => {
                        cb(_Promise.FULFILLED, res, i)
                    }, err => {
                        cb(_Promise.REJECTED, err, i)
                    })
                } else {
                    cb(_Promise.FULFILLED, args[i], i)
                }
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

const promise = new _Promise((resolve, reject) => {
    console.log('hello world')
    // throw new Error('抛错了')
    resolve(2)
}).then(res => {
    console.log('===first time===', res)
    // throw new Error('抛错了')
    return new _Promise((resolve, reject) => {
        console.log('内部 promise')
        resolve(res * res * res)
        // reject('error')
    })
}).then(res => {
    console.log('===second time===', res)
}).catch((err) => {
    console.log('error', err)
})

console.log('外部同步代码')