/**
 * 用两个栈模拟出队和入队的过程
 */

class Queue {
    constructor() {
        this.stack1 = [] // 存储入队元素
        this.stack2 = [] // 存储出队元素
    }

    /**
     * @function 队列入队
     * @param {*} val 
     */
    add(val) {
        this.stack1.push(val)
    }


    /**
     * @function 队列出队
     */
    pop() {
        if(this.stack2.length == 0) {
            if(this.stack1.length == 0) { return null }
            while(this.stack1.length) {
                this.stack2.push(this.stack1.pop())
            }
        }
        return this.stack2.pop()
    }
}

const queue = new Queue()
queue.add(1)
queue.add(2)
queue.add(3)
queue.pop()
queue.pop()
queue.add(4)
queue.pop()
queue.pop()
console.log(queue.stack1, queue.stack2)