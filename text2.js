const _shallowClone = (target) => {
  // 基本数据类型直接返回
  if (typeof target === "object" && target !== null) {
    // 获取target 的构造体
    const constructor = target.constructor;
    // 如果构造体为以下几种类型直接返回
    if (/^(Function|RegExp|Date|Map|Set)$/i.test(constructor.name))
      return target;
    // 判断是否是一个数组
    const cloneTarget = Array.isArray(target) ? [] : {};
    for (prop in target) {
      // 只拷贝其自身的属性
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = target[prop];
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
};
