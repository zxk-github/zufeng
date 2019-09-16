class Transaction {
  perform(anyMethod, wrappers) {
    wrappers.forEach(wrapper => wrapper.initialize());
    anyMethod();
    wrappers.forEach(wrapper => wrapper.close())
  }
}

const transaction = new Transaction();
const method = function() {
  console.log(111);
}
transaction.perform(method, [{
  initialize() {
    console.log(11);
  },
  close() {
    console.log(33);
  }
},{
  initialize() {
    console.log(222);
  },
  close() {
    console.log(444);
  }
}])