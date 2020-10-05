/*
   用户相关请求模块
 */

import request from "@/utils/request";


//用户登录
export const  login = data =>{
    return  request({
        method:'POST',
        url:'/mp/v1_0/authorizations',
        data // data 用来设置 POST 请求体
    })
}  //es6中 对象的属性名和属性值同名的时候 可以简写