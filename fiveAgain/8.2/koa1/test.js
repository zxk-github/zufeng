
class App {
    constructor() {
        this.middlewares = [];
    }
    use(fn) {
        this.middlewares.push(fn);
    }

    run() {
        let index = 0;
        let i = -1;
        const  dispatch = (index) => {
            if(index <= i) return Promise.reject('duoci');
            i = index;
            if(index === this.middlewares.length) return Promise.resolve(); 
            let middleware = this.middlewares[index];
            return Promise.resolve(middleware({}, () => dispatch(index + 1)));
        }
        return dispatch(index);
    }
    start(cb) {
        this.run().then(() => {
            cb()
        }).catch((err) => {
            console.log(err);
        });
    }
}


const app = new App();

function logger() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('setTimeout')
            resolve();
        }, 1000)
    }) 
}

app.use(async (ctx, next) => {
    console.log(1);
    await next();
    console.log(2);
})
app.use(async (ctx, next) => {
    console.log(3);
    await logger();
    next();
    next();
    console.log(4);
})
app.use((ctx, next) => {
    console.log(5);
    next();
    console.log(6);
})
    

app.start(() => {
    console.log('执行完毕');
});


