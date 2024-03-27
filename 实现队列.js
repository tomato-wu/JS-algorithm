class Queue {
  constructor() {
    this.items = [];
  }

  // 向队列尾部添加一个新元素
  enqueue(element) {
    this.items.push(element);
  }

  // 移除队列头部的元素，并返回被移除的元素
  dequeue() {
    if (this.isEmpty()) {
      return 'Queue is empty';
    }
    return this.items.shift();
  }

  // 返回队列头部的元素，不对队列做任何修改
  front() {
    if (this.isEmpty()) {
      return 'Queue is empty';
    }
    return this.items[0];
  }

  // 如果队列里没有任何元素就返回 true，否则返回 false
  isEmpty() {
    return this.items.length === 0;
  }

  // 返回队列里的元素个数
  size() {
    return this.items.length;
  }

  // 打印队列里的元素
  print() {
    console.log(this.items.toString());
  }
}

// 使用
let queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.print(); // 输出：1,2,3
console.log(queue.front()); // 输出：1
console.log(queue.dequeue()); // 输出：1
queue.print(); // 输出：2,3