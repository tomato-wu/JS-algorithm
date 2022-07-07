/*
    实现对数字进行千位分隔符的分隔
    19,351,235.235767
*/


// 将数字转为字符串，返回的是字符串
var throusandDot = function(num) {
    num = String(num)
    let [zheng, xiao] = num.split('.') // 切成整数部分和小数部分

    console.log(zheng, xiao)
    
    let sum = 0, res = []
    for(let i=zheng.length-1; i>=0; i--) {
        res.push(zheng[i])
        sum++
        if(sum === 3 && i!=0) { res.push(','); sum = 0 }
    }

    return res.reverse().join('') + '.' + xiao
}

console.log(throusandDot(119351235.235767))



/*
    直接使用 api => 可能出现的问题是位数比较多的时候会被截取
*/
var throusandDot = function(num) {
    return num.toLocaleString()
}

console.log(throusandDot(119351235.235767))


/*
使用正则表达式
https://www.runoob.com/regexp/regexp-syntax.html
*/
var throusandDot = function(num) {
    var res=num.toString().replace(/\d+/, function(n){ // 先提取整数部分
        return n.replace(/(\d)(?=(\d{3})+$)/g, function($1){ //?= 匹配的是前面的内容 
            // console.log('$1', $1)
           return $1+",";
         });
   })
   return res;
}



console.log(throusandDot(119351235.235767))
