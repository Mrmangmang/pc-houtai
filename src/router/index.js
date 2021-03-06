import Vue from 'vue'
import VueRouter from 'vue-router'



import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'
import Article from '@/views/article'
import Publish from  '@/views/publish'
import Image from  '@/views/image'


Vue.use(VueRouter)

//路由配置表
const routes = [
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path: '/',
    //命名路由layout 有一个默认子路由，这个名字没有意义，即便跟着跳转，却还是home
    //如果有默认子路由，就不要给父路由起名字
    // name: 'layout',
    component: Layout,
    children:[
      {
        //我们通常会把根路径 / 设置为网站首页
        // 因为我们在手动输入网址访问网站的时候 ， 可以省略 /
        //如果你是别的名称 ， 则必须加上
        path:'', //path 为空 ， 会作为默认子路由渲染
        name:'home', // 此处写了name，则会跳这个name
        component:Home
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      },
      {
        path: '/publish',
        name: 'publish',
        component: Publish
      },
      {
        path: '/image',
        name: 'image',
        component: Image
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

//路由导航守卫： 说白了所有页面的导航都会经过这里
//守卫页面的导航的
//to ： 要去的路由信息
//from ： 来自哪里的路由信息
//next ：放行方法
router.beforeEach((to,from,next) =>{
  //如果要访问的不是/login，校验登录状态
  //如果没有登录，则跳转到登录页面
  //如果登录了，则允许通过
  //允许通过
  //next()
  const  user = JSON.parse(window.localStorage.getItem('user'))
  //校验非登录页面的登录状态
  if(to.path !== '/login'){
    if(user){
      //已登录，允许通过
      next()
    }else{
      //没有登录，跳转到登录页面
      next('/login')
    }
  }else{
    //登录页面，正常允许通过
  next()
  }
})



export default router
