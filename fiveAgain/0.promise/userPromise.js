const MyPromise = require('./mypromise');

const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(new Promise((resolve) => {
            resolve(22)
        }).then((value) => {
            console.log(value)
        }).then(() => {
            throw new Error(100000)
        }), () => {

        }); 
    }, 1000) 
})
p.then((value) => {
    console.log(value);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(3)
        }, 2000)
    })
},(reason) => {
    console.log(reason);
})
.then((value) => {
    console.log(value);
    return new MyPromise((resolve) => {
        setTimeout(() => {
            resolve(3)
        }, 2000)
    }).then(() => {
        return 10;
    })
})
.then((value) => {
    console.log(value);
})
.then((value) => {
    console.log(value);
})


