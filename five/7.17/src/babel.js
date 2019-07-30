"use strict";

function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol": typeof obj;
        };
    }
    return _typeof(obj);
}

function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}

function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get;
    } else {
        _get = function _get(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver);
            }
            return desc.value;
        };
    }
    return _get(target, property, receiver || target);
}

function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = _getPrototypeOf(object);
        if (object === null) break;
    }
    return object;
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf: function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }

    // 子类继承父类公共属性
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    // o.__proto__ = p; 继承父类的静态方法
    if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}

function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !! right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}

function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    // 原型上的定义在构造函数的原型上 原型上方法 enumerable 原型上的方法默认不可枚举
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

var Animal =
/*#__PURE__*/
function() {
    function Animal(type) {
        // 检查this 是不是当前class的实例
        _classCallCheck(this, Animal);

        this.type = type;
    }

    // 分别定义在原型和类上
    _createClass(Animal, [{  
        key: "eat",
        value: function eat() {
            console.log('eat');
        }
    }], [{
        key: "fn",
        //静态属性是可以被子类继承的 内部实现就是 Tiger.__proto__ = Animal
        value: function fn() {
            console.log(4);
            return 'fn';
        }
    }]);

    return Animal;
} ();

// 定义静态属性
_defineProperty(Animal, "flag", 'animal');

var Tiger =
/*#__PURE__*/
function(_Animal) {
    _inherits(Tiger, _Animal);

    // 内部本身 call + object.create
    function Tiger(type) {
        _classCallCheck(this, Tiger);

        return _possibleConstructorReturn(this, _getPrototypeOf(Tiger).call(this, type));
    }

    _createClass(Tiger, [{
        key: "eat",
        value: function eat() {
            _get(_getPrototypeOf(Tiger.prototype), "eat", this).call(this);

            console.log('21');
        }
    }], [{
        key: "fn",
        value: function fn() {
            console.log(2);

            _get(_getPrototypeOf(Tiger), "fn", this).call(this);

            return '12';
        }
    }]);

    return Tiger;
} (Animal);

var tiger = new Tiger('ok');