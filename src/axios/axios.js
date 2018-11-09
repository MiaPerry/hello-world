import axios from "axios";
import store from '@/vuex/storeConfig'
import router from '../router'
import Vue from "vue"

axios.defaults.timeout = 60000;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;
axios.defaults.changeOrigin = true;
axios.defaults.baseURL = process.env.WD_URL;
axios.defaults.access = true;
axios.defaults.lodding = false;
let needLoadingRequestCount = 0;
axios.interceptors.request.use(function (config) {
  if (localStorage.token && localStorage.token !== 'undefined') {
    config.headers.Authorization = "Barner " + localStorage.token;
  }

  config.headers.appId = Vue.prototype.appId;
  config.headers.version = process.env.WD_VERSSION;
  return config;
}, function (error) {
  return Promise.reject(error)
});
axios.interceptors.response.use(function (res) {
  Vue.$vux.loading.hide();
  if(res.data.code == 10000){
    router.push('/error/10000');
    return Promise.reject(res);
  }
  if (res.data.code != 0) {
    Vue.$vux.toast.show({
      text: res.data.msg + "!",
      type: "warn"
    });
    return Promise.reject(res);
  }

  return res;
}, function (error) {
  Vue.$vux.loading.hide();
  if (error.response.status == 411) {
    store.commit('setTocken', "");
    store.commit('setTockenTime', "");
    window.location.reload();
  } else {
    Vue.$vux.toast.show({
      text: error.response.data.msg || error.response.data.message,
      type: "warn"
    })
  }

  // if(error.response==411){
  //   axios.post(process.env.accessToken + "?ticket=" + ticket + "&appId=500044617")
  //     .then((res) => {
  //       var time = Date.parse(new Date()) / 1000;
  //       store.commit('setTocken', res.data.data);
  //       store.commit('setTockenTime', time + 7200);
  //       router.push('/');
  //     })
  // }else{
  //
  // }
  if (error.response) {
    switch (error.response.status) {
      case 401:
        router.push('/error/401');
        break;
      case 400:
        // router.push('/error/400')
        break;
      case 404:
        router.push('/error/404')
        // router.push('/error/404')
        break;
      default:
        // router.push('/error/500')
        break;
    }
  }
  // }
  return Promise.reject(error);
});
export default axios;
