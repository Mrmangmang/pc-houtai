import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.less' //加载全局样文件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import JSONbig from 'json-bigint'

// import { ElementTiptapPlugin } from 'element-tiptap';
// 现在你已经在全局注册了 `el-tiptap` 组件。

// const  str  = '{"id" : 12324523456246543 }'

// console.log(JSON.parse(str))
// 他会把超出 JS 安全整数范围的数字转为一种类型的BigNumber
// 我们在使用的时候需要把这个BigNumber.toString()就能得到原来的
// console.log(JSONbig.parse(str))
// console.log(JSONbig.parse(str).id.toString())





Vue.config.productionTip = false

//全局使用 element 组件库
Vue.use(ElementUI)

// Vue.use(ElementTiptapPlugin, {
//   lang: 'zh',
// });


//创建 vue 根实例
//把router配置到根实例中
//通过render方法把 App根组件渲染到render
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')   //el:'#app' //等价于 $mount('#app')


