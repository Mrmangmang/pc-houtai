/*
  基于axios封装的请求模块
 */
import axios from 'axios'

//创建一个axios实例，说白了就是复制一个axios
//我们通过这个实例去发请求，把需要配置配置给这个实例
const request = axios.create({
    baseURL:'http://ttapi.research.itcast.cn/' //请求的基本路径
})

//请求拦截器
request.interceptors.request.use(
    //任何所有请求都会经过这里
    //config 是当前请求相关的配置对象信息
    // config 可以更改
    function (config){
        const  user = JSON.parse(window.localStorage.getItem('user'))
        //如果有登录用户信息，则统一设置 token
        if(user){
            config.headers.Authorization = `Bearer ${user.token}`
        }
        return config
        // 报401 （token未传过来或者过期）
})




export default request //导出请求方法


//谁要使用谁就加载 request 模块
// import request from  'request.js'
// request.xxx
// request({
//     methods:"",
//     url:''
// })
