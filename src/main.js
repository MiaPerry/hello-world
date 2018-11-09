import Vue from 'vue'
import App from './App'
import router from './router/index'
import flexible from '@/styles/js/flexible.js'
import mobileReset from '@/styles/css/mobileReset.css'
import * as filters from '@/filters/'
import store from '@/vuex/storeConfig'
import axios from "./axios/axios";
import api from "@/api"
import Vuex from 'vuex'
Vue.use(Vuex);

import { XButton } from 'vux'
Vue.component('x-button', XButton);

import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin);
Vue.use(ToastPlugin, {position: 'top'});

import {AlertPlugin} from 'vux'
Vue.use(AlertPlugin);

import {ConfirmPlugin} from 'vux'
Vue.use(ConfirmPlugin);

import {LoadingPlugin} from 'vux'
Vue.use(LoadingPlugin);

import { Upload,Dialog } from 'element-ui'
Vue.use(Upload);
Vue.use(Dialog);
import 'element-ui/lib/theme-chalk/upload.css';
import 'element-ui/lib/theme-chalk/icon.css';
Vue.prototype.axios = axios;
Vue.prototype.lodding = false;
Vue.prototype.api = api;
var appId="500050615";
Vue.prototype.appId =appId;
Vue.config.productionTip = false;
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
var href = window.location.href;
if (href.indexOf("/paySuccess") >= 0) {
} else {
  localStorage.clear();
}

new Vue({
  el: '#app',
  router,
  store,
  axios,
  components: {App},
  template: '<App/>'
})
