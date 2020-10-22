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
            <el-form
                    ref="form"
                    :model="article"
                    label-width="60px"
                    :rules="formRules"
            >
                <el-form-item label="标题" prop="title">
                    <el-input v-model="article.title"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
<!--                    <el-input type="textarea" v-model="article.content"></el-input>-->
                    <el-tiptap
                            v-model="article.content"
                            :extensions="extensions"
                            lang = "zh"
                            height = "400"
                            placeholder = '请输入文章内容'
                    >
                    </el-tiptap>


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
    // import element-tiptap 样式
    import 'element-tiptap/lib/index.css';
    import {
        uploadImage
    } from "@/api/image";
    import {
        ElementTiptap,
        Doc,
        Text,
        Paragraph,
        Heading,
        Bold,
        Underline,
        Italic,
        Image,
        Strike,
        ListItem,
        BulletList,
        OrderedList,
        TodoItem,
        TodoList,
        HorizontalRule,
        Fullscreen,
        Preview,
        CodeBlock
    } from 'element-tiptap';

    export default {
        name:'PublishIndex',
        components: {
            'el-tiptap':ElementTiptap
        },
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
                },
                extensions: [
                    new Doc(),
                    new Text(),
                    new Paragraph(),
                    new Heading({ level: 3 }),
                    new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
                    new Image({
                        // 默认会把图片生成 base64
                        //字符串和内容存储在一起，如果需要自定义图片上传
                        uploadRequest(file){
                            const fd = new FormData()
                            fd.append('image',file)
                            // 第一个 return 是返回Promise 对象
                            // 为什么？ 因为axios 本身就是返回 Promise 对象
                            return uploadImage(fd).then( res =>{
                                // console.log(res)
                                //这个 return 是返回最后的结果
                                return res.data.data.url
                            })
                        }// 图片的上传方法，返回一个 Promise<url>
                    }),
                    new Underline(), // 下划线
                    new Italic(), // 斜体
                    new Strike(), // 删除线
                    new HorizontalRule(), // 华丽的分割线
                    new ListItem(),
                    new BulletList(), // 无序列表
                    new OrderedList(), // 有序列表
                    new TodoItem(),
                    new TodoList(),
                    new Fullscreen(),
                    new Preview(),
                    new CodeBlock()
                ],
                formRules: {
                   title:[
                       { required: true, message: '请输入活动名称', trigger: 'blur' },
                       { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
                   ],
                    content: [
                        {
                            validator(rule, value,callback){
                                if(value === '<p></p>'){
                                    //验证失败
                                    callback(new Error('请输入文章内容'))
                                }else {
                                    //验证通过
                                    callback()
                                }
                            }
                        }
                    ]
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
