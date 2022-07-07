function hanoiProcess(n, from, to, helper) {
    if(n < 1) {
        return
    }
    if(n === 1) {
        console.log(`Move 1， from ${from} -> ${to}`);
    } else {
        hanoiProcess(n-1, from, helper, to)
        console.log(`Move${n}, from ${from} -> ${to}`);
        hanoiProcess(n-1, helper, to, from)
    }
}

hanoiProcess(3, "左", "右", "中");