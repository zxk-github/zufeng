// map reduce reduceRight filter some every

// reduce 收敛 多次计算的结构收敛成一个值
const total1 = [1,2,3,4,5].reduce((prev, next, index, arr) => {
    return prev + next;
})
console.log(total1);

const total2 = [{price: 2, num: 2}, {price: 3, num: 3}, {price: 4, num: 4}].reduce((prev, next, index, arr) => {
    return prev + next.price * next.num
}, 0)

console.log(total2);

// compose 组合 可以将多个函数进行组合
function sum(...args) {
    return args.join('');
}

function len(str) {
    return str.length;
}

function tag(str) {
    return '$'+str;
}

console.log(tag(len(sum('a', 'b', 'c'))))

// reduceRight 从右边开始 向左边执行
function compose(...fns) {
    return function(...args) {
        let first = fns.pop();
        return fns.reduceRight((prev, current, index, arr) => {
            return current(prev);
        }, first(...args))
    }
}

// 方法1 一个一个按照之前的顺序调用
let compose1 = (...fns) => (...args) => {
    let first = fns.pop();
    return fns.reduceRight((prev, current, index, arr) => current(prev), first(...args))
}

console.log(compose1(tag, len, sum)('a', 'b', 'c'))

// 方法2 三个函数合并称为一个，然后一次性执行
function compose2(...fns) {
    return fns.reduce((prev, current, index, arr) => {
        return function(...args) {
            return prev(current(...args));
        }
    })
    
}

let componse3 = (...fns) => fns.reduce((a, b) => (...args) => a(b(...args)));
console.log('11',componse3(tag, len, sum)('a', 'b', 'c'))

// reduce方法不能为空数组

// 实现reduce 
Array.prototype.reduce1 = function(callback, prev) {
    for(let i = 0; i < this.length; i++) {
        if(typeof prev === 'undefined') {
            prev = callback(this[i], this[i+1], i+1, this);
            i++;
        }else {
            prev = callback(prev, this[i], i, this);
        }
    }
    return prev
}



const res1 = [1,2,3,4,5].reduce1((prev, current) => {
    return prev + current;
})
console.log(res1);


const res2 = [1].reduce((prev, current) => {
    return prev + current;
}, 2)
console.log(res2);

// map 加工数组的每一项，返回一个新的数组
const arrMap = [1, 2, 3].map((item) => {
    return `<li>${item}</li>`
})
console.log(arrMap);





