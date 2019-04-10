
const buf1 = Buffer.alloc(5, 1);
const buf2 = buf1.slice(2, 4);
console.log(buf2);
buf2.fill(2);
console.log(buf1);

const buf3 = Buffer.from("张张张张");
console.log(buf3);
const buf4 = buf3.slice(0,5);
console.log(buf4);
console.log(buf4.toString())

// String_decoder会判断是不是一个字符， 如果是的话就输出，不是的话则换存在对象的内部
// 等下次write的时候，会把前面的缓存的字符串加到第二次的write的buffer上再进行判断

const { StringDecoder } = require('string_decoder');
let sd = new StringDecoder();
console.log(sd.write(buf4));


// buffer连接 concat 
const buf5 = Buffer.from('张')
const buf6 = Buffer.from('张')
// const result = Buffer.concat([buf5, buf6])

Buffer.concat2 = function(list, total=list.reduce((len, item) => len + item.length, 0)) {
    if(list.length == 1) {
        return list[0]
    }
    let index = 0;
    let result = Buffer.alloc(total);
    for(let buf of list) {
        for(let b of buf) {
            if(index >= total) {
                return result;
            } else {
                result[index ++] = b;
            }
        }
    }
    return result;
}
const result = Buffer.concat2([buf5, buf6], 5)
console.log(result);
