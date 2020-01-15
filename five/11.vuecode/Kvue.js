class KVue {
  constructor (options) {
    this.$options = options;
    this.$data = options.data;
    this.observe(this.$data) //对this.$data进行观察

    new Compile(options.el, this);

    if(options.created) {
      options.created.call(this);
    }

  }
  observe(value) {
    if(!value || typeof value !== 'object') {
      return;
    }
    // 遍历
    Object.keys(value).forEach((key) => {
      this.defineReactive(value, key, value[key]);
      this.proxyData(key) // 为了vm.xxx 访问数据
    })
  }

  defineReactive(obj, key, value) {
    // 递归
    this.observe(value);

    // 一个key对应一个dep
    const dep = new Dep();

    Object.defineProperty(obj, key, {
      get() {
        // 每次取值都会收集一次
        Dep.target && dep.addDep(Dep.target);
        return value;
      },
      set(newValue) {
        if(newValue == value) {
          return;
        } 
        value = newValue
        // console.log(`${key}属性更新了`)
        dep.notify();
      }
    })
  }

  proxyData(key) {
    // 给vm加上
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key]
      },
      set(newValue) {
        this.$data[key] = newValue;
      }
    })
  }
}

// 每个{{}} 会生成一个watcher，多个相同key的watcher会在一个dep数组中

// data中一个key对应一个dep
class Dep {
  constructor() {
    this.deps = [];
  }

  // 新增watcher 
  addDep(dep) {
    this.deps.push(dep);
  }

  // 通知

  notify() {
    this.deps.forEach(dep => dep.update());
  }
}

// 监听器：负责更新页面中的具体绑定 一个{{}} 或者指令对应一个watcher 保存data中的key和页面中哪个DOM有关系
class Watcher {
  // vm是KVue实例, key是data的一个属性
  constructor(vm, key, cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;
    Dep.target = this;
    this.vm[this.key]  // 读取一下，触发依赖收集
    Dep.target = null; // 然后清除target，防止再次在一个dep里面添加多个相同的watcher
  }
  update() {
    // console.log(this.key + '更新了')
    this.cb.call(this.vm, this.vm[this.key])
  }
}

// 编译流程
/**
 *  1.遍历所有子节点 
 *  2.文本节点，获取{{}}格式并解析，找到其中的值并创建一个watcher
 *  3.元素节点，访问节点属性，截获k-和@开头的，解析创建对应的wather
 */