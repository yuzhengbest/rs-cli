import Vue from 'vue';
import router from './router';
import store from '@/store';
import ElementUI from 'element-ui';


import App from './App.vue';


// 全局引入
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  el: '#container',
  router,
  store,
  render: h => h(App),
});
