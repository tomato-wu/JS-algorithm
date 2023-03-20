// 给定一个promise数组[p1,p2,p3...]

// 1.返回物理上第一个成功的promise的结果

// 2.若全部为失败，则返回物理上最后一个promise的结果

// 思路:使用promise.allSettled
