let arr1 = [1, 2, 3, 4,5,6,7]
let arr2 = [4, 1, 1, 3, 5];
let arr3 = [1, 2, 3];
// 取并集
function union(...args) {
    const arr = Array.prototype.concat.apply(...args);
    return [...new Set(arr)];
}
console.log(union(arr1, arr2))

// 取交集
function intersection(...args) {
    const setArr = args.map(arg => new Set(arg));
    return setArr.reduce((prev, current) => [...prev].filter(it => current.has(it)))
}
console.log(intersection(arr1, arr2, arr3))

// 取差集 两个数组 你 我都没有的东西

function difference(a, b) {
    return a.concat(b.filter(function(v){ return !(a.includes(v))})); 
}

console.log(difference(arr1, arr2));






