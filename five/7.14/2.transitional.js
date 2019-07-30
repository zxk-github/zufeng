// react中的事务
class Transaction {
    perform(anyMethod, wrappers) {
        wrappers.forEach(wrapper => wrapper.initialize());
        anyMethod();
        wrappers.forEach(wrapper => wrapper.close())
    }
}


let transaction = new Transaction();
let oldFn = () => {
    console.log('原有逻辑');
}

transaction.perform(oldFn, [{
    initialize() {
        console.log('初始化1');
    },
    close() {
        console.log('关闭1')
    }
},{
    initialize() {
        console.log('初始化2');
    },
    close() {
        console.log('关闭2')
    }
}])



