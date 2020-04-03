<template>
  <div class="resetpsw">
    <el-form label-width="120px" :model="psw" @keyup.enter.native="submitForm">
      <el-form-item label="原密码">
        <el-input v-model="psw.old" type="password" maxlength="16" :show-password="true" />
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="psw.new" type="password" maxlength="16" :show-password="true" />
      </el-form-item>
      <el-form-item label="确认新密码">
        <el-input v-model="psw.newrepeat" type="password" maxlength="16" :show-password="true" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { changepsw } from '@/api/user'
export default {
  name: 'Resetpsw',
  data() {
    return {
      psw: {
        old: '',
        new: '',
        newrepeat: ''
      }
    }
  },
  methods: {
    submitForm() {
      if (!this.psw.old) {
        this.$message.error({ message: '请输入旧密码' })
        return
      }
      if (this.psw.new.length < 6) {
        this.$message.error({ message: '新密码最小长度为6位' })
        return
      }
      if (!this.psw.newrepeat) {
        this.$message.error({ message: '新密码最小长度为6位' })
        return
      }
      if (this.psw.newrepeat !== this.psw.new) {
        this.$message.error({ message: '两次输入的新密码不一致' })
        return
      }
      changepsw(this.psw).then(async res => {
        if (res.code === 200) {
          this.psw.old = this.psw.new = this.psw.newrepeat = ''
          this.$message.success({ message: '修改成功' })
          await this.$store.dispatch('user/logout')
          this.$router.push('/login')
        } else if (res.code === 300) {
          this.psw.old = this.psw.new = this.psw.newrepeat = ''
          this.$message.error({ message: '旧密码错误' })
        } else {
          this.$message.error({ message: '修改失败' })
        }
      })
    }
  }
}
</script>

<style lang='scss'>
.resetpsw {
  width: 420px;
  margin: 200px auto 0;
  .el-button {
    width: 100%;
  }
}
</style>
