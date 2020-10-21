<template>
    <div
            class="publish-container"
    >
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <!--面包屑路径导航-->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>发布文章</el-breadcrumb-item>
                </el-breadcrumb>
                <!--面包屑路径导航-->
            </div>
<!--            活动名称-->
            <el-form ref="form" :model="article" label-width="40px">
                <el-form-item label="标题">
                    <el-input v-model="article.title"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input type="textarea" v-model="article.content"></el-input>
                </el-form-item>
                <el-form-item label="封面">
                    <el-radio-group v-model="article.cover.type">
                        <el-radio :label="1">单图</el-radio>
                        <el-radio :label="3">三图</el-radio>
                        <el-radio :label="0">无图</el-radio>
                        <el-radio :label="-1">自动</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="频道">
                    <el-select v-model="article.channel_id" placeholder="请选择频道">
                        <el-option
                                v-for="(channel,index) in channels"
                                :label="channel.name"
                                :value="channel.id"
                                :key="index"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
<!--                    button方法本身就有个默认参数，如果不写（false），则他会传自己没用的参数 -->
                    <el-button type="primary" @click="onPublish(false)">发表</el-button>
                    <el-button @click="onPublish(true)">存入草稿</el-button>
                </el-form-item>
            </el-form>
<!--            活动名称-->
        </el-card>
    </div>
</template>

<script>
    import {
        getArticlesChannels,
        addArticle,
        getArticle,
        updateArticle,
    } from "@/api/article";

    export default {
        name:'PublishIndex',
        components: {},
        props: {},
        data() {
            return {
                channels:[], //文章频道列表
                article:{
                    title:'' , //文章标题
                    content:'' , //文章内容
                    cover:{  // 文章标题
                        type:0 , //封面的类型
                        // -1:自动 ， 0-无图， 1-1张 ， 3-3张
                        images:[] //封面图片地址
                    },
                    channel_id:null
                }
            }
        },
        computed: {},
        watch: {},
        created() {
            this.loadChannels()
            //由于我们让发布和修改使用同一个组件
            //所以这里要判断
            //如果路由路径参数中有id，则请求展示文章内容
            if(this.$route.query.id){
                this.loadArticle()
            }
        },
        mounted() {
        },
        methods: {
            //获取文章频道
            loadChannels(){
                getArticlesChannels().then( res => {
                        // console.log(res)
                        this.channels = res.data.data.channels
                    }
                )
            },
            onPublish(draft = false ){
                //如果是修改文章，则执行修改操作，否则执行添加操作
                const  articleId = this.$route.query.id
                if(articleId){
                    //执行修改操作
                    updateArticle(articleId,this.article,draft).then(
                        res => {
                            console.log(res)
                        },
                        this.$message({
                            message:'修改成功',
                            type:'success'
                        })
                    )
                }else{
                    addArticle(this.article , draft).then( res=>{
                        console.log(res)
                        this.$message({
                            message:'发布成功',
                            type:'success'
                        })
                    })
                }

            },
            //修改文章内容：加载文章内容
            loadArticle(){
                getArticle(this.$route.query.id).then( res=>{
                    //模板绑定展示
                    this.article = res.data.data
                })
            }
        }
    }
</script>

<style scoped lang="less">

</style>
