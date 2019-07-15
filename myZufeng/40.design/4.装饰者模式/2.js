// 装饰器模式有时候会优于继承

class Coffee {
    make(water) {
        return `${water}+咖啡`
    }
    count() {
        return 10
    }
}

class MilkCoffee {
    constructor(parent) {
        this.parent = parent;
    }
    make(water) {
        return this.parent.make(water) + '牛奶';
    }
    count() {
        return this.parent.count() + 2
    }
}

class SugarCoffee {
    constructor(parent) {
        this.parent = parent;
    }
    make(water) {
        return this.parent.make(water) + '糖'
    }
    count() {
        return this.parent.count() + 3
    }
}

var coffee = new Coffee();
var milkCoffee = new MilkCoffee(coffee);
// console.log(milkCoffee.make('水'))
var sugarMilkCoffee = new SugarCoffee(milkCoffee);
console.log(sugarMilkCoffee.make('糖'))








