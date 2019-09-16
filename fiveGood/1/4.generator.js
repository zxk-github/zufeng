// function *read() {
//   try {
//     console.log(1);
//     yield 'a';
//     console.log(2);
//     yield 'b';
//     console.log(3);
//     // return undefined;
//   } catch(e) {
//     console.log(e);
//   }
// }

// const it = read();
// console.log(it.next()); 
// it.throw('err');
// console.log(it.next());
// console.log(it.next());


// yield传参

function *read2(d) {
  console.log(d);
  let a = yield 1;
  console.log('1', a);
  let b = yield 2;
  console.log(2, b);
}
let it2 = read2('vv');
console.log(it2.next('a')); // 第一次传参是没有作用的
// console.log(it2.next('b'));
// console.log(it2.next('c'));


