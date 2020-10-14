<template>
    <div class="article-container">
        <el-card class="filter-card">
            <div slot="header" class="clearfix">
                <!--        面包屑导航-->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item to="/">首页
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>内容管理</el-breadcrumb-item>
                </el-breadcrumb>
                <!--        面包屑导航-->
            </div>
            <!--        数据筛选菜单-->
            <el-form ref="form" :model="form" label-width="40px">
                <el-form-item label="状态">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="全部"></el-radio>
                        <el-radio label="草稿"></el-radio>
                        <el-radio label="待审核"></el-radio>
                        <el-radio label="审核通过"></el-radio>
                        <el-radio label="审核失败"></el-radio>
                        <el-radio label="已删除"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="频道">
                    <el-select v-model="form.region" placeholder="请选择频道">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <!--        数据筛选菜单-->
        </el-card>



        <el-card class="box-card">
            <div slot="header" class="clearfix">
                根据条件共查询了1213结果
            </div>
<!--            数据列表-->
            <el-table
                    :data="articles"
                    style="width: 100%"
                    stripe
                    class="list-table"
            >
                <el-table-column
                        label="封面"
                        >
                    <template
                            v-slot = 'scope'
                    >
<!--scope.row 当前行对象-->
<!--                        {{scope.row}}-->
                        <img
                                v-if = "scope.row.cover.images[0]"
                                class="article-cover"
                                :src="scope.row.cover.images[0]"
                        />
                        <img v-else
                             class="article-cover"
                             src="./test.jpg"
                        >
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
                        prop="address"
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
                                ></el-button>
                    </template>
                </el-table-column>
            </el-table>
<!--数据列表-->
            <!--        列表分页-->
            <el-pagination
                    layout="prev, pager, next"
                    :total="1000"
                    background
            >
            </el-pagination>
            <!--        列表分页-->
        </el-card>




    </div>
</template>

<script>
    import {getArticles} from "@/api/article";


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
                ]
            }
        },
        computed: {},
        watch: {},
        created() {
            this.loadArticles()
        },
        mounted() {
        },
        methods: {
            loadArticles(){
              getArticles().then( res =>{
                  this.articles = res.data.data.results
                  // console.log(this.articles)
                }
              )
            },
            onSubmit() {
                console.log('submit!');
            },
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
        width: 100px;
        background-size: cover;
    }
</style>
