/*
  基于axios封装的请求模块
 */
import axios from 'axios'
import JSONbig from 'json-bigint'

//创建一个axios实例，说白了就是复制一个axios
//我们通过这个实例去发请求，把需要配置配置给这个实例
const request = axios.create({
    baseURL:'http://ttapi.research.itcast.cn/' ,//请求的基本路径
    //定义后端返回的原始数据处理
    //参数data就是后端返回的原始数据（未经处理的JSON格式）
    transformResponse: [ (data) => {
        // Do whatever you want to transform the data
        // console.log(data)
        //后端返回的数据可能不是JSON格式字符串
        //如果不是的话，那么JSONbig.parse调用就会报错
        //所以我们使用try catch 来捕获异常，处理异常的发生
        try {
            //如果转换成功，则直接把结果返回
            return JSONbig.parse(data)
            // 他会把超出 JS 安全整数范围的数字转为一种类型的BigNumber
            // 我们在使用的时候需要把这个BigNumber.toString()就能得到原来的
        } catch(err){
            //如果转换失败了，则进入这里
            //我们在这里把数据原封不动得直接返回给请求使用
            return  data
        }
        // return JSON.parse(data)
        // return data;
    }],
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
