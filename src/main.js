import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import  axios from './http'//1.

Vue.config.productionTip = false

Vue.prototype.axios=axios//2.两行代码必须要
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
