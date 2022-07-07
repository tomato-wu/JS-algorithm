const arr = [1, 6, 3, 2, 8, 5];

// 冒泡排序
function sortWithMP(arr) {
    for(let x = 0; x < arr.length; x++) {
        for(let y = 0; y < arr.length - x - 1; y++) {
            if(arr[y] > arr[y + 1])
                // swap
                [arr[y], arr[y + 1]] = [arr[y + 1], arr[y]]
        }
    }
    return arr;
}
console.log("冒泡排序",sortWithMP(arr));

// 选择排序 选择最小的放前边
Array.prototype.sortWithChoose = function () {
    const arr = this;
    for(let i = 0; i < arr.length; i++) {
        for(let j = i; j < arr.length; j++) {
            if(arr[i] > arr[j]) {
                [arr[i], arr[j]] = [arr[j], arr[j]]
            }
        }
    }
    return arr;
}
console.log("选择排序",arr.sortWithChoose());

// 插入排序
Array.prototype.sortWithInsert = function () {
    const arr = this;
    for(let i = 1; i < arr.length; i++) {
        for(let j = 0; j <= i; j++) {
            if(arr[i] < arr[j]) {
                // 保存a[i]的值
                const temp = arr[i];
                // 后移
                for(let k = j; k < i; i++) {
                    arr[j + 1] = arr[j];
                }
                arr[j] = temp;
            }
        }
    }
    return arr;
}
console.log("插入排序",arr.sortWithInsert());


// =========================================================================================================================================================

// 堆排序 O(nlog(n))
function swap(A, i, j) {
    [A[i], A[j]] = [A[j], A[i]]
}

/**
 * @description 使得i节点以下均为大顶堆
 * @param {Array} A 要排序的数组
 * @param {Number} i 
 * @param {Number} length 
 */
function shiftDown(A, i, length) {
    let temp = A[i];
    for(let j = 2 * i + 1; j < length; j = 2 * j + 1) {
        temp = A[i];

        // 如果存在右节点且右节点大于左节点
        if(j + 1 < length && A[j] < A[j+1]) {
            j++;
        }

        if(temp < A[j]) {
            swap(A, i, j);
            i = j;
        } else {
            break;  // 已经是大顶堆了
        }
    }
}

function heapSort(A) {
    // 构造第一次大顶堆
    for(let i = Math.floor(A.length / 2 - 1); i >= 0; i--) {
        shiftDown(A, i, A.length);
    }

    for(let i = Math.floor(A.length - 1); i > 0; i--) {
        swap(A, 0, i);
        shiftDown(A, 0, i);
    }
}

let A = [4, 6, 8, 5, 9, 1, 2, 3, 2];
heapSort(A);  
console.log(A);

// 快速排序  分治法

// function QuickSort(array) {
//     if(array.length <= 1) {
//         return array;
//     }

//     const pivotIndex = Math.floor(array.length / 2)
//     const pivot = array.splice(pivotIndex, 1)[0]
//     const left = []
//     const right = []
//     array.forEach(item => {
//         if(item < pivot) {
//             left.push(item)
//         } else {
//             right.push(item);
//         }
//     })
//     return QuickSort(left).concat(pivot, QuickSort(right))
// }

// console.log("快速排序",QuickSort([4, 6, 8, 5, 9, 1, 2, 3, 2]));



