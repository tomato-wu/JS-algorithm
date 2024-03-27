class Stack {
  constructor() {
    this.items = [];
  }

  // 添加一个新元素到栈顶
  push(element) {
    this.items.push(element);
  }

  // 移除栈顶的元素，并返回被移除的元素
  pop() {
    if (this.isEmpty()) {
      return 'Stack is empty';
    }
    return this.items.pop();
  }

  // 返回栈顶的元素，不对栈做任何修改
  peek() {
    if (this.isEmpty()) {
      return 'Stack is empty';
    }
    return this.items[this.items.length - 1];
  }

  // 如果栈里没有任何元素就返回 true，否则返回 false
  isEmpty() {
    return this.items.length === 0;
  }

  // 移除栈里的所有元素
  clear() {
    this.items = [];
  }

  // 返回栈里的元素个数
  size() {
    return this.items.length;
  }

  // 打印栈里的元素
  print() {
    console.log(this.items.toString());
  }
}

// 使用
let stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.print(); // 输出：1,2,3
console.log(stack.peek()); // 输出：3
console.log(stack.pop()); // 输出：3
stack.print(); // 输出：1,2