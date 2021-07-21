// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store';
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import toast from './components/Toast'
import 'normalize.css/normalize.css'




// import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
// import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster';  

// import utils from '@/utils'

// Vue.prototype.$utils = utils;

Vue.use(VueAxios, axios)
Vue.use(toast)
// Vue.component('v-marker-cluster', Vue2LeafletMarkerCluster);
Vue.config.productionTip = false
//預設marker失效時＋＋
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

// const store = new Vuex.Store({
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
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  // const isLogin = Cookies.get('token')==="ImLogin";
  // console.log(store.state.userID)
  // console.log(localStorage.getItem('token'))
  const isLogin = store.state.userID == localStorage.getItem('token');
  if (isLogin) {
    next();
  } else {
    if (to.path !== '/login')
      next('/login');
    else
      next();
  }
});