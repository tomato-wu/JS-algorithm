// 基于时间戳的版本的头调用
var throttle = function (fn, delay) {
    let previous = 0

    return function () {
        let now = +new Date()
        if (now - previous > delay) {
            fn(arguments)
            previous = +new Date()
        }
    }
}

// 基于定时器实现的尾调用
var throttle = function (fn, delay) {
    let timer = null

    return function () {
        const context = this, args = arguments
        if (timer) { return }
        timer = setTimeout(() => {
            fn.apply(context, args)
            timer = null
        }, delay)
    }
}

// 综合版本（有头调用和尾调用）
var throttle = function (fn, delay) {
    let timer = null, previous = 0

    return function () {
        const context = this, args = arguments
        let now = +new Date()
        let remaining = delay - (now - previous)

        if (remaining <= 0) {
            timer && clearTimeout(timer)
            timer = null
            fn.apply(context, args)
            previous = +new Date()
        } else if(!timer){
            timer = setTimeout(() => {
                previous = +new Date()
                fn.apply(this, args)
                timer = null
            }, remaining)
        }
    }
}


// 提供选项 options 
var throttle = function (fn, delay, options = {}) {
    let timer = null, previous = 0;

    return function () {
        const context = this, args = arguments
        let now = +new Date()
        if(!options.head && !previous) {
            previous = +new Date()
        }
        let remaining = delay - (now - previous)    

        if (remaining <= 0 && !timer) {
            // 关键就在于为什么要清理定时函数
            fn.apply(context, args)
            previous = +new Date()
        } else if(!timer && options.tail){
            timer = setTimeout(() => {
                previous = +new Date()
                fn.apply(this, args)
                timer = null
            }, remaining)
        }
    }
}

var count = 1;
var container = document.getElementById('container');

function getUserAction() {
    container.innerHTML = count++;
};

container.onmousemove = throttle(getUserAction, 2000, { head: true, tail: true })