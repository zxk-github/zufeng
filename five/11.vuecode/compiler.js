class Compile {
  constructor (el, vm) {
    this.$vm = vm;
    this.$el = document.getElementById(el);
    // 先把模板代码移动到fragment标签中，更新完成之后再追加回来
    this.$fragment = this.node2Fragment(this.$el)

    // 执行编译
    this.compile(this.$fragment);
    // 追加，将编译之后的结果直接放进$el那个元素中
    this.$el.appendChild(this.$fragment);
  }
  // 就是一个移动操作 
  node2Fragment(el) {
    // 创建一个和当前页面没有关系的标签，所有操作都在这上面做，但是浏览器不会刷新，当把更新操作全部完成，一次性放进浏览器里面
    const fragment = document.createDocumentFragment();
    let child;
    while(child = el.firstChild) {
      // 这是异步移动操作,之前el中标签的元素会被移除到fragment中，每操作一次，el中就少一个元素
      fragment.appendChild(child)
    }
    return fragment;
  }
  // 递归el，分别处理文本节点和元素节点
  compile(el) {
    // 1.先拿出所有孩子节点
    const childNodes = el.childNodes;
    
    Array.from(childNodes).forEach(node => {
      if(node.nodeType === 1) { // 1 元素节点<p></p> 3 文本节点 xxx
        // console.log('元素节点')
        this.compileElement(node);
      } else if (this.isInter(node)) {
        // 文本节点，并且内容是{{xxx}}形式
        // console.log('插值文本', node.textContent)
        this.compileText(node);
      }
      // 递归子节点
      if(node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })

  }

  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }

  compileElement(node) {
    // 获取所有html属性，然后遍历解析
    const nodeAttrs = node.attributes;
    Array.from(nodeAttrs).forEach(attr => {
      const attrName = attr.name;
      const exp = attr.value;
      if(attrName.indexOf('k-') === 0) {
        const dir = attrName.substring(2);
        // 指令的解析
        this[dir] && this[dir](node, exp);
      }
    })
  }

  compileText(node) {
    // console.log(RegExp.$1, this.$vm)
    // node.textContent = this.$vm[RegExp.$1];
    const exp = RegExp.$1;
    this.update(node, exp, 'text');
  }

  // 通用update方法
  update(node, exp, dir) {
    // 获取更新函数
    let updator = this[dir + 'Updator'];
    
    // 初始化 首次页面赋值
    updator && updator(node, this.$vm[exp]);

    // 创建Watcher 页面中有一个{{}} 或者v-都会又一个Watcher,保存这对应属性和页面DOM之间的关系
    
    // 传入当前实例，{{}}中的变量名称，更新回调函数
    new Watcher(this.$vm, exp, function(value) {
      updator && updator(node, value)
    })
  }

  text(node, exp) {
    this.update(node, exp, 'text');
  }

  textUpdator(node, value) {
    node.textContent = value;
  }

  html(node, exp) {
    this.update(node, exp, 'html');
  }
  htmlUpdator(node, value) {
    node.innerHTML = value;
  }

}