/*
    哈夫曼树 —— 最优二叉树
*/

/**
 * @param {*} val 
 * @param {*} left 
 * @param {*} right 
 */

function TreeNode(val, char, left, right) {
    this.val = val || 0  // 字符出现的次数
    this.char = char || '' // 待编码的字符（当前节点是叶子节点才给char赋值）
    this.left = left || null    
    this.right = right || null
}


/**
 * 
 * @param {Map} map 
 * @returns 
 */

function HuffmanTree(str) {
    if(str === '') { return null }

    //1. 统计字符出现的频率
    let hash = {}

    for(let i=0; i<str.length; i++) {
        hash[str[i]] ??= 0 // 前者为 null / undefined 才赋值
        hash[str[i]] = hash[str[i]] + 1
    }

    //2. 构造哈夫曼树
    const huffmanTree = this.getHuffmanTree(hash)
    console.log('===哈夫曼树===', huffmanTree)

    //3. 遍历哈夫曼树得到编码表
    const map = this.getHuffmanCode(huffmanTree)
    console.log('===哈夫曼编码表===', map)

    //4. 根据编码对照表，返回最终的二进制代码
    let res = ''
    for(let item in hash) {
        res += map.get(item)
    }
    console.log('===哈夫曼总编码===', res)
}

HuffmanTree.prototype.getHuffmanTree = function(hash) {
    // 构建叶子节点
    let forest = []
    for(let char in hash) {
        const node = new TreeNode(hash[char], char)
        forest.push(node)
    }

    console.log(forest)
    
    let allNodes = []
    while(forest.length != 1) {
        forest.sort((a, b) => a.val - b.val)
        let node = new TreeNode(forest[0].val + forest[1].val)
        allNodes.push(forest[0])
        allNodes.push(forest[1])
        node.left = allNodes[allNodes.length - 2] // 左子树放置词频低的
        node.right = allNodes[allNodes.length - 1] // 右子树放置词频高的

        forest = forest.slice(2)
        forest.push(node) // 将新生成的节点放入森林中
    }

    return forest[0] // 整棵树的根节点
}

// 树的遍历(只统计子结点)
HuffmanTree.prototype.getHuffmanCode = function(huffmanTree) {
    let map = new Map()

    // 层数大于二才有路径
    const search = (node, curPath) => {
        if(!node) { return }
        if(!node.left && !node.right) {
            map.set(node.char, curPath)
        }

        if(node.left) {
            search(node.left, curPath + '0')
        }
        if(node.right) {
            search(node.right, curPath + '1')
        }
    }

    search(huffmanTree, '')
    return map
}


const huff = new HuffmanTree('ABBCCCDDDDEEEEE')
