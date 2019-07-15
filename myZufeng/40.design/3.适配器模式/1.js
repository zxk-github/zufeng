// 用户连接适配器，适配器连接电源

class Power {
    charge() {
        return 220
    }
}

class Adapor {
    constructor() {
        this.adaptor = new Power()
    }
    charge() {
        const v = this.adaptor.charge();
        return `${v} => 12`
    }
}

class Mobile {
    constructor() {
        this.mobile = new Adapor();
    }
    use() {
        const v = this.mobile.charge();
        console.log(v);
    }
}


const mobile = new Mobile();
mobile.use();