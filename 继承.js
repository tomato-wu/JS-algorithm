function Parent() {
  this.name = 'parent1';
  this.play = [1, 2, 3]
}

function Child() {
  Parent.call(this)
  this.type = 'child2';
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;