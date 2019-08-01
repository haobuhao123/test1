import Vue from 'vue'
import App from './App.vue'

// tip 控制台提示信息，开发环境来提示
Vue.config.productionTip = false

// main.js 的职责：1.导入项目需要依赖的资源（js包，css文件，其他资源）
// 2，创建一个根实列

// 根实列
new Vue({
  render: h => h(App)
}).$mount('#app')
