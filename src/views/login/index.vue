<template>
    <div class="login-container">

        <el-form class="login-form" ref="form" :model="user" >
            <div class="login-head">
            </div>
            <el-form-item >
                <el-input
                        v-model="user.mobile"
                        placeholder="请输入手机号码"
                ></el-input>
            </el-form-item>
            <el-form-item >
                <el-input
                        v-model="user.code"
                        placeholder="请输入验证码"
                ></el-input>
            </el-form-item>
            <el-form-item >
                <el-checkbox v-model="checked">
                    我已阅读并同意用户协议和隐私条款
                </el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button
                        type="primary"
                        @click="onLogin"
                        class="login-btn"
                        :loading = 'loginLoading'
                >登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import request from "@/utils/request";


    export default {
        components: {

        },
        props: {},
        data() {
            return {
                user:{
                    mobile:'', // 手机号
                    code:'' //验证码
                },
                checked:false, //  用户协议
                loginLoading:false, //登录的loading状态

            }
        },
        computed: {},
        watch: {},
        created() {

        },
        mounted() {
        },
        methods: {
            onLogin() {
                //获取表单数据 （根据接口要求绑定数据）
                const  user  =  this.user
                //表单验证

                //验证通过，提交登录

                //开启登陆中loading.....
                this.loginLoading = true

                request({
                    method:'POST',
                    url:'/mp/v1_0/authorizations',
                    data:user  // data 用来设置 POST 请求体
                }).then( res => {
                    this.$message({
                        message: '登录成功',
                        type: 'success'
                    });
                    //关闭loading
                    this.loginLoading = false
                    console.log(res)
                    }
                ).catch( err => {
                    this.$message({
                        message: '登录失败',
                        type: 'error'
                    });
                    this.loginLoading = false
                    console.log('登录失败', err)
                } )


                //处理后端响应结果
                //成功：XXX
                //失败：XXX
            }
        }
    }
</script>

<style scoped lang="less">
    .login-container{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: url("./login_bg.jpg") no-repeat;
        background-size: 100% 100%;
        .login-form{
            background-color: white;
            padding: 50px;
            min-width: 300px;
            .login-head {
                height: 57px;
                width: 300px;
                background: url("./logo_index.png") no-repeat;
                margin-bottom: 30px;
            }
            .login-btn{
                width: 100%;
            }
        }
    }
</style>