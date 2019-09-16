

function fn(a,b,c,d) {
  console.log(arguments);
  arguments[0] = 'a';
  console.log(a, arguments);
  delete arguments[1];
  console.log(b, arguments)
  arguments[1] = 'b';
  console.log(b, arguments);
  delete arguments[2];
  c = 'cd';
  arguments[2] = 'asd'
  console.log(c, arguments)
}

fn(1,2,3,4)   // arguments是一个类数组,形参和arguments的每一个元素对应，并且是一个映射的关系，但是当delete之后就相当于删除了引用，这时候就会出现修改之后不同步的现象