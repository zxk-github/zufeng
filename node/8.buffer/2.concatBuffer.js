Buffer.concat = function(list, total = list.reduce((len, item) => len + item.length, 0)) {
    if(list.length === 1) {
        return list[0]
    }
    console.log(total);
    let index = 0;
    let result = Buffer.alloc(total);
    for(let buf of list) {
        for(let bit of buf) {
            // if(index > total) {
            //     return result;
            // } else {
            //     result[index ++] = bit;
            // }
            result[index ++] = bit;
        }
    }
    return result;
}
let buf1 = Buffer.from('张');
let buf2 = Buffer.from('张')
const result = Buffer.concat([buf1, buf2]);
console.log(result.toString());