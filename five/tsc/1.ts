// 原则可以少不能多


// 接口的兼容性
namespace h{
  interface Animal {
    name: string;
  }

  interface Person {
    name: string;
    age: number;
  }

  function getName(a: Animal){
    return a.name;
  }
  let p: Person = {name: 'a', age: 1}
  getName(p)
}


// ts中和类型没有关系，和属性有关系


// 基本类型兼容性
namespace a {
  let a: number | string;
  let b: string = 'a';
  a = b 
}

// 类的兼容性
namespace b {
  class Animal {
    name: string
  }
  class Bird extends Animal {
    sing(){}
  }

  let a: Animal = new Bird(); // 因为Bird继承Animal，所以Animal有的属性，Bird一定有
  // let b: Bird = new Animal(); //error

  // 不管对象的具体类型，只要有对应的属性就行
  let c:Animal = {name: 'a'}
}

// 函数参数兼容性
namespace c{
  type FnType = (a: number, b: number) => number;
  let fn: FnType;
  function fn1(a: number, b: number) {
    return 1;
  }
  fn = fn1;
  function fn2(a: number) {
    return 1;
  }
  fn = fn2;
  function fn3() {
    return 1;
  }
  fn = fn3;

  function fn4(a: number, b: number, c: number) {
    return 1;
  }
  // fn = fn4;  // error 因为FnType参数类型不存在第三个参数定义

}

// 函数返回值
namespace d{
  type ReturnType = () => {a: string, b: number};
  let r1: ReturnType;
  function fn1() {
    return {a: 'a', b: 2}
  }
  r1 = fn1;

  function fn2() {
    return {a: 'a'}
  }
  // r1 = fn2; // error 少了不行

  function fn3() {
    return {a: 'a', b: 2, c: true}
  }
  r1 = fn3; 
}

// 函数参数协边
namespace e {
  type ArgType = (a: number | string) => void
  let arg: ArgType;
  function fn1(a: number | string | boolean) {
    console.log(a);
  }
  arg = fn1; 
}

// 泛型
// 
namespace f{
  interface Empty<T> {

  }
  let x: Empty<number>;
  let y: Empty<string>;
  y = x; // 接口是空，x和y本质上是一个空对象，所以可以相互赋值

  interface Empty2<T> {
    data: T
  }
  let a: Empty2<number>;   // a: {data: number}
  let b: Empty2<string>;   // b: {data: string}
  // a = b error

}

// 枚举的兼容性
namespace g {
  enum Colors  {
    Red, Yellow
  }

  let c: Colors;
  c = Colors.Red; // 0 number类型
  c = 1;    // 因为 1也是数字类型，所以可以兼容
}



/// *******

// 类型保护  
// 通过类型保护可以更清楚的知道变量是那种类型，这样就可以单独访问对应类型上的方法
function double(input: string | number | boolean) {
  if(typeof input === 'string') {
    return input.toLowerCase()
  } else {
    return input;
  } 
}

// 类的类型保护

namespace h{
  class Animal{
    public name: string;
  }

  class Bird extends Animal {
    swing(){}
  }

  function getName(a: Animal) {
    // 直接访问
    // a.swing()
    if(a instanceof Bird) {
      a.swing()
    } else {
      a.name
    }
  }
}

namespace i {
  function fn(a: string | null) {
    if(a === null) {
      a = ''
    }
    return a.charAt(0); // 直接访问charAt方法是不行的
  }

  function fn2(a: string | null) {
    return a!.charAt(1);  // 加断言
  }
}


namespace k {
  interface WarningButton{
    class:'warning',
    text1:'修改'
  }
  interface DangerButton{
    class:'danger',
    text2:'删除'
  }
  type Button = WarningButton|DangerButton;
  function getButton(button:Button){
   if(button.class=='warning'){
    console.log(button.text1);
   }
   if(button.class=='danger'){
    console.log(button.text2);
   }
  }
  
}

namespace l {
  // in 运算符可以被用于参数类型的判断
  interface Bird {
    swing: number;
  }

  interface Dog {
    leg: number;
  }

  function getNumber(x: Bird | Dog) {
    if ("swing" in x) {
      return x.swing;
    }
    return x.leg;
  }
}


// 自定义类型保护
namespace n {
  interface Bird {
    name1: 'bird'
    leg: number;
  }

  interface Dog {
    name2: 'dog'
    leg: number;
  }
  function isBird(x: Bird | Dog): x is Bird {
    return x.leg === 2
  } 

  function getAnimal(x: Bird | Dog) {
    if(isBird(x)) {
      return x.name1
    } else {
       return x.name2
    }
  }
}

namespace m {
  interface Bird {
    name: string
    fly(): void
  }
  interface Dog {
    name: string;
    eat(): void
  }
  type Animal = Bird & Dog;
  let a: Animal = {
    name: 'a',
    fly() {},
    eat(){}
  }
}
namespace o {
  let a = {
    name: 'a',
    age: 2
  }
  type Atype = typeof a;
  let b: Atype = {
    name: 'b',
    age: 3
  }
}
namespace p {
  interface A {
    name: {
      age: {
        a: string
      }
    }
  }
  let a: A['name'] = {
    age: {
      a: '1'
    }
  }
}
namespace q{
  interface Animal{
    name: string;
    age: string;
  }
  type AnimalTypes = 'name' | 'age';
  function getName(val: Animal, k: AnimalTypes){
    return val[k];
  }
  
}

namespace r{
  interface Animal{
    name: string;
    age: string;
  }
  type AnimalType = {
    [key in keyof Animal]?: Animal[key]
  }
  // 将Animal类型中的属性，批量定义为可选的了

  // 等同于 
  interface AnimalType {
    name?: string;
    age?: string;
  }

  type AnimalType2<T> = {
    [key in keyof T]?:T[key]
  }
  let a:AnimalType2<Animal>={};
}

namespace s {
  interface Animal {
    name: string;
    age: number;
  }
  type nameType = Pick<Animal, "name">; // { name: string; }

  let a: nameType = {name: 'a'};
}