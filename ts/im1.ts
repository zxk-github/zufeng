
let a1: number = 1;
let a2: string = '1';
let a3: boolean = true;
let a4: number[] = [1,2];
// 元组
let a5:[number, string] = [1, 'a'];
// a5.push(true);// 
// a5[2] = 1
// 枚举 枚举只能赋值数字
enum Color{
  Red,
  Blue
}
// 直接取值
let a6: Color = Color.Red;
// 获取key值
let a7: string = Color[0]; 
console.log(a6, a7)
// any any代表任何值
let a8 = 1;
// a = true 因为已经赋值了1，所以会进行类型推断，所以再次赋值为true的时候，回报错

// void void表示没有任何类型，比如:当函数没有返回值的时候就用void
// 给变量申明为void是没有任何意义的，只能赋值称undefined/null
// never 表示永远不存在数据类型，当函数永远不会执行结束，或者是函数会直接抛出错误的时候，会申明为这个类型
// null和undefined是任何数据类型的子类型，可以赋值给任何类型，变量申明成undefined/null只能赋值称undefined或者null
// object 除了简单数据行类型undefied null number string boolean都可以是object类型

// 类型断言: 当你比ts更加知道一个变量的类型的时候，这时候可以省去ts类型检查
let a9: string = 'a';
let a10: number = (<string>a9).length
let a11: number = (a9 as string).length

// 接口 interface 用来规定一个变量的数据结构
interface LabelValue {
  label: string;
  age?: number; //可选属性
  readonly num: number; // 只读属性

}
function a12(val: LabelValue) {

}
let a13 = {label: '1', b: 2, num: 1}
a12(a13)   // 这种变量转换多出的不会被校验

// a12({label: '1', age: 12}) 这种直接传入值的形式就会校验

// 泛型只读数组
// 定时数组两种方式 let a: number[]   let b: <Array>number
let a14: ReadonlyArray<number> = [1,2]

interface Label {
  babel: string;
}
function a15(arg: Label) {}
// 解决这种传入数据多余定于的接口key值办法
// a15({babel: 'a', number: 1})
// 1.使用类型断言
a15({babel: 'a', number: 1} as Label)
// 2.将值保存在一个变量中
let a16 = {babel: 'b', number: 2};
a15(a16);
// 3.在接口中使用propName
interface Label1{
  babel: string;
  [propName: string]: any
}

// 通过接口描述函数类型
interface A17{
  (a: number, b: string): number
}
let a18: A17 = function (a: number, b: string):number {
  return 1
}
// 数组索引
interface A18{
  [index: number]: string; // 定义索引类型之后，后面再加属性，值得类型应该和索引类型相同，或者是索引类型的子级
  a: number;
}
interface NumberIndex {
  [index: string]: number;
  length: number;
  // name: string; // 这里报错
}

// 当一个类实现一个接口的时候，只会检查实例属性，类的静态属性不会检查
interface ClockInterface{
  currentTime: string
  setTime(time: string): void
}
interface ClockInterface2{
  nowTime: string;
}
class Clock implements ClockInterface{
  currentTime: string;
  constructor(){};
  setTime() {

  }
}

// 接口之间的项目继承
interface ClockChild extends ClockInterface, ClockInterface2{}
let a19: ClockChild = {
  currentTime: '1',
  setTime() {},
  nowTime: '1'
}
// 混合类型
interface Counter {
  (start: number) : string;
  interval: string;
  reset():void
}
function getCounter(): Counter{
  function fn(start: number): string {
    return '1'
  }
  fn.interval = '1';
  fn.reset = function() {};
  return fn;
}



class Control {
  private state: string;
}
// 当一个接口继承一个类的时候，它继承了这个类的所有成员，包括是私有的和受保护的
interface SelectControl{
  a: string;
  select(): void
}
class Button extends Control implements SelectControl {
  public a : string;
  constructor(state) {
    super();
  }
  select() {

  }
}

class TexBtn extends Control{

}

// 读 存 取器

class Employee{
  private _fullname = '123';
  get fullName():string {
    return this._fullname;
  }
  set fullName(value: string) {
    this._fullname = value;
  }
}

// 抽象类
abstract class Person{
  abstract stract(): void;
  name: string;
  getName(): string {
    return '1'
  }
}
// 抽象类中的抽象方法 必须在子类中实现
class Fale extends Person {
  stract() {
    
  }
}

// 接口之间也可以相互继承
interface Point{
  x: number
}
interface Points extends Point{
  y: number
}
let obj: Points = {
  x: 1,
  y: 2
}
// 泛型:用来创建可重用组件
class Gen<T> {
  num: T
  gender: (arg: T) => T
}
let a21 = new Gen<string>()
a21.num = '1';
a21.gender = function() {
  return '1'
}

function logs<T>(arg: T): T {
  return arg.length  // 错误提示 arg上没有length属性
}

// 类型推断
class Animal{}
class Dog extends Animal{}
class Cat extends Animal{}
let zoo: Aniaml = [new Dog(), new Cat()];
















