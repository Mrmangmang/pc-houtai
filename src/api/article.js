/*
   文章相关请求模块
 */

import request from "../utils/request";

/*
   获取文章列表
 */
export const getArticles = params =>{
    return request ({
        method:'GET',
        url:'/mp/v1_0/articles',
        //Body 参数使用data 设置
        //Query 参数使用params 设置
        //Headers 参数使用headers 设置
        params
    })
}
/*
   获取文章频道
 */
export const getArticlesChannels = () =>{
    return request ({
        method:'GET',
        url:'/mp/v1_0/channels',
    })
}
/*
  删除文档
 */
export const deleteArticlesChannels = () =>{
    return request ({
        method:'DELETE',
        url:'/mp/v1_0/articles/:target',
    })
}
