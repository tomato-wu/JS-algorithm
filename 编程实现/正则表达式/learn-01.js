/*
    捕获匹配的片段 —— 较为难理解
*/

const str = "<div id='square' style='transform:translateY(15px);'></div>"

function getTranslateY(str) {

    let match = str.match(/translateY\(([0-9]+(?:px))\)/) // 结果会包括一些分组的信息
    // ?: 用于取消被动子表达式，哪里需要取消用在哪里

    // match = str.match(/translateY\(([0-9]+(px))\)/g) // 结果并不会包含分组的信息

    // 全局匹配和局部匹配的区别应该就在于是否包含一些分组的信息
    // while((match = /translateY\(([0-9]+(px))\)/g.exec(str)) != null) {// 无限循环
    //     console.log(match)
    // }

    console.log(match)
    // match[0] = translateY(15px)
    // match[1] = 15px
    // match[2] = px

    
    // 支持函数替换
    function upper(all, letter) { 
        console.log(all, letter)
        return letter.toUpperCase()
    }  // all代表的是匹配的字符串，letter代表的是捕获
    'border-bottom-width'.replace(/-(\w)/g, upper)


    // 反向引用 & 模版替换 \1,\2...反向引用  $1, $2 模版替换
    function injection() {
        let res = 'abcd-efgh-hijk'.match(/([a]([b-z\1]+-))/)
        console.log(res)
    }

    injection(str)
}

getTranslateY(str)



/*
    常用的一些正则验证
*/

// 校验密码强度

// 6~10位的纯数字或者纯小写字母或者纯大写字母
function testPassword(str) {
    return /^(\d{6, 10})|([a-z]{6, 10})|([A-Z]{6, 10})$/.test(str)
}


// 密码的强度必须是包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间。
function testPassword(str) {
    return /^[a-zA-Z0-9]{8, 10}$/.test(str)
}

// 校验手机号码的正确性
function testPhone(str) {
    return /^\d{11}$/.test(str)
}

testPhone('13726779599')
testPhone('12345')