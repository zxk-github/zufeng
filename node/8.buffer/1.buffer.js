const buf1 = Buffer.alloc(6);
console.log(buf1);

const buf2 = Buffer.allocUnsafe(6);
console.log(buf2);

const buf3 = Buffer.from('张');
console.log(buf3)

buf1.fill(3, 1, 3);
console.log(buf1)

buf2.write('珠峰', 1, 4);
console.log(buf2)
