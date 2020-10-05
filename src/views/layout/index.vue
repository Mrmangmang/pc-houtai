<template>
    <el-container class="layout-container">
        <el-aside
                class="aside"
                width="200px"
        >
            <app-aside  class="aside-menu"/>
        </el-aside>
        <el-container>
            <el-header class="header">Header</el-header>
            <el-main class="main">
<!--                子路由出口-->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>

<!--    <div class="layout-container">-->

<!--        <div>顶部导航栏</div>-->
<!--        <div>侧边导航栏</div>-->
<!--&lt;!&ndash;        子路由出口&ndash;&gt;-->
<!--        <router-view></router-view>-->

<!--    </div>-->
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
            return {}
        },
        computed: {},
        watch: {},
        created() {
        },
        mounted() {
        },
        methods: {}
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
        background-color: #72767b;
    }
    .main{
        background-color: #909399;
    }

</style>