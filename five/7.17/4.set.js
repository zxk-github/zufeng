let arr1 = [1, 2, 3, 1, 2, 4];
let arr2 = [3, 1, 6, 2, 7, 8];

// 取并集
function union(...args) {
    const concatArr = Array.prototype.concat.apply([],args);
    const s = new Set(concatArr);
    return [...s];
}
console.log(union(arr1, arr2));

// 取交集 
function intersection(arr1, arr2) {
    let s1 = new Set(arr1);
    let s2 = new Set(arr2);
    return [...s1].filter((item) => {
        return s2.has(item);
    })
} 
console.log(intersection(arr1, arr2));


// WeakMap 弱引用 如果变量被清空了 就会被销毁




