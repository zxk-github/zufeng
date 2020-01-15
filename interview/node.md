## 先执行一段代码
a/index.js
```
 modulex.exports = 1;
```

useA.js
```
const a = require('./a');
const express = require('express');
console.log(module);
console.log(global.require);  
```
执行useA.js
```
Module {
  id: '.',
  exports: {},
  parent: null,
  filename: '/Users/mac/Desktop/share/demo1/useA.js',
  loaded: false,
  children:
    [ Module {
        id: '/Users/mac/Desktop/demo/a.js',
        exports: '1',
        parent: [Circular],
        filename: '/Users/mac/Desktop/demo/a.js',
        loaded: true,
        children: [],
        paths: [Array] } ],
  paths:
    [ '/Users/zhangxk/Desktop/demo/node_modules',
      '/Users/zhangxk/Desktop/node_modules',
      '/Users/zhangxk/node_modules',
      '/Users/node_modules',
      '/node_modules' ] }
undefined
```
通过上面的代码我们可以想到几个问题
* useA.js是如何找到a/index.js和express的

* a.js的module.exports在useA.js中是如何获取到的

* console.log(global.require); 输出的是undefined，说明require不挂载在全局对象上，那为什么可以使用

* 模块中并没有申明module变量，为什么可以输出一个对象

本篇文章就通过这四个问题，来逐渐解析node模块化机制

## 模块查找规则

1. 首先我看一下require()函数在node内部是如何定义的
```
function require(path) {
  try {
    exports.requireDepth += 1;
    return mod.require(path);
  } finally {
    exports.requireDepth -= 1;
  }
}
```
2. mod.require
```
Module.prototype.require = function(id) {
    // ...
  return Module._load(id, this, /* isMain */ false);
};
```

3. Module._load函数
```
Module._load = function(request, parent, isMain) {
  //获取文件路径
  var filename = Module._resolveFilename(request, parent, isMain);
  // 尝试从缓存中读取模块
  var cachedModule = Module._cache[filename];
  if (cachedModule) {
    updateChildren(parent, cachedModule, true);
    return cachedModule.exports;
  }
    // 如果是原生模块返回
  if (NativeModule.nonInternalExists(filename)) {
    debug('load native module %s', request);
    return NativeModule.require(filename);
  }
  // 第三方模块创建模块对象
  var module = new Module(filename, parent);

  if (isMain) {
    process.mainModule = module;
    module.id = '.';
  }
 
 // 缓存模块
  Module._cache[filename] = module;
    
 // 加载模块
  tryModuleLoad(module, filename);

 // 返回模块的exports
  return module.exports;
};
```
4. Module._resolveFilename 如何查找到文件路径的
```
Module._resolveFilename = function(request, parent, isMain, options) {
// 如果是node原生模块，直接返回模块名称
  if (NativeModule.nonInternalExists(request)) {
    return request;
  }

  var paths;

  if (typeof options === 'object' && options !== null &&
     // ...
  } else {
    // 获取模块可能出现的位置 
    paths = Module._resolveLookupPaths(request, parent, true);
  }
  // 精确查找模块位置
  var filename = Module._findPath(request, paths, isMain);
  return filename;
};

```
5. Module._resolveLookupPaths粗略查找文件可能出现的范围
```
Module._resolveLookupPaths = function(request, parent, newReturn) {
  //  判断是不是以./或者../引入的模块
  if (request.length < 2 ||
      request.charCodeAt(0) !== CHAR_DOT ||
      (request.charCodeAt(1) !== CHAR_DOT &&
       request.charCodeAt(1) !== CHAR_FORWARD_SLASH)) {
// 将本机NODE_PATH全局路径、用户根目录下的.node_modules和.node_libraries组成的数组赋值给paths
    var paths = modulePaths;
 if (parent) {
      if (!parent.paths)
        paths = parent.paths = [];
      else
        // 将父级paths属性
        paths = parent.paths.concat(paths);
 }
    
  const base = path.basename(parent.filename);
  var parentIdPath;
  if (base.length > indexLen) {
    var i = 0;
    for (; i < indexLen; ++i) {
      if (indexChars[i] !== base.charCodeAt(i))
        break;
    }
    if (i === indexLen) {
      // We matched 'index.', let's validate the rest
      for (; i < base.length; ++i) {
        const code = base.charCodeAt(i);
        if (code !== CHAR_UNDERSCORE &&
            (code < CHAR_0 || code > CHAR_9) &&
            (code < CHAR_UPPERCASE_A || code > CHAR_UPPERCASE_Z) &&
            (code < CHAR_LOWERCASE_A || code > CHAR_LOWERCASE_Z))
          break;
      }
      if (i === base.length) {
        // Is an index module
        parentIdPath = parent.id;
      } else {
        // Not an index module
        parentIdPath = path.dirname(parent.id);
      }
    } else {
      // Not an index module
      parentIdPath = path.dirname(parent.id);
    }
  } else {
    // Not an index module
    parentIdPath = path.dirname(parent.id);
  }
  var id = path.resolve(parentIdPath, request);

  // make sure require('./path') and require('path') get distinct ids, even
  // when called from the toplevel js file
  if (parentIdPath === '.' && id.indexOf('/') === -1) {
    id = './' + id;
  }
  var parentDir = [path.dirname(parent.filename)];
  return (newReturn ? parentDir : [id, parentDir]);
};
```
6. 精确查找文件路径
```
Module._findPath = function(request, paths, isMain) {
  if (path.isAbsolute(request)) {
    paths = [''];
  } else if (!paths || paths.length === 0) {
    return false;
  }

  var cacheKey = request + '\x00' +
                (paths.length === 1 ? paths[0] : paths.join('\x00'));
  // 尝试从缓存路径中获取路径
  var entry = Module._pathCache[cacheKey];
  if (entry)
    return entry;

  var exts;
  var trailingSlash = request.length > 0 &&
    request.charCodeAt(request.length - 1) === CHAR_FORWARD_SLASH;
  if (!trailingSlash) {
    trailingSlash = /(?:^|\/)\.?\.$/.test(request);
  }

  // For each path
  for (var i = 0; i < paths.length; i++) {
    // Don't search further if path doesn't exist
    const curPath = paths[i];
    if (curPath && stat(curPath) < 1) continue;
    var basePath = path.resolve(curPath, request);
    var filename;
    // 调用internalModuleStat方法来判断文件或者文件夹是否存在，文件存在返回0，文件夹存在返回1，文件或文件夹不存在返回-2
    var rc = stat(basePath);
    if (!trailingSlash) {
      if (rc === 0) {  // File.
        if (!isMain) {
          if (preserveSymlinks) {
            filename = path.resolve(basePath);
          } else {
            filename = toRealPath(basePath);
          }
        } else if (preserveSymlinksMain) {
          filename = path.resolve(basePath);
        } else {
          filename = toRealPath(basePath);
        }
      }

      if (!filename) {
        // try it with each of the extensions
        if (exts === undefined)
          exts = Object.keys(Module._extensions);
        // 一次尝试加载.js .json .node结尾的文件
        filename = tryExtensions(basePath, exts, isMain);
      }
    }
    // 
    if (!filename && rc === 1) {  // Directory.
      // try it with each of the extensions at "index"
      if (exts === undefined)
        exts = Object.keys(Module._extensions);
      // 尝试加载文件夹下package.json 配置的main字段对应的文件路径
      filename = tryPackage(basePath, exts, isMain);
      if (!filename) {
        // 尝试获取文件夹下的index.js
        filename = tryExtensions(path.resolve(basePath, 'index'), exts, isMain);
      }
    }

    if (filename) {
      // 缓存路径
      Module._pathCache[cacheKey] = filename;
      return filename;
    }
  }
  return false;
};
```

### 现在回答第一个问题，node是如何找到模块的
#### 阶段1. 粗查阶段
* 如果是node核心模块，就直接返回模块名称

* 如果是引入的第三方npm模块，会返回父级所在文件夹下的node_modules，父父级所在文件夹下的node_modules，依次递归，一直到/node_modules和用户名下的.node_modules以及全局环境变量配置的全局安装的模块文件夹组成的数组

* 如果是相对路径引入的模块，会将相对路径和父级路径之间进行一个path.resolve()，然后返回

#### 阶段2. 精确查找，获取文件绝对路径
  以require('express')为例
* 先尝试加载node_modules/express，这种没有扩展名的文件是否存在
* 尝试按照扩展名规则查找，依次判断node_modules文件夹下.js .json .node结尾的文件名为express的文件是否存在，返回文件的绝对路径
* 判断node_modules/express文件夹下的package.json是否存在，如果存在，返回main字段指定的文件的绝对路径
* 判断node_modules/express/index.js是否存在，存在返回对应文件绝对路径

![IMG](https://piccdn.luojilab.com/fe-oss/default/MTU2ODI4MDQwNjQ0.png?raw=true)

## 解析模块
1. Module._resolveFilename(request, parent, isMain);获取到文件绝对路径之后，执行tryModuleLoad(module, filename); 尝试加载模块

2. tryModuleLoad 直接调用Module.prototype.load函数
```
Module.prototype.load = function(filename) {
    this.filename = filename;
    // 以文件绝对路径为基准，初始化node_modules
    this.paths = Module._nodeModulePaths(path.dirname(filename));
    // 如果文件没有扩展名，初始化为.js结尾的
    var extension = path.extname(filename) || '.js';
    // 调用扩展名对应的解析规则
    if (!Module._extensions[extension]) extension = '.js';
    Module._extensions[extension](this, filename);
    this.loaded = true;
};
```
3. .js .json .node结尾的文件，node的解析规则
```
// Native extension for .js
Module._extensions['.js'] = function(module, filename) {
    var content = fs.readFileSync(filename, 'utf8');
    module._compile(stripBOM(content), filename);
};
// Native extension for .json
Module._extensions['.json'] = function(module, filename) {
  var content = fs.readFileSync(filename, 'utf8');
  try {
    module.exports = JSON.parse(stripBOM(content));
  } catch (err) {
    err.message = filename + ': ' + err.message;
    throw err;
  }
};
// Native extension for .node
Module._extensions['.node'] = function(module, filename) {
    return process.dlopen(module, path.toNamespacedPath(filename));
};
```
json会直接读取文件内容，JSON.parse直接输出，.node文件会使用process.dlopen()执行文件，这两种文件处理比较简单，这里详细分析.js结尾的文件

4. module._compile执行js文件编译
```
Module.prototype._compile = function(content, filename) {
  // ...
  // 将模块代码
  var wrapper = Module.wrap(content);
  // 将字符串转换成可执行的js代码 
  var compiledWrapper = vm.runInThisContext(wrapper, {
    filename: filename,
    lineOffset: 0,
    displayErrors: true
  });
  // ...
  // 执行函数
  result = compiledWrapper.call(this.exports, this.exports, require, this,
                                  filename, dirname);
  return result;
}
```

5. Module.wrap通过字符串拼接，在代码外包含一个函数
```
Module.wrap = function(script) {
    return Module.wrapper[0] + script + Module.wrapper[1];
};
Module.wrapper = [
    '(function (exports, require, module, __filename, __dirname) { ',
    '\n});'
];
```
6. 调用vm.runInThisContext将字符串转为可执行的js函数
7. compiledWrapper.call(this.exports, this.exports, require, this, filename, dirname);
执行函数，module.exports, require函数, module作为三个参数，在函数内部给module.exports进行赋值，模块内部可以使用require函数加载模块，可以获取到module变量，描述当前模块的信息，

## 模拟实现require函数
```
const path = require('path');
const fs = require('fs');
const vm = require('vm');

function Module(id) {
  this.id = id;
  this.exports = {};
}

Module._extensions = {};

let wrapper = [
  '(function(exports, module, require, __dirname, __filename){',
  '})'
]

Module._extensions['.js'] = function(module) {
  let script = fs.readFileSync(module.id, 'utf8');
  let fnStr = wrapper[0] + script + wrapper[1];
  let fn = vm.runInThisContext(fnStr);
  
  fn.call(module.exports, module.exports, module, MyRequire);
}

Module.prototype.load = function() {
  let ext = path.extname(this.id);
  Module._extensions[ext](this);
}

function MyRequire(filePath) {
  let absPath = path.resolve(__dirname, filePath);
  let module = new Module(absPath);
  module.load();
  return module.exports;
}

let a = MyRequire('./test.js');
console.log(a);
```












