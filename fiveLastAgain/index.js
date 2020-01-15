function fn() {
  var ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 igetapp/7.8.0 (iOS)';
  if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i)) {
      return true;
  } else {
      return false;
  }
}
console.log(fn())