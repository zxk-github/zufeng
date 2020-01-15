function throttle(fn, timeout = 30) {
	let canRun = true;
  return function() {
    if(!canRun) return;
      fn(...arguments);
      canRun = false;
      setTimeout(() => {
        fn(...arguments);
          canRun = true;
      }, timeout)
  }
}










