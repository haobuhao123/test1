<template>
  <div class="container">
    <el-card class="my-card">
      <img src="../../assets/images/logo_index.png" alt />
      <!-- 表单 -->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon>
        <!-- 表单项 -->
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号 "></el-input>
        </el-form-item>
        <!-- 表单项 -->
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:286px;margin-right:10px;"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <!-- 表单项 -->
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!-- 表单项 -->
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    // 申明校验函数、
    const checkMobile = (rule, value, callback) => {
      // 检验手机号  1开头 第二位 3--9 ，9位数字
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号格式不对'))
      }
      callback()
    }
    return {
      // 表单对象数据
      loginForm: {
        mobile: '15103462079',
        code: '246810'
      },
      // 表单校验规则数据
      loginRules: {
        mobile: [
          // blur 失去焦点
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur ' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '长度是6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 对整个表单进行校验
      // 加关键字 async
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // // 请求登录接口
          // this.$http
          //   .post(
          //     'http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm
          //   ).then(res => {
          //     // res响应对象 包含响应主体
          //     // console.log(res.data)

          //     // 存储用户信息
          //     store.setUser(res.data.data)

          //     // 成功跳转到首页
          //     this.$router.push('/')
          //   }).catch(() => {
          //     // 错误提示
          //     this.$message.error('手机号或验证码错误')
          //   })

          // async&await使用  怎么处理错误 try{}catch(e){} 捕获异常
          try {
            const { data: { data } } = await this.$http.post('authorizations', this.loginForm) // 记得要传参this.loginForm
            store.setUser(data)
            // 登录成功跳转到首页
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  // 背景图的定位  /  背景图尺寸 ，contain 等比缩放完整在容器内显示  ， cover  等比缩放完全铺满容器
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
}
.my-card {
  width: 450px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -55%);
  img {
    display: block;
    width: 200px;
    margin: 0 auto 30px;
  }
}
</style>
