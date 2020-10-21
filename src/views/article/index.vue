<template>
    <div class="article-container">
        <el-card class="filter-card">
            <div slot="header" class="clearfix">
                <!--        面包屑导航-->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item to="/">首页
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>发布文章</el-breadcrumb-item>
                </el-breadcrumb>
                <!--        面包屑导航-->
            </div>
            <!--        数据筛选菜单-->
            <el-form
                    ref="form"
                    :model="form"
                    label-width="40px"
                    v-loading = 'loading'
            >
                <el-form-item label="状态">
                    <el-radio-group v-model="status">
                        <el-radio :label="null">全部</el-radio>
                        <el-radio :label="0">草稿</el-radio>
                        <el-radio :label="1">待审核</el-radio>
                        <el-radio :label="2">审核通过</el-radio>
                        <el-radio :label="3">审核失败</el-radio>
                        <el-radio :label="4">已删除</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="频道">
                    <el-select v-model="channelId" placeholder="请选择频道">
                        <el-option
                                label="全部"
                                :value="null"
                        >
                        </el-option>
                        <el-option
                                v-for="(channel,index) in channels"
                                :label="channel.name"
                                :value="channel.id"
                                :key="index"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间">
                        <el-date-picker
                                type="datetimerange"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                style="width: 100%;"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                :default-time="['12:00:00']"
                                v-model="rangeDate"
                        ></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <!--        数据筛选菜单-->
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                根据条件共查询了{{total_count}}结果
            </div>
<!--            数据列表-->
            <el-table
                    :data="articles"
                    style="width: 100%"
                    stripe
                    class="list-table"
                    v-loading="loading"
            >
                <el-table-column
                        label="封面"
                        >
                    <template
                            v-slot = 'scope'
                    >
<!--scope.row 当前行对象-->
<!--                        {{scope.row}}-->
<!--                        <img-->
<!--                                v-if = "scope.row.cover.images[0]"-->
<!--                                class="article-cover"-->
<!--                                :src="scope.row.cover.images[0]"-->
<!--                        />-->
<!--                        <img v-else-->
<!--                             class="article-cover"-->
<!--                             src="./test.jpg"-->
<!--                        >-->
                        <el-image

                                style="width: 100px;height: 100px"
                                :src="scope.row.cover.images[0]"
                                fit="cover"
                        >
                            <div slot="placeholder" class="image-slot">
                                加载中 <span class="dot"></span>
                            </div>
                        </el-image>


<!--                        下面这种情况是在运行期间动态改变处理的，-->
<!--                        而本地图片必须在打包的时候就存在-->
<!--                        打包的时候无法判定这个下面那个条件-->
<!--                        引用的资源必须经过打包处理-->
<!--                        所以才能动态的渲染出来-->
<!--                        要不然就访问不到-->

                    </template>
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="标题"
                       >
                </el-table-column>
                <el-table-column
                        label="状态"
                >
<!--                    如果需要在自定义列模板中获取当前遍历项数据，那么就要在template上声明-->
<!--                    通过scope.row才能便可以遍历所有数据，-->
                    <template v-slot = 'scope'>
                        <el-tag
                                :type="articleStatus[scope.row.status].type"
                        >
                                {{articleStatus[scope.row.status].text}}
                        </el-tag>
<!--                        <el-tag v-if="scope.row.status === 0">-->
<!--                            草稿-->
<!--                        </el-tag>-->
<!--                        <el-tag v-else-if="scope.row.status === 1">-->
<!--                            待审核-->
<!--                        </el-tag>-->
<!--                        <el-tag v-else-if="scope.row.status === 2">-->
<!--                            审核通过-->
<!--                        </el-tag>-->
<!--                        <el-tag v-else-if="scope.row.status === 3">-->
<!--                            审核失败-->
<!--                        </el-tag>-->
<!--                        <el-tag v-else-if="scope.row.status === 4">-->
<!--                            已删除-->
<!--                        </el-tag>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="pubdate"
                        label="发布时间">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template v-slot="scope">
                        <el-button
                                size="mini"
                                circle
                                type="primary"
                                icon="el-icon-edit"
                                ></el-button>
                        <el-button
                                size="mini"
                                circle
                                type="danger"
                                icon="el-icon-delete"
                                @click="onDeleteArticle(scope.row.id)"
                                ></el-button>
                    </template>
                </el-table-column>
            </el-table>
<!--数据列表-->
            <!--        列表分页-->
            <el-pagination
                    layout="prev, pager, next"
                    :total="total_count"
                    background
                    @current-change = "handleCurrentChange"
                    :page-size="pageSize"
                    :disabled="loading"
                    :current-page.sync="page"
            >
            </el-pagination>
            <!--        列表分页-->
        </el-card>
    </div>
</template>

<script>
    import {
        getArticles ,
        getArticlesChannels,
        deleteArticle
    } from "@/api/article";


    export default {
        name:'ArticleIndex',
        components: {},
        props: {},
        data() {
            return {
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                articles:[],//文章数据列表
                articleStatus:[
                    { status : 0, text:"草稿" ,type: 'info' }, //0
                    { status : 1, text:"待审核" ,type: '' }, //1
                    { status : 2, text:"审核通过" ,type: 'success' }, //2
                    { status : 3, text:"审核失败" ,type: 'warning' }, //3
                    { status : 4, text:"已删除" ,type: 'danger' }, //4
                ],
                total_count:0 ,// 总数据条数
                pageSize : 10, //每页大小
                channels:[], //文章频道列表
                status:null, // 文章频道状态
                channelId:null, // 频道id，不传为全部
                rangeDate:'' ,//筛选的范围日期
                loading:false, //表单数据加载中loading
                page:1,

            }
        },
        computed: {},
        watch: {},
        created() {
            this.loadArticles()
            this.loadChannels()
        },
        mounted() {
        },
        methods: {
            //获取当前页 ,点击之后触发，
            handleCurrentChange(page){
                // console.log(page)
                this.loadArticles(page)
            },

            //发送请求 （获取文章列表）
            loadArticles( page = 1  ){
                //loading开始
                this.loading = true
              getArticles(
                  {
                      page,
                      per_page:this.pageSize,
                      status:this.status,
                      channel_id:this.channelId,
                      begin_pubdate:this.rangeDate ?   this.rangeDate[0] : null, //开始日期
                      end_pubdate: this.rangeDate ?  this.rangeDate[1] :null //截止时间
                  }
              ).then( res =>{
                  // console.log(res)
                  // this.articles = res.data.data.results
                  // this.total_count = res.data.data.total_count
                  // console.log(res.data.data)
                  const { results, total_count:totalCount } = res.data.data
                  this.articles = results
                  this.total_count = totalCount
                  //关闭加载中loading
                  this.loading = false
                }
              )
            },

            onSubmit() {
                this.loadArticles()
            },

            loadChannels(){
                getArticlesChannels().then( res => {
                     // console.log(res)
                     this.channels = res.data.data.channels
                    }
                )
            },
            onDeleteArticle(articleId){
                // console.log(articleId)
                // console.log(articleId.toString())
                this.$confirm('确认删除吗？', '退出提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // console.log(123)
                    //确定执行这里
                    deleteArticle(articleId.toString()).then( res =>{
                        //删除成功，更新当前页文章数据列表
                        // console.log(res)
                        this.loadArticles(this.page) // current-page实现当前页
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                //找到数据接口
                //封装请求方法
                //删除请求调用
                //处理响应结果
            }
        }
    }
</script>

<style scoped lang="less">
   .filter-card{
       margin-bottom: 30px;
   }
    .list-table{
        margin-bottom: 30px;
    }
    .article-cover{
        width: 60px;
        background-size: cover;
    }
</style>
