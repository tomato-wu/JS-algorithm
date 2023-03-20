一面：
css 标签选择器权重题，看题说输出 涉及 !importance /id /class/标签选择器/以及各种组合，有点绕 
输出顺序题目，看代码写输出，涉及js 单线程，宏任务和微任务，Promise等


闭包和this问题   也是看代码写输出，有原型链相关的，其中让实现一个输出是


算法题：
拍平数组，数组去重，快排
leetcode原题 ： 有效的括号



setTimeout(() => {

  console.log(1);

}, 0);

console.log(2);

(new Promise((resolve) => {

  console.log(3);

})).then(() => {

  console.log(4);

});





<style type="text/css">

#a {font-size:12px}

div p{ font-size:13px }

.a .b .c{ font-size:15px }

#b{ font-size:15px }

div .c{ font-size:15px }

</style>

<div id="a" class="a">

<div id="b" class="b">

  <p id="c" class="c">I’am here</p>

</div>

</div>

请问在标准模式下显示的 I’am here 字符会是多大的字体？命中的是哪一条规则？CSS的选择器的优先级规则




var name = '123';

var obj = {

   name: '456',

   getName: function () {

       function printName () {

           console.log(this.name);

       }

       printName();

   }

}

obj.getName();