/*
    防抖函数
*/

var debounce = function (fn, delay = 3000) {
    let timer = null
    return function () {
        const args = arguments
        if (timer) {
            clearInterval(timer)
            timer = null
        }
        // 每次都重新计时
        timer = setTimeout(() => {// 箭头函数解决 this 指向问题，不然指向的是 window
            return fn.apply(this, args)
        }, delay)
    }
}

// 我们可以这样去理解立即执行这个概念，立即执行就是第一次触发就会执行
// 那后面怎么互斥这个立即执行呢，我们会在 setTimeout 里面重置立即执行
// 只有当执行完一次完整的 setTimeout 以后才能够重新立即执行
// 由始至终其实都是第一次调用，然后 ns 后再进行下一次的头调用 
var debounce = function (fn, delay = 3000, immediate = false) {
    let timer = null

    return function () {
        const args = arguments, context = this

        if (timer) {
            clearTimeout(timer)
        }

        if (immediate) { // 要么是这个
            let isCall = !timer
            timer = setTimeout(() => {
                timer = null
            }, delay)
            isCall && fn.apply(context, args)
        } else { // 要么是这个
            timer = setTimeout(() => {
                fn.apply(context, args)
            }, delay)
        }

    }
}


var count = 1;
var container = document.getElementById('container');

function getUserAction() {
    console.log(this)
    console.log(arguments)
    container.innerHTML = count++;
};

container.onmousemove = debounce(getUserAction, 1000, true)