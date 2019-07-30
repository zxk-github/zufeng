// 偏函数

// 执行一个函数三次之后，调用回调函数
function after(times, callback){
    return () => {
        if(--times === 0) {
            callback();
        }
    }
}

let fn = after(3, () => {
    console.log('执行完毕')
})
fn();
fn();
fn();





