import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router/router'
import http from './http.js'
import './assets/icon-font/iconfont.css'
import GetFormatDate from './date'

//  导入excel插件
import XLSX from 'xlsx'
Vue.prototype.XLSX = XLSX

import dayjs from 'dayjs'
Vue.prototype.dayjs = dayjs;
// 导入echarts插件
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

Vue.prototype.$http = http
Vue.prototype.$getFormatDate = GetFormatDate

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
