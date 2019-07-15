class Window {
    constructor(name) {
        this.name = name;
    }

    static getInstance() {
        if(!this.instancce) {
            this.instancce = new Window('foo');
        }
        return this.instancce;
    }
}

let w1 = Window.getInstance();
let w2 = Window.getInstance();
console.log(w1 === w2);


