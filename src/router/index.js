import Vue from 'vue'
import VueRouter from 'vue-router'
import RouterConfig from './routerConfig'
import {getUrlParam} from '@/util/urlParam'
import axios from "@/axios/axios";
Vue.use(VueRouter);
const router =new VueRouter(RouterConfig);
import store from '@/vuex/storeConfig'

router.beforeEach((to, from, next) => {
  if (to.path.indexOf("/paySuccess") >= 0) {
    next();
  } else {
    if (localStorage.token == null || localStorage.token == "") {
      // if (localStorage.token == null || localStorage.token == "" || localStorage.outtime < Date.parse(new Date()) / 1000) {
      var ticket = getUrlParam('ticket');
      // alert(ticket);
      if (ticket == null || ticket == "") {
        localStorage.clear();
        Vue.$vux.toast.show({
          text: "会话过期，请重新从云之家登录",
          type: "warn"
        })
        return;
      }
      axios.post(process.env.accessToken + "?ticket=" + ticket + "&appId=" + Vue.prototype.appId)
        .then((res) => {
          var time = Date.parse(new Date()) / 1000;
          store.commit('setTocken', res.data.data);
          store.commit('setTockenTime', time + 86400);
          if (to.path == "/") {
            next("/index");
          } else {
            next();
          }
        })
    } else {
      if (to.path == "/") {
        next("/index");
      } else {
        next();
      }
    }
  }

});





export default router;
