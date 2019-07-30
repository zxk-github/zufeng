async function foo(v) {
    const w = await v;
    return w;
}

const foo2 = function(v) {
    return new Promise((resolve, reject) => {
        const pro = new Promise(res => res(v))
        pro.then(w => resolve(w))
    })
}

