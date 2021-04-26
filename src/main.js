import Vue from 'vue'
import App from './App.vue'
import components from '@components/'
import '@assets/css/base.less'
Vue.use(components)
Vue.config.productionTip = false
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
new Vue({
  render: h => h(App),
}).$mount('#app')
