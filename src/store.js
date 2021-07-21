import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/* 外面呼叫
<input
      type="text"
      v-model="userName"
      placeholder="what's your name?"
      @keydown.enter="$store.dispatch('updateName', userName)"/> */
const store = new Vuex.Store({
  state: {
    userID: localStorage.getItem('token'),
    showToast: false,
    toastInfo: {
      type: 'normal',
      message: ''
    },
    header: false,
    isLoading: false,
    times: 0,
    name: "Eudora",
  },
  actions: {
    setToast({ dispatch, commit }, payload) {
      commit('updateToast', true);
      commit('updateToastInfo', payload);
      setTimeout(() => { dispatch('delToast'); }, payload.time);
    },
    delToast({ commit }) {
      commit('updateToast', false);
    }
  },
  getters: {
    nameLength: (state) => {
      return state.name.length;
    },
    showToast: state => state.showToast,
    toastInfo: state => state.toastInfo

  },
  mutations: {
    updateToast(state, params) {
      state.showToast = params;
    },
    updateToastInfo(state, params) {
      state.toastInfo = { ...params };
    },


    // 將state設定為參數
    needHeader(state) {
      state.header = true;
    },
    removeHeader(state) {
      state.header = false;
    },
    Loaded(state) {
      state.isLoading = !state.isLoading;
    },
    addTimes(state) {
      state.times += 1;
    },
    //   NAME(state, status) {
    //     state.name = status;
    //   }
  },


})
export default store;