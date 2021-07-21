"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Map = _interopRequireDefault(require("@/views/Map.vue"));

var _Header = _interopRequireDefault(require("@/components/Header.vue"));

var _UserInfo = _interopRequireDefault(require("@/views/UserInfo.vue"));

var _Planning = _interopRequireDefault(require("@/views/Planning.vue"));

var _Login = _interopRequireDefault(require("@/views/Login.vue"));

var _Blog = _interopRequireDefault(require("@/views/Blog.vue"));

var _Blog_edit = _interopRequireDefault(require("@/views/Blog_edit.vue"));

var _Planning_edit = _interopRequireDefault(require("@/views/Planning_edit.vue"));

var _Profile = _interopRequireDefault(require("@/views/Profile.vue"));

var _Friend = _interopRequireDefault(require("@/views/Friend.vue"));

var _Test = _interopRequireDefault(require("@/components/Test.vue"));

var _Browse = _interopRequireDefault(require("@/views/Browse.vue"));

var _ViewTry = _interopRequireDefault(require("@/views/ViewTry.vue"));

var _MapL = _interopRequireDefault(require("@/views/MapL.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

var original = _vueRouter["default"].prototype.push;

_vueRouter["default"].prototype.push = function push(location) {
  return original.call(this, location)["catch"](function (err) {
    return err;
  });
};

var _default = new _vueRouter["default"]({
  mode: 'history',
  routes: [{
    path: '/try',
    name: 'Try',
    components: {
      "default": _ViewTry["default"],
      nav: _Header["default"]
    }
  }, {
    path: '/',
    name: 'MyMap',
    components: {
      "default": _Map["default"],
      nav: _Header["default"]
    }
  }, {
    path: "/login",
    name: "login",
    components: {
      "default": _Login["default"],
      nav: _Header["default"]
    } // () => import("../views/Login.vue")
    //  箭頭函式就不能nav?

  }, {
    path: '/userInfo',
    name: 'userInfo',
    components: {
      "default": _UserInfo["default"],
      nav: _Header["default"]
    },
    children: [{
      path: "profile",
      name: "Profile",
      component: _Profile["default"]
    }, {
      path: "friend",
      name: "Friend",
      component: _Friend["default"]
    }]
  }, {
    path: '/planning',
    name: 'Planning',
    components: {
      "default": _Planning["default"],
      nav: _Header["default"]
    }
  }, {
    path: '/planning_edit',
    name: 'Planning_edit',
    components: {
      "default": _Planning_edit["default"],
      nav: _Header["default"]
    }
  }, {
    path: '/blog',
    name: 'Blog',
    components: {
      "default": _Blog["default"],
      nav: _Header["default"]
    } // children: [
    //   {
    //     path: "blog_text",
    //     name: "Blog_text",
    //     component: Blog_text,
    //   }
    // ],

  }, {
    path: "/blog_edit",
    name: "blog_edit",
    components: {
      "default": _Blog_edit["default"],
      nav: _Header["default"]
    }
  }, {
    path: "/blog_browse",
    name: "blog_browse",
    components: {
      "default": _Browse["default"],
      nav: _Header["default"]
    }
  }, {
    path: '*',
    redirect: '/'
  }]
});

exports["default"] = _default;