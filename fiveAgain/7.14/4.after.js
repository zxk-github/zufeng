function times(time, cb) {
    return () => {
        if(--time === 0) {
            cb();
        }
    }
}

var fn = times(3, () => {
    console.log('结束');
})
fn();
fn();
fn();


