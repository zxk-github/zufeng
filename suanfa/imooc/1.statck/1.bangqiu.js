
let arr = ['5', '2', 'C', 'D', '+'];
function statck(arr) {
  let result = [];
  let prev1;
  let prev2;
  let current;
  for(let i = 0; i < arr.length; i++) {
    let mark = arr[i];
    switch(mark) {
      case 'C': 
        if(result.length > 0) {
          result.pop();
        }
        break;
      case 'D': 
        prev = result.pop();
        current = prev*2;
        result.push(prev, current);
        break;
      case '+': 
        prev1 = result.pop();
        prev2 = result.pop();
        current = prev1 + prev2;
        result.push(prev2, prev1, current);
        break;
      default:
        result.push(mark-0);
    }
  }
  return result.reduce((cur, prev) => cur + prev)
}

console.log(statck(arr))


