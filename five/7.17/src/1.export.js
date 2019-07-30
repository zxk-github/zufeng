// import x, {c} from './a';
// import {c, default as x} from './a';
import * as obj from './a';

// setInterval(() => {
//     console.log(c);
// }, 1000)
// console.log(x);

setInterval(() => {
    console.log(obj.c);
}, 1000)