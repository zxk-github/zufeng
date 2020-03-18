"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var a;
(function (a) {
    // 抽象类
    var Animal = /** @class */ (function () {
        function Animal(name) {
            this.name = name;
        }
        Animal.prototype.move = function () {
            console.log('move');
        };
        return Animal;
    }());
    var Cat = /** @class */ (function (_super) {
        __extends(Cat, _super);
        function Cat(name) {
            return _super.call(this, 'cat') || this;
        }
        Cat.prototype.getName = function () {
            return this.name;
        };
        Cat.prototype.getAge = function () {
            return 'a';
        };
        return Cat;
    }(Animal));
    var cat = new Cat('cat');
    cat.move();
    console.log(cat.getName());
    var Dog = /** @class */ (function () {
        function Dog(name, age) {
            this.name = name;
            this.age = age;
        }
        Dog.prototype.getName = function () {
            return this.name;
        };
        return Dog;
    }());
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person.prototype.say = function () { };
        Person.prototype.speak = function () { };
        return Person;
    }());
    var discount = function (price) {
        return price * 1;
    };
    var list = ['a', 'b', 'c'];
    var Man = /** @class */ (function () {
        function Man() {
        }
        Man.prototype.speak = function (words) {
            console.log(words);
        };
        return Man;
    }());
})(a || (a = {}));
var b;
(function (b) {
    var Animal = /** @class */ (function () {
        function Animal(name) {
            this.name = name;
        }
        return Animal;
    }());
})(b || (b = {}));
// any无法控制返回值类型，指定类型函数使用就不灵活了，这时候就需要范型，定义时候不知道，使用的时候才会知道
// function fn(val: string): string {
//   return val;
// }
// function fn(val: string|number): string|number {
//   return val;
// }
// function fn<T>(val: T):T {
//   return val;
// } 
// 范型类
// class List<T>{
//   private list: Array<T> = [];
//   add(val: T) {
//     this.list.push(val);
//   }
// }
// let list = new List<number>();
// list.add(1);
// 范型接口
// interface List{
//   <T>(a: T): T
// }
// let list: List = function<T>(a: T):T {
//   return a;
// }
// let d = list<number>(1);
// interface List<T> {
//   (arg: T): T;
// }
// function list<T>(arg: T): T {
//   return arg;
// }
// let d: List<number> = list;
// 多类型参数
function swap(touple) {
    return [touple[1], touple[0]];
}
// 在函数中使用范型的时候，由于事先不知道范型的具体类型，所以不能访问相应变量类型的方法
function list(arg) {
    return arg.length; // error 
}
var c1 = { list: ['a'] };
var c2 = ['a', 'b'];
