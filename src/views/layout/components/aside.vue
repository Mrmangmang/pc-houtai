<template>
    <div>
        <el-menu
                default-active="/"
                background-color="#002033"
                text-color="#fff"
                active-text-color="#ffd04b"
                router
                class = 'nav-menu'
                :collapse = "isCollapse"
        >
            <el-menu-item index = '/'>
                <i class="toutiao toutiao-shouye"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item  index="/article">
                <i class="toutiao toutiao-gengduo"></i>
                <span slot="title">内容管理</span>
            </el-menu-item>
            <el-menu-item index="/image" >
                <i class="el-icon-document"></i>
                <span slot="title">素材管理</span>
            </el-menu-item>
            <el-menu-item index="/publish">
                <i class="toutiao toutiao-fenxiang"></i>
                <span slot="title">发布文章</span>
            </el-menu-item>
            <el-menu-item index="/comment">
                <i class="toutiao toutiao-pinglun"></i>
                <span slot="title">评论管理</span>
            </el-menu-item>
            <el-menu-item index="/fans">
                <i class="toutiao toutiao-yanzhengma"></i>
                <span slot="title">粉丝管理</span>
            </el-menu-item>
            <el-menu-item index="/settings">
                <i class="toutiao toutiao-wode"></i>
                <span slot="title">个人设置</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name:'AppAside',
        components: {

        },
        props:[
          'is-collapse'
        ],
        data() {
            return {

            }
        },
        computed: {},
        watch: {},
        created() {
        },
        mounted() {
        },
        methods: {

        }
    }
</script>

<style scoped lang="less">
    .nav-menu{
        height: 100%;
        .iconfont{
        }
    }
</style>