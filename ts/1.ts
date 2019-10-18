let arr1:Array<number|string> = [1, 2, '3'];
let a = 1; 

// 元组: 固定数量 固定位置固定类型
let b:[string, number] = ['1',2];
// let c: [string, number] = [3, '1'] // error 

// 枚举 enum 每个只能是数字编号，可以单独改变每个值， 但是只能赋值给数字
// 枚举作用是给一组数值赋予一个友好的名字
enum Color {Red=1, Green}
let d: Color = Color.Red
console.log(d)

let colorName: string = Color[2];
console.log(colorName)

let e: any = 1; // any类型 变量不会记录初始化类型，以后可以随意赋值任何类型的变量
e = '3';
let f = 4; // 直接赋值 变量会记录初始化类型，以后类型就不能变了

// void 表示没有任何类型
// 函数没有返回值 或者没有运行结果 都可以被申明为void
// 申明为void的变量 只能被赋值为undefined或者null

// undefined和null类型的值只能是undefined和null, undefined和null是任意类型的子类型
let g = 1;
g = null;
g = undefined;

// 断言
let str = 'aaa';
let num: number =(<string>str).length; 
let num1: number = (str as string).length;

// 接口 类似一个模板，规定一个对象必须具备某一些特定类型的属性
interface template {
  name: string; // 必须有，类型是string
  age? : number;   // 可有可无
  readonly gender: string; // 必须有，类型是string, 只读 
  [propName: string]: any; // 任意其他的属性 
}

function fn(arg: template) {

}

fn({age: 1, name: 'zhang', gender: 'fale', class: '122', grader: '123'})

let h: Array<number> = [1,2,3];
let i: ReadonlyArray<number> = [1,2,3]


interface ClockInterface {
  currentTime: Date;
  setTime(d: Date);
}
class Clock implements ClockInterface {
  currentTime: Date;
  setTime(d: Date) {
  }
}

let myAdd: (x: number, y: number) => number =
    function(x: number, y: number): number { return x + y; };

function buildName(x:string, ...y:string[]): string {
  return x + y;
}

buildName('1', '2', '3')

let buildName2: (first:string, ...last: string[]) => string = buildName;

// 泛型
function fn2<T>(str:T): T {
  return str
}
fn2<string>('1');

function fn3<T>(str: T): T {
  return str;
}
fn3('c')

let myFn: <U>(arg: U) => U = fn3;
let myfn2: {<U>(arg: U): U} = fn3;

function fn4<T>(args: T[]):T[] {
  return args;
}
function fn5<T>(args: Array<T>): Array<T> {
  return args;
}

interface Green{
  <T>(args: T[]):T[]
}
function greenFn<T>(args: Array<T>): Array<T> {
  return args;
}
let j: Green = greenFn;

// 泛型类
class Animal<T> {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  setName<T>(name: T): T {
    return name;
  }
  addName: (x: T, y: T) => T
}

interface LengthWise{
  length: number;
}

function loginLength<T extends LengthWise>(args: T): T {
  return args
}
loginLength({length: 1})

enum res {
  YES = 1,
  NO = 0
}
function respond(rep: string, mark: res) {

}
respond('a', res.YES)
respond('a', 3)


let y:undefined = undefined
let z:null = undefined
