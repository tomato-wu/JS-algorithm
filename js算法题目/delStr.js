/**
 * @description 删除相邻相同的字符串
 */

 function delStr(str){
    if(str.length === 0) {
        return str
    }
    let current = str.charAt(0)
    const result = [current]
    for(let i=1; i<str.length; i++) {
        if(current !== str.charAt(i)) {
            result.push(str.charAt(i))
            current = str.charAt(i)
        }
    }
    return result.join("")
 }

console.log(delStr("aabbcc1"));