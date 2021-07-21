"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _store = _interopRequireDefault(require("./store"));

var _axios = _interopRequireDefault(require("axios"));

var _vueAxios = _interopRequireDefault(require("vue-axios"));

var _App = _interopRequireDefault(require("./App"));

var _router = _interopRequireDefault(require("./router"));

require("normalize.css/normalize.css");

require("leaflet/dist/leaflet.css");

var _leaflet2 = require("leaflet");

require("leaflet.markercluster/dist/MarkerCluster.Default.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'leaflet.markercluster/dist/MarkerCluster.css';
// import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster';  
// import utils from '@/utils'
// Vue.prototype.$utils = utils;
_vue["default"].use(_vueAxios["default"], _axios["default"]); // Vue.component('v-marker-cluster', Vue2LeafletMarkerCluster);


_vue["default"].config.productionTip = false; //預設marker失效時＋＋

delete _leaflet2.Icon.Default.prototype._getIconUrl;

_leaflet2.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
}); // const store = new Vuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     increment (state) {
//       state.count++
//     }
//   }
// })

/* eslint-disable no-new */


new _vue["default"]({
  el: '#app',
  store: _store["default"],
  router: _router["default"],
  components: {
    App: _App["default"]
  },
  template: '<App/>'
});

_router["default"].beforeEach(function (to, from, next) {
  // const isLogin = Cookies.get('token')==="ImLogin";
  var isLogin = localStorage.getItem('token') == 'ImLogin';

  if (isLogin) {
    next();
  } else {
    if (to.path !== '/login') next('/login');else next();
  }
});