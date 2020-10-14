<template>
    <el-container class="layout-container">
        <el-aside
                class="aside"
                width="auto"
        >
            <app-aside
                    :is-collapse="isCollapse"
                    class="aside-menu"
            />
        </el-aside>
        <el-container>
            <el-header class="header">
                <div>
<!--
    css样式处理

    {
       css类名：布尔值
    }
    true ：作用类名
    false：不作用类名
    -->
                    <i
                            :class="{
                            'el-icon-s-fold' : isCollapse,
                            'el-icon-s-unfold' : !isCollapse
                    }"
                            @click="isCollapse  = !isCollapse"
                    ></i>
                    <span>有限公司</span>
                </div>
                <el-dropdown>
                    <div>
                        <span>用户昵称</span>
                    </div>
<!--                    <span class="el-dropdown-link">-->
<!--                    下拉菜单<i class="el-icon-ararow-down el-icon&#45;&#45;right"></i>-->
<!--                    </span>-->
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>设置</el-dropdown-item>
                        <el-dropdown-item
                                @click.native="onLogout"
                        >退出
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

            </el-header>
            <el-main class="main">
<!--                子路由出口-->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    import AppAside from './components/aside'

    export default {
        name:'LayoutIndex',
        components: {
            AppAside
        },
        props: {},
        data() {
            return {
                user:{

                },
                isCollapse:false //侧边状态栏的展示状态
            }
        },
        computed: {},
        watch: {},
        created() {
            //组件初始化号，请求获取用户资料
            // this.loadUserPorfile()
        },
        mounted() {
        },
        methods: {
            onLogout(){
                this.$confirm('确认退出吗？', '退出提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //把用户的登录状态清除
                    window.localStorage.removeItem('user')
                    //跳转到登录页面
                    this.$router.push('/login')
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .layout-container{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
    }
    .aside{
        background-color: #666666;
        .aside-menu{
            height: 100%;
        }
    }
    .header{
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #72767b;


    }
    .main{
        background-color: #909399;
    }

</style>
