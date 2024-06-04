// 引入readline模块来读取标准输入
const readline = require('readline');

// 创建readline接口
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function preoceeInput() {
    rl.on('line', (input) => {
        const [a, b] = input.split(' ').map(Number);
        // # 遇到 0, 0 则中断
        if (a === 0 && b === 0) {
            return;
        } else {
            console.log(a + b);
        }
    });
}
preoceeInput()