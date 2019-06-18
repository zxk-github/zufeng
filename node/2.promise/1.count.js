// 函数执行的次数

function after(times, fn) {
    let count = 0;
    return function () {
        count ++;
        if(count === times) {
            fn()
        }
    }
}

function eat() {
    console.log(1111);
}

let newEat = after(3, eat);
newEat();
newEat();
newEat();


