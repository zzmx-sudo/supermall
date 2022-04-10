import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from "components/common/toast"

Vue.config.productionTip = false

// 事件总线: prototype方法动态给Vue添加$bus属性
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
