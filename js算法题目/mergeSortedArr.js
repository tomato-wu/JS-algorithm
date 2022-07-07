/**
 * @description 合并两个已经排好序的数组
 */

function mergeSortedArr(arr1, arr2) {
    if(!arr1 || !arr2) {
        return
    }
    let arr = []
    let index1 = 0, index2 = 0
    let elem1 = arr1[0], elem2 = arr2[0]
    while(elem1 || elem2) {
        if((elem1 && !elem2) || (elem1 <= elem2)) {
            arr.push(elem1)
            index1 += 1
            elem1 = arr1[index1]
        } else {
            arr.push(elem2)
            index2 += 1
            elem2 = arr2[index2]
        }
    }

    return arr
}

console.log(mergeSortedArr([2,5,6,9], [-1, 1, 9, 19]))
