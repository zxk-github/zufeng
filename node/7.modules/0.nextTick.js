function foo(){
    this.listener;
    process.nextTick(() => {
        this.listener();
    })
}

foo.prototype.add = function(listener) {
    console.log(11);
    this.listener = listener;
}

const fo = new foo();
fo.add(function() {
    console.log(11);
})
