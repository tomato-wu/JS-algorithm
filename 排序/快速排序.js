// 快速排序
function QuickSort(arr) {

    const n = arr.length;
    if (n <= 1) return arr;
    let pivot = arr[0];

    let left = [];
    let right = [];

    for (let i = 1; i < n; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    // return QuickSort(left).concat([pivot], QuickSort(right));
    return [...QuickSort(left), pivot, ...QuickSort(right)]
}
let list = [4, 6, 8, 5, 9, 1, 2, 3, 2];

let sortArr = QuickSort(list)
console.log("快速排序", sortArr);