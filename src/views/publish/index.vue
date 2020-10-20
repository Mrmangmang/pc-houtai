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
            <el-form ref="form" :model="form" label-width="40px">
                <el-form-item label="标题">
                    <el-input v-model="article.title"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input type="textarea" v-model="article.content"></el-input>
                </el-form-item>
                <el-form-item label="封面">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="单图"></el-radio>
                        <el-radio label="三图"></el-radio>
                        <el-radio label="无图"></el-radio>
                        <el-radio label="自动"></el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="频道">
                    <el-select v-model="form.region" placeholder="请选择频道">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">发表</el-button>
                    <el-button>存入草稿</el-button>
                </el-form-item>
            </el-form>
<!--            活动名称-->
        </el-card>
    </div>
</template>

<script>
    import {  getArticlesChannels } from "@/api/article";

    export default {
        name:'PublishIndex',
        components: {},
        props: {},
        data() {
            return {
                form:{
                    name:'',
                    desc:'',
                    region:'',
                    resource:'',
                },
                article:{
                    title:'' , //文章标题
                    content:'' , //文章内容
                    cover:{  // 文章标题
                        type:0 , //封面的类型
                        // -1:自动 ， 0-无图， 1-1张 ， 3-3张
                        images:[] //封面图片地址
                    }
                }
            }
        },
        computed: {},
        watch: {},
        created() {
        },
        mounted() {
        },
        methods: {
            onSubmit(){
                console.log('123')
            }
        }
    }
</script>

<style scoped lang="less">

</style>
