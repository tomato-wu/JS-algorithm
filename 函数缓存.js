function memoize(fn) {
  // 创建一个缓存对象来存储结果
  const cache = {};

  // 返回一个新的函数，该函数将使用缓存
  return function (...args) {
    // 将参数转换为字符串，以便将其用作缓存对象的键
    const key = JSON.stringify(args);

    // 如果缓存中已经有该键对应的值，直接返回该值
    if (cache[key]) {
      return cache[key];
    }

    // 否则，调用原始函数并将结果存储到缓存中
    const result = fn.apply(this, args);
    cache[key] = result;

    // 返回结果
    return result;
  };
}

// 示例函数：计算斐波那契数列的第 n 项
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// 创建一个带有缓存功能的斐波那契函数
const memoizedFibonacci = memoize(fibonacci);

console.log(memoizedFibonacci(40)); // 输出 102334155，但速度更快，因为结果被缓存