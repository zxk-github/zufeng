var a1 = 1;
var a2 = '1';
var a3 = true;
var a4 = [1, 2];
// 元组
var a5 = [1, 'a'];
// a5.push(true);// 
// a5[2] = 1
// 枚举 枚举只能赋值数字
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Blue"] = 1] = "Blue";
})(Color || (Color = {}));
// 直接取值
var a6 = Color.Red;
// 获取key值
var a7 = Color[0];
console.log(a6, a7);
// any any代表任何值
var a8 = 1;
// a = true 因为已经赋值了1，所以会进行类型推断，所以再次赋值为true的时候，回报错
// void void表示没有任何类型，比如:当函数没有返回值的时候就用void
// 给变量申明为void是没有任何意义的，只能赋值称undefined/null
// never 表示永远不存在数据类型，当函数永远不会执行结束，或者是函数会直接抛出错误的时候，会申明为这个类型
// null和undefined是任何数据类型的子类型，可以赋值给任何类型，变量申明成undefined/null只能赋值称undefined或者null
// object 除了简单数据行类型undefied null number string boolean都可以是object类型
// 类型断言: 当你比ts更加知道一个变量的类型的时候，这时候可以省去ts类型检查
var a9 = 'a';
var a10 = a9.length;
var a11 = a9.length;
function a12(val) {
}
var a13 = { label: '1', b: 2, num: 1 };
a12(a13); // 这种变量转换多出的不会被校验
// a12({label: '1', age: 12}) 这种直接传入值的形式就会校验
// 泛型只读数组
// 定时数组两种方式 let a: number[]   let b: <Array>number
var a14 = [1, 2];
function a15(arg) { }
// 解决这种传入数据多余定于的接口key值办法
// a15({babel: 'a', number: 1})
// 1.使用类型断言
a15({ babel: 'a', number: 1 });
// 2.将值保存在一个变量中
var a16 = { babel: 'b', number: 2 };
a15(a16);
var a18 = function (a, b) {
    return 1;
};
