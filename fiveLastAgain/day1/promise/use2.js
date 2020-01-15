setTimeout(function(){
  console.log('1')
});

new Promise(function(resolve){
  console.log('2');
  for(var i = 0; i < 10000; i++){
      i == 99 && resolve();
  }
}).then(function(){
  console.log('3')
});

console.log('4');

// 2 4 3 1





new Promise((resolve, reject) => {
  for(var i = 0; i < 10; i++) {
    if(i === 3) {
      
      // console.log('break')
      resolve()
      console.log('break')
      break;
    }
    console.log(i);
  }
})
.then((data) => {
  console.log('then')
})


console.log('1');

setTimeout(function() {
  console.log('2');
  new Promise(function(resolve) {
      console.log('3');
      resolve();
  }).then(function() {
      console.log('4')
  })
})

new Promise(function(resolve) {
  console.log('5');
  resolve();
}).then(function() {
  console.log('6')
})

setTimeout(function() {
  console.log('7');
  new Promise(function(resolve) {
      console.log('8');
      resolve();
  }).then(function() {
      console.log('9')
  })
})

// 1 5 