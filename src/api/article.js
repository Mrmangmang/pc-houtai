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
  删除文章
 */
export const deleteArticle = (articleId) =>{
    return request ({
        //接口文档中写的路径需要参数的 需要在url中传递
        //凡是看见接口路径中有的 ： *** ： 格式的字段，则需要传递路径参数
        method:'DELETE',
        url:`/mp/v1_0/articles/${articleId}`,
    })
}
/*
  新建文章
 */
//参数前后无所谓，但是如果有多个参数，一般都是有默认值的放在后面
export const addArticle = (data,draft = false) =>{
    return request ({
        //接口文档中写的路径需要参数的 需要在url中传递
        //凡是看见接口路径中有的 ： *** ： 格式的字段，则需要传递路径参数
        method:'POST',
        url:'/mp/v1_0/articles',
        params:{
            draft //是否保存为草稿
        },
        data
    })
}
// addArticle(123)

/*
   编辑文章
*/
export const updateArticle = (articleId , data, draft = false ) =>{
    return request ({
        //接口文档中写的路径需要参数的 需要在url中传递
        //凡是看见接口路径中有的 ： *** ： 格式的字段，则需要传递路径参数
        method:'PUT',
        url:`/mp/v1_0/articles/${articleId}`,   // es6字符串拼接
        params:{
            draft //是否保存为草稿
        },
        data
    })
}
/*/
   获取指定文章
 */
export const getArticle = articleId =>{
    return request ({
        //接口文档中写的路径需要参数的 需要在url中传递
        //凡是看见接口路径中有的 ： *** ： 格式的字段，则需要传递路径参数
        method:'GET',
        url:`/mp/v1_0/articles/${articleId}`,
    })
}
