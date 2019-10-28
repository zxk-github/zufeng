// 通用的事件侦听函数
let event = {
  readyEvent: function(fn) {
    if(typeof fn !== 'function') {
      throw Error('fn must be function')
    }
    var loaded = window.onload;
    if(typeof window.onload !== 'function') {
      window.onload = fn;
    } else {
      window.onload = function() {
        loaded();
        fn();
      }
    }
  },
  addEvent(element, type, handler) {
    if(element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if(element.attachEvent){
      element.attachEvent('on'+type, function() {
        handler.call(element);
      });
    } else {
      element['on'+type] = handler;
    }
  },
  removeEvent(element, type, handler) {
    if(element.removeEventListener) {
      element.removeEventListener(type, handler);
    } else if(el.detachEvent) {
      element.detachEvent('on'+type, handler);
    } else {
      element['on'+type] = null;
    }
  },
  stopPropagation(ev) {  // ie仅仅支持事件冒泡，不支持捕获
    if(ev.stopPropagation) {
      ev.stopPropagation();
    } else {
      ev.cancelBubble = true;
    }
  },
  preventDefault(ev) {
    if(ev.preventDefault) {
      ev.preventDefault();
    } else {
      ev.returnValue = false
    }
  },
  getTarget(ev) {
    return ev.target || ev.srcElement
  }
}