<template>
  <div class="login-container">
    <el-form ref="loginForm" status-icon :model="loginForm" :rules="loginRules" class="login-form">

      <div class="title-container">
        <h3 class="title">{{ appName }}</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="用户名" />
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="用户名" name="username" type="text" tabindex="1" autocomplete="on" />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="键盘大写锁定已打开" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="密码" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? '显示密码' : '隐藏密码'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
    </el-form>
    <div class="beian">XICP备XXXXXXXX号-1</div>
  </div>
</template>

<script>
import settings from '@/settings'
export default {
  name: 'PageLogin',
  data() {
    return {
      appName: settings.title,
      loginForm: { // 表单数据
        username: '椒麻鸡',
        password: '123456'
      },
      loginRules: { // 表单校验规则
        username: [{ required: true, trigger: 'change', validator: (rule, value, callback) => value.length > 1 ? callback() : callback(new Error('用户名不能小于2位')) }],
        password: [{ required: true, trigger: 'change', validator: (rule, value, callback) => value.length > 5 ? callback() : callback(new Error('密码不能小于6位')) }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: ''
    }
  },
  mounted() {
    this.$refs.username.focus()
    this.redirect = this.$route.query.redirect
    const whiteList = ['/tools/express-query', '/tools/picture-compression']
    if (whiteList.includes(this.redirect)) {
      this.handleLogin()
    }
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) { // 在每次输入字母 keyup 的时候检测 Caps Lock 大写锁定是否打开并给出相应的提示
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) { // 提示状态按下 Caps Lock 就关闭提示
        this.capsTooltip = false
      }
    },
    showPwd() { // 显示/隐藏密码
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() { // 点击登录
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true // 登录 button 显示 loading
          this.$store.dispatch('user/login', this.loginForm) // 登录
            .then(() => { // 登录成功后 '/'
              this.$router.replace({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
.login-container {
  .beian {
    left: 50%;
    bottom: 12px;
    color: #fff;
    font-size: 12px;
    position: fixed;
    transform: translateX(-50%);
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
