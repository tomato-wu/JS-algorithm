// console.log('1');

// setTimeout(function() {
//     console.log('2');
//     process.nextTick(function() {
//         console.log('3');
//     })
//     new Promise(function(resolve) {
//         console.log('4');
//         resolve();
//     }).then(function() {
//         console.log('5')
//     })
// })
// process.nextTick(function() {
//     console.log('6');
// })
// new Promise(function(resolve) {
//     console.log('7');
//     resolve();
// }).then(function() {
//     console.log('8')
// })

// setTimeout(function() {
//     console.log('9');
//     process.nextTick(function() {
//         console.log('10');
//     })
//     new Promise(function(resolve) {
//         console.log('11');
//         resolve();
//     }).then(function() {
//         console.log('12')
//     })
// })


// 1,7,6,8,2,4,3,5,9,11,10,12

// console.log('_______');
// console.log(1)

// setTimeout(function(){
//         console.log(5)
// })

// Promise.resolve().then(function(){
//         console.log('promise3')
// }).then(function(){
//         console.log('promise4')
// })

// console.log(2)  
// console.log('_______');

setTimeout(() => {
    const first = () => (new Promise((resolve, reject) => {
        console.log(11111);
        const p = new Promise((resolve, reject) => {
          console.log('222222' + 'new Promise');
          setTimeout(() => {
            console.log(66666);
            resolve('77777--0000'); // 虽然这里又有一次p的 resolve 但是p的then的语句不会再执行了
          }, 0)
          resolve('4444444' + 'p');
        });
        console.log('here');
        resolve('555555' + 'first');
        p.then((arg) => {
          console.log(arg); // p 第一次被resolve后 第二次再resolve 不会再执行了
        });
      }));
  
      first().then((arg) => {
        console.log(arg);
      });
      console.log(333333);
}, 0)

// 1 2 here 3 4 5 6