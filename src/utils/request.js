/*
  基于axios封装的请求模块
 */
import axios from 'axios'

//创建一个axios实例，说白了就是复制一个axios
//我们通过这个实例去发请求，把需要配置配置给这个实例
const request = axios.create({
    baseURL:'http://ttapi.research.itcast.cn/' //请求的基本路径
})





export default request //导出请求方法


//谁要使用谁就加载 request 模块
// import request from  'request.js'
// request.xxx
// request({
//     methods:"",
//     url:''
// })