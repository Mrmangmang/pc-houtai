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

//获取用户信息
export const getUserProfile = () =>{
    // const  user = window.localStorage.getItem('user')
    // const  user = JSON.parse(window.localStorage.getItem('user'))
    // console.log(user)
    return request ({
        method:'GET',
        url:'/mp/v1_0/user/profile',
        // 后端要求把需要授权的用户身份放到请求头中
        //axios 可以通过 headers 选项设置请求头
        // headers:{
        //     // 属性名和值都得看接口的要求
        //     // 属性名: Authorization,接口要求的
        //     //属性值： Bearer空格token 数据
        //     //Bearer 就是持票人的意思，就好比你的学生证写了学生证三个字
        //     // Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU'
        //     Authorization:`Bearer ${user.token}  `
        // }
    })
}
