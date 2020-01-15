// 冒泡排序就是 前者大于后者那么两者就交换顺序，大的在后小的在前
var arr = [3, 4, 1, 2];
function bubbleSort (arr) {
  var max = arr.length - 1;
  for (var j = 0; j < max; j++) {
    for (var i = 0; i < max - j; i++) {
      if (arr[i] > arr[i + 1]) {
        var temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
    }
  }
  return arr;
}
console.log(bubbleSort(arr))

var quickSort = function(arr) {
　　if (arr.length <= 1) { return arr; }
　　var mid = Math.floor(arr.length / 2);
　　var mark = arr.splice(mid, 1)[0];
　　var left = [];
　　var right = [];
　　for (var i = 0; i < arr.length; i++){
　　　　if (arr[i] < mark) {
　　　　　　left.push(arr[i]);
　　　　} else {
　　　　　　right.push(arr[i]);

　　　　}
　　}
　　return quickSort(left).concat([mark], quickSort(right));
};
console.log(quickSort(arr))



function binaryInsertSort(arr){
  for (var i = 1; i < arr.length; i++) {
  var key = arr[i], left = 0, right = i - 1;
  while (left <= right) {
  var middle = parseInt((left + right) / 2);
  if (key < arr[middle]) {
    right = middle - 1;
  } else {
    left = middle + 1;
  }
  }
  for (var j = i - 1; j >= left; j--) {
  arr[j + 1] = arr[j];
  }
  arr[left] = key;
  }
  return arr;
}
