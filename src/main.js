// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import promise from 'es6-promise'
promise.polyfill()
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import $ from 'jquery'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import JSEncrypt from 'jsencrypt';
import * as echarts from 'echarts';
// import VueQuillEditor from 'vue-quill-editor'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

import waterfall from 'vue-waterfall2'
Vue.use(waterfall)

Vue.prototype.$echarts = echarts
Vue.use(ElementUI);
// Vue.use(VueQuillEditor);
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.config.productionTip = false

Vue.prototype.$getRsaCode = function(str, key){ // 注册方法
  let encryptStr = new JSEncrypt();
  encryptStr.setPublicKey(key); // 设置 加密公钥
  let data = encryptStr.encrypt(str);  // 进行加密
  return data;
}

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// router.beforeEach((to,from,next)=>{
//   let isLogin = localStorage.getItem('userToken')
//   if (isLogin) {
//     next()
//   } else {
//     if(to.path == '/login') {
//       next()
//     } else {
//       next({
//         path: '/login'
//       })
//     }
//   }
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  $,
  router,
  store,
  components: { App },
  template: '<App/>'
})
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});