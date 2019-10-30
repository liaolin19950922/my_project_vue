<template>
  <el-form
    ref="AccountFrom"
    :model="account"
    :rules="rules"
    lable-position="left"
    lable-width="0px"
    class="demo-ruleForm login-page"
  >
    <h3 class="title">登录系统首页</h3>

    <el-form-item prop="username">
      <el-input type="text" v-model="account.username" auto-complete="off" placeholder="账号">
        <template slot="prepend"><span class="fa fa-user fa-lg" style="width: 13px"></span></template>
      </el-input>
    </el-form-item>

    <el-form-item prop="pwd">
      <el-input :type="pwdType" v-model="account.pwd" auto-complete="off" placeholder="密码">
        <template slot="prepend"><span class="fa fa-lock fa-lg" style="width: 13px"></span></template>
        <template slot="suffix"><span class="password-eye" @click="showPassword" :class="eyeType"></span></template>
      </el-input>
    </el-form-item>
    <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button
        type="primary"
        style="width:100%;"
        @click.native.prevent="handleLogin"
        :loading="logining"
      >登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// 引入api.js  好调用里面的接口
// import { requestLogin } from '../api/api'

export default {
  name: 'login',
  data () {
    return {
      logining: false,
      account: {
        username: '',
        pwd: ''
      },
      pwdType: 'password',
      eyeType: 'fa fa-eye-slash fa-lg',
      checked: true,
      rules: {
        username: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }
        ],
        pwd: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleLogin () {
      this.$refs.AccountFrom.validate(valid => {
        if (valid) {
          // 验证通过 可以提交
          this.logining = true
          // 将提交的数据进行封装
          // var loginParams = {
          //   userName: this.account.username,
          //   pwd: this.account.pwd
          // }
          if (this.account.username === 'admin' && this.account.pwd === '123456') {
            sessionStorage.setItem('access-token', 'admin')
            if (this.checked) {
              this.setCookie(this.account.username, this.account.pwd, 7)
            } else {
              this.deleteCookie()
            }
            this.$router.push({ path: '/' })
          } else {
            this.$message({
              message: '账号或密码错误，请重试',
              type: 'error'
            })
          }
          // 调用函数  传递参数 获取结果
          // requestLogin(loginParams).then(data => {
          //   this.logining = false

          //   if (data.code === 200) {
          //     // 登录成功
          //     sessionStorage.setItem('access-token', data.token)
          //     // 用vue路由跳转到后台主界面
          //     this.$router.push({ path: '/home' })
          //   } else {
          //     this.$message({
          //       message: data.msg,
          //       type: 'error'
          //     })
          //   }
          // })
        } else {
          console.log('error submit')
          return false
        }
      })
    },
    showPassword () {
      if (this.pwdType === 'password') {
        this.pwdType = ''
        this.eyeType = 'fa fa-eye fa-lg'
      } else {
        this.pwdType = 'password'
        this.eyeType = 'fa fa-eye-slash fa-lg'
      }
    },
    setCookie (name, pass, days) {
      let expire = new Date()
      expire.setDate(expire.getDate() + days)
      document.cookie = `C-username=${name};expires=${expire}`
      document.cookie = `C-password=${pass};expires=${expire}`
    },
    getCookie () {
      if (document.cookie.length) {
        let arr = document.cookie.split('; ')
        console.log(arr)
        for (let i = 0; i < arr.length; i++) {
          let arr2 = arr[i].split('=')
          if (arr2[0] === 'C-username') {
            this.account.username = arr2[1]
          } else if (arr2[0] === 'C-password') {
            this.account.pwd = arr2[1]
            this.checked = true
          }
        }
      }
    },
    // 修改为空，天数为-1
    deleteCookie () {
      this.setCookie('', '', -1)
    }
  },
  mounted () {
    this.getCookie()
  }
}
</script>

<style>
body {
  background: #dfe9fb;
}
.login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
}
</style>
