export {c} from './a';
// console.log(c)  // 这种使用方式就不能在这个文件中获取到c了
let d = 1;
export {
    d
}