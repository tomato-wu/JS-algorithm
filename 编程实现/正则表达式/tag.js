/**
 * vue 中模版解析过程中使用到的正则表达式
 */

// 解析开始标签

const ncname = '[a-zA-Z_][\\w\\-\\.]*'
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)

// 通过取消分组匹配的内容
console.log('<div></div>'.match(startTagOpen)) // ['<div', 'div']


// <div class="a" id="b"></div>
// 对于这个 HTML 标签我们怎么在上述识别到了 div 后怎么拿到里面的 class 和 id 呢
let str = `<div class="a c d" id="b"></div>`
let tag = str.match(startTagOpen)[1] // div
str = str.slice(4) // 移除掉了 <div


/*
    但是 vue 中的做法是每匹配一个就截取然后再往后进行
    下面只是针对 class 和 id 进行提取
    但一个节点里面有很多很多的属性
*/
const attribute = /^\s*(class="(?:[\w\s]*)")\s*(id="(?:[\w\s]*)")/
console.log(str.match(attribute))