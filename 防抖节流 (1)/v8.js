const readline = require('readline')
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})
let lineData = []
rl.on('line',line=>{
    lineData.push(line.trim())
    if(lineData.length===2){
        //处理第一行输入，得到参加人数，淘汰人数区间
        let arr1 = lineData[0].split(' ').map(e=>+e)
        let n = arr1[0],x=arr1[1],y=arr1[2]
        //处理第二行输入，得到分数数组
        let arr2 = lineData[1].split(' ').map(e=>+e)
        //分数排序
        arr2.sort((a,b)=>a-b)
        let flag = 0
        let index = Array.from({length:y-x+1},(e,i)=>x+i*1)
        for(const i of index){
            if(arr2[i]!=arr2[i-1] && arr2.length-i<=y){
                flag=1
                console.log(arr2[i-1])
                break
            }
        }
        if(flag===0){
            console.log(-1)
        }
    }
})