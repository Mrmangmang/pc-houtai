<template>
    <div class="login-container">
        <el-form
                class="login-form"
                ref = 'login-form'
                :model="user"
                :rules = "formRules"
        >
<!--
        el-form 表单组件
        每个表单项都必须使用 el-form-item 组件包裹
-->
            <div class="login-head">
            </div>
<!--
        配置Form 表单验证
        1.必须给 el-form 组件绑定 model 为表单数据对象
        2.给需要验证的表单项 el-form-item 绑定 prop 属性
        3.prop 属性需要指定表单对象中的数据名称
        4.通过el-form组件的rules属性配置验证规则
        手动触发表单验证
        1.给el-form 设置ref 起个名字
        2.通过 ref 获el-form组件，调用组件的 validate 进行验证
-->
            <el-form-item  prop="mobile">
                <el-input
                        v-model="user.mobile"
                        placeholder="请输入手机号码"
                ></el-input>
            </el-form-item>
            <el-form-item  prop="code">
                <el-input
                        v-model="user.code"
                        placeholder="请输入验证码"
                ></el-input>
            </el-form-item>
            <el-form-item >
                <el-checkbox v-model="user.agree">
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
    import { login } from  '@/api/user'


    export default {
        name:'LoginIndex',
        components: {

        },
        props: {},
        data() {
            return {
                user:{
                    mobile:'13911111111', // 手机号
                    code:'246810', //验证码
                    agree:false // 是否同意协议
                },
                // checked:false, //  用户协议
                loginLoading:false, //登录的loading状态
                formRules:{  //表单验证规则配置
                    //要验证的数据名称：规则列表[]
                    mobile: [
                        { required: true, message: '手机号不能为空', trigger: 'blur' },
                    ],
                    code:[
                        { required: true, message: '验证码不能为空', trigger: 'blur' },
                    ],
                    agree: [
                        {   //自定义校验规则
                            //验证通过：callback()
                            //验证失败：callback(new Error('错误消息‘））
                            validator:(rule,value,callback) =>{
                                // console.log(rule)
                                if(value) {
                                    callback()
                                } else{
                                    callback(new Error('请同意用户协议'))
                                }
                            },
                            // message: '请同意用户协议',
                            trigger: 'blur'
                        }
                    ]
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
            onLogin() {
                //表单验证
                //validate方法是异步的
                // console.log(this.$refs['login-form'])
                this.$refs['login-form'].validate(valid=>{
                    // console.log(valid)
                    // console.log(err)
                    // 如果表单验证失败，停止请求提交
                    if(!valid){
                        return
                    }
                    this.login() //验证通过，请求登录
                })
            },
            login(){
                //获取表单数据 （根据接口要求绑定数据）
                // const  user  =  this.user
                //开启登陆中loading.....
                this.loginLoading = true
                //对于代码中的请求操作：
                //1.接口请求可能需要重用
                //2.实际工作中，接口非常容易变动，改起来很麻烦
                //3.建议把所有的请求都封装成函数然后同意的组织到模块中进行
                //管理维护更方便，可重用
                login(this.user).then( res => {
                        //登录成功
                        this.$message({
                            message: '登录成功',
                            type: 'success'
                        });
                        //关闭loading
                        this.loginLoading = false
                         //将接口返回的用户相关数据放到本地存储，方便应用数据共享
                         // 本地存储只能存储字符串
                         //如果需要存储对象，数组类型的数据，则把他们转为json格式字符串进行存储
                         // window.localStorage.setItem('user',res.data.data)
                         // console.log(res)
                         window.localStorage.setItem('user',JSON.stringify(res.data.data))
                        // console.log(res)
                        //跳转到首页
                        this.$router.push('/')
                        // this.$router.push({
                        //     name:'home'
                        // }) //更有语义化
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
