let a = 1;
let b = 3;
setInterval(() => {
    a++;
}, 1000)
// export {a};
export {a as c}


// {c, default: 'hello'}
export {b as default};
// export default  'hello word'; 上面这两个是等价的
