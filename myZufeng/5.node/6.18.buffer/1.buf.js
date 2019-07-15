// 定义buffer的三种形式
const buf1 = Buffer.alloc(6);
const buf2 = Buffer.allocUnsafe(6);
const buf3 = Buffer.from('张');
console.log(buf1, buf2, buf3);

// 填充buffer
// buf1.write(str, offset, length, encode)
// buf1.write('佩奇', 1, 6, 'utf8')  // 填充过程中，会自动判断能不能填充完
console.log(buf1);

console.log(Buffer.alloc(6, 'abc', 'utf8')); // 循环填充fill的内容

buf1.writeInt8(20);
console.log(buf1);

const { StringDecoder} = require('string_decoder');
const buf4 = Buffer.from('珠峰');
const sd = new StringDecoder();
console.log(sd.write(buf4.slice(0,4)))

const buf5 = Buffer.alloc(3);
buf4.copy(buf5, 1, 0, 3);
console.log(buf5);

Buffer.prototype.copy1 = function(target, targetStart, sourceStart, sourceEnd) {
    for(let i = sourceStart; i < sourceEnd; i++) {
        target[targetStart++] = this[i];
    }
}

Buffer.concat1 = function(list) {
    let totalLength = list.reduce((len, item) => len+item.length, 0);
    if(list.length == 0) {
        return list[0]
    }
    let newBuffer = Buffer.alloc(totalLength);
    let pos = 0;
    for(let buf of list) {
        for(let byte of buf) {
            newBuffer[pos++] = byte;
        }
    }
    return newBuffer;
}


