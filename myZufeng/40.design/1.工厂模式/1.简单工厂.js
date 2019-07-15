class Plant { 
    constructor(name) {
        this.name = name;
    }

    grow() {

    }
}

class Apple extends Plant {
    constructor(name) {
        super(name)
    }
}

class Orange extends Plant {
    constructor(name, flavour) {
        super(name)
        this.flavour = flavour;
    }
}

// 直接new有什么缺点
// 1. 耦合 
// 2. 依赖具体实现
new Apple()  // 如果

// 简单工厂 调用一个方法，返回一个实例
class Factory {
    create(type) {
        switch(type) {
            case 'apple': 
                return new Apple()
            case 'orange': 
                return new Orange()
        }
    }
}


