class Transition {
    perform(anyMethods, wrappers) {
        wrappers.forEach(wrapper => wrapper.initialize());
        anyMethods();
        wrappers.forEach(wrapper => wrapper.close());
    }
}

function say() {
    console.log('say');
}

let transition = new Transition();

transition.perform(say, [{
    initialize() {
        console.log('初始化1')
    },
    close() {
        console.log('关闭1')
    }
}, {
    initialize() {
        console.log('初始化2')
    },
    close() {
        console.log('关闭2')
    }
}])




