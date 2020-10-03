import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.less' //加载全局样文件

Vue.config.productionTip = false



//创建 vue 根实例
//把router配置到根实例中
//通过render方法把 App根组件渲染到render
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')   //el:'#app' //等价于 $mount('#app')


