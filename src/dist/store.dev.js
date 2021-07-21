"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);
/* 外面呼叫
<input
      type="text"
      v-model="userName"
      placeholder="what's your name?"
      @keydown.enter="$store.dispatch('updateName', userName)"/> */


var store = new _vuex["default"].Store({
  state: {
    userID: '',
    header: false,
    isLoading: false,
    times: 0,
    name: "Eudora"
  },
  mutations: {
    // 將state設定為參數
    needHeader: function needHeader(state) {
      state.header = true;
    },
    removeHeader: function removeHeader(state) {
      state.header = false;
    },
    Loaded: function Loaded(state) {
      state.isLoading = !state.isLoading;
    },
    addTimes: function addTimes(state) {
      state.times += 1;
    } //   NAME(state, status) {
    //     state.name = status;
    //   }

  },
  getters: {
    nameLength: function nameLength(state) {
      return state.name.length;
    }
  }
});
var _default = store;
exports["default"] = _default;