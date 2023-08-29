"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Home = _interopRequireDefault(require("@/pages/Home"));

var _Login = _interopRequireDefault(require("@/pages/Login"));

var _Register = _interopRequireDefault(require("@/pages/Register"));

var _Search = _interopRequireDefault(require("@/pages/Search"));

var _Detail = _interopRequireDefault(require("@/pages/Detail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

var originPush = _vueRouter["default"].prototype.push;
var originReplace = _vueRouter["default"].prototype.replace; // 重写 push| replace

_vueRouter["default"].prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    //call||app1y区别
    //相同点，都可以调用函数一次，都可以篡改函数的上下文1次
    //不痛点: call与apply传递参数: call传递 参数用逗号隔开，apply方法执行， 传递数组
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, function () {}, function () {});
  }
};

_vueRouter["default"].prototype.push = function (location, resolve, reject) {
  if (reject && resolve) {
    originReplace.call(this, resolve, reject);
  } else {
    originReplace.call(this, location, function () {}, function () {});
  }
}; // 配置路由


var _default = new _vueRouter["default"]({
  routes: [{
    path: '/Detail/:skuid',
    component: _Detail["default"],
    meta: {
      show: true
    },
    name: 'Detail'
  }, {
    path: '/home',
    component: _Home["default"],
    meta: {
      show: true
    },
    name: 'home'
  }, {
    path: '/login',
    component: _Login["default"],
    meta: {
      show: false
    },
    name: 'login'
  }, {
    path: '/register',
    component: _Register["default"],
    meta: {
      show: false
    },
    name: 'register'
  }, {
    path: '/search/:keyword?',
    component: _Search["default"],
    meta: {
      show: true
    },
    name: 'search' //路由组件能不能传递props数据?
    //布尔值写法:params
    // props:true, 
    //对象写法:额外的给路由组件传递些props
    // props:{a:1,b:2},
    //函数写法:可以params参数、query参 数，通过props传递给路由组件
    // props: ($route) => ({ keyword: $route.params.keyword, k: $route.query.k })

  }, // 重定向 项目执行run 默认访问首页
  {
    path: '*',
    redirect: "/home",
    meta: {
      show: true
    }
  }]
}); // export default router


exports["default"] = _default;