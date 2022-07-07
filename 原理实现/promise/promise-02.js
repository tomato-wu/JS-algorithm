/*
    基于之前写过的情况下根据自己的理解重新复现一遍
    包括对应的 all、bind 等 api
*/

class MyPromise {
    static PENDING = 'pending'
    static RESOLVED = 'fulfilled'
    static REJECTED = 'rejected'

    constructor(executor) {
        try {
            this.initValue()
            this.initBind()

            executor(this._resolve, this._reject)
        } catch (err) {
            this._reject(err)
        }
    }

    initValue() {
        this.status = MyPromise.PENDING
        this.value = null
        this.reason = null
        this.onFulfilledCallbacks = []
        this.onRejectedCallbacks = []
    }
    initBind() {
        this._resolve = this._resolve.bind(this)
        this._reject = this._reject.bind(this)
    }

    _resolve(value) {
        if (this.status === MyPromise.PENDING) {
            this.value = value
            this.status = MyPromise.RESOLVED
            this.onFulfilledCallbacks.forEach(fn => fn(value))
        }
    }
    _reject(reason) {
        if (this.status === MyPromise.PENDING) {
            this.reason = reason
            this.status = MyPromise.REJECTED
            this.onRejectedCallbacks.forEach(fn => fn(reason))
        }
    }

    then(onFulfilled, onRejected) {
        // 确保一定是函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

        var thenPromise = new MyPromise((resolve, reject) => {

            const resolvePromise = (cb, value) => {
                setTimeout(() => {// then 是微任务
                    try {
                        const x = cb(value)
                        if (x === thenPromise) {// 拒绝循环引用
                            throw new Error('not allow circle calling')
                        }

                        if (x instanceof MyPromise) {
                            x.then(resolve, reject) // 等待 x 状态变化后再 resolve 和 reject
                        } else {
                            resolve(x)
                        }

                    } catch (err) {
                        reject(err)
                    }
                })
            }


            if (this.status === MyPromise.RESOLVED) {
                resolvePromise(onFulfilled, this.value)
            } else if (this.status === MyPromise.REJECTED) {
                resolvePromise(onRejected, this.reason)
            } else if (this.status === MyPromise.PENDING) {// 延时执行
                this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled))
                this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected))
            }
        })

        return thenPromise
    }



    /*
        接收一个Promise数组，数组中如有非Promise项，则此项当做成功
        如果所有Promise都成功，则返回成功结果数组
        如果有一个Promise失败，则返回这个失败结果
    */

    static all(args) {
        const res = []
        let count = args.length

        return new MyPromise((resolve, reject) => {

            const addData = (val, index) => {
                res[index] = val
                if (--count.length < 0) { resolve(res) }
            }
            for (let i = 0; i < args.length; i++) {
                if (args[i] instanceof MyPromise) {
                    args.then((val) => {
                        addData(val, i)
                    }, err => { reject(err) })
                } else {
                    addData(args[i], i)
                }
            }
        })
    }

    /*
        接收一个Promise数组，数组中如有非Promise项，则此项当做成功
        哪个Promise最快得到结果，就返回那个结果，无论成功失败
    */

    static race(args) {

        return new MyPromise((resolve, reject) => {
            for (let i = 0; i < args.length; i++) {
                if (!(args instanceof MyPromise)) {//非 promise 直接返回
                    resolve(args[i])
                } else {
                    args[i].then((val) => {
                        resolve(val)
                    }, err => reject(err))
                }
            }
        })
    }

    /*
        接收一个Promise数组，数组中如有非Promise项，则此项当做成功
        如果有一个Promise成功，则返回这个成功结果
        如果所有Promise都失败，则报错
    */

    static any(args) {
        let count = 0

        return new MyPromise((resolve, reject) => {
            for (let i = 0; i < args.length; i++) {
                if (args[i] instanceof MyPromise) {
                    args[i].then(val => resolve(val), err => {
                        if (++count > args.length) reject('all is error')
                    })
                } else {
                    resolve(args[i])
                }
            }
        })

    }


    /*
        无论成功与否都会返回最后结果
        { status: 'fulfilled', val: 'xxx' } 或者
        { status: 'rejected', reason: 'xxx' }
    */

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
                if (args[i] instanceof MyPromise) {
                    args[i].then(res => {
                        cb(MyPromise.RESOLVED, res, i)
                    }, err => {
                        cb(MyPromise.REJECTED, err, i)
                    })
                } else {
                    cb(MyPromise.RESOLVED, args[i], i)
                }
            }
        })

    }
}


// 验证 PromiseA+ 规范
MyPromise.defer = MyPromise.deferred = function () {
    let dfd = {};
    dfd.promise = new MyPromise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}
module.exports = MyPromise



// const p3 = new MyPromise((resolve, reject) => {
//     resolve(100)
// }).then(res => {
//     console.log(2 * res)
//     return 2 * res
// }, err => console.log(err))
//   .then(res => console.log(res * 2), err => console.log(err))
