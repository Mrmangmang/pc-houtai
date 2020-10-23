<template>
    <div class="image-container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
<!--                面包屑导航-->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>素材管理</el-breadcrumb-item>
                </el-breadcrumb>
<!--                面包屑导航-->
            </div>
            <div class="action-head">
            <el-radio-group
                    v-model = "collect"
                    size="mini"
                    @change="onCollectChange"
            >
                <el-radio-button
                        :label="false"
                >全部</el-radio-button>
                <el-radio-button
                        :label="true"
                >收藏</el-radio-button>
            </el-radio-group>
                <el-button
                        size="mini"
                        type="success"
                        @click="dialogUploadVisible = true"
                >
                    上传素材
                </el-button>
            </div>
<!--            素材列表-->
            <el-row :gutter="20">
                <el-col
                        :span="4"
                        :xs = "12"
                        :sm = "6"
                        :md = "6"
                        :lg = "4"
                        v-for="(img,index) in images"
                        :key="index"
                >
                    <el-image
                            style="height: 100px"
                            :src="img.url"
                            fit = "cover"
                            ></el-image>
                </el-col>
            </el-row>
        </el-card>


        <el-dialog
                title="提示"
                :visible.sync="dialogUploadVisible"
                :append-to-body="true"
                >
            <el-upload
                    class="upload-demo"
                    drag
                    action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                    multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-dialog>
    </div>
</template>

<script>
    import {
        getImages
    } from "@/api/image";

    export default {
        name:'ImageIndex',
        components: {},
        props: {},
        data() {
            return {
                collect: false, //默认查询全部素材列表
                // url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                images:[], //图片素材列表
                dialogUploadVisible : false ,
            }
        },
        computed: {},
        watch: {},
        created() {
            this.loadImages( false )
        },
        mounted() {
        },
        methods: {
            loadImages( collect = false ){
                // console.log('123')
                getImages({
                    collect
                    }).then(res => {
                    // console.log(res)
                    this.images = res.data.data.results
                    // console.log(res.data.data.results)
                })
            },
            onCollectChange(value){
                // console.log(value)
                this.loadImages(value)
            }
        }
    }
</script>

<style scoped lang="less">
   .action-head{
       padding-bottom: 20px;
       display: flex;
       justify-content: space-between;
   }
</style>
