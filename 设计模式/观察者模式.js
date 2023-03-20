// 定义一个被观察者类
class Observed {
  constructor() {
    // 初始化一个空数组，用来存放观察者
    this.observers = [];
  }
  // 添加观察者方法
  addObserver(observer) {
    this.observers.push(observer);
  }
  // 删除观察者方法
  removeObserver(observer) {
    let index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }
  // 通知所有观察者方法
  notify() {
    for (let observer of this.observers) {
      // 调用每个观察者的 update 方法
      observer.update();
    }
  }
}

// 定义一个观察者类
class Observer {
  constructor(name) {
    // 给每个观察者一个名字，方便区分
    this.name = name;
  }
  // 定义 update 方法，用来接收被观察者的通知
  update() {
    console.log(`${this.name} 收到了通知`);
  }
}

// 创建一个被观察者实例
let observed = new Observed();

// 创建三个观察者实例
let observer1 = new Observer("张三");
let observer2 = new Observer("李四");
let observer3 = new Observer("王五");

// 添加两个观察者到被观察者中
observed.addObserver(observer1);
observed.addObserver(observer2);

// 被观察者发出通知，只有张三和李四收到了通知，王五没有收到通知
observed.notify();
// 输出：
// 张三 收到了通知
// 李四 收到了通知

// 删除一个观察者李四
observed.removeObserver(observer2);

// 被观察者再次发出通知，只有张三收到了通知，李四和王五都没有收到通知
observed.notify();
// 输出：
// 张三 收到了通知
