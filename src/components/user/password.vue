<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人管理</el-breadcrumb-item>
      <el-breadcrumb-item>密码</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-form
        :model="PasswordForm"
        :rules="PasswordFormRules"
        ref="PasswordFormRef"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="PasswordForm.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="PasswordForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="再次输入新密码" prop="rePassword">
          <el-input v-model="PasswordForm.rePassword"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="changePassword('PasswordFormRef')">确认修改</el-button>
          <el-button @click="resetForm('PasswordFormRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    // 再次输入密码验证规则对象
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.PasswordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 更改密码的数据对象
      PasswordForm: {
        // 旧密码
        oldPassword: '',
        // 新密码
        newPassword: '',
        // 再次输入密码
        rePassword: ''
      },
      // 验证规则
      PasswordFormRules: {
        newPassword: [
          { required: true, message: '请输入新密码!', trigger: 'blur' }
        ],
        oldPassword: [
          { required: true, message: '请输入旧密码!', trigger: 'blur' }
        ],
        rePassword: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 重置按钮事件
    resetForm(PasswordFormRef) {
      this.$refs[PasswordFormRef].resetFields()
    },
    // 确认修改密码按钮事件
    changePassword(PasswordFormRef) {
      // 表单预验证
      this.$refs[PasswordFormRef].validate(valid => {
        if (valid) {
          // 表单预验证通过
          console.log('success submit!')
          // 申请数据库的接口
          // 显示成功
          return this.$message.success('修改密码成功')
        } else {
          // 表单预验证失败
          console.log('error submit!!')
          // 显示失败
          return this.$message.error('表单验证失败')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.el-input {
  padding: 15px;
  width: 300px;
}
html,
body,
#app{
    height: 100%;
    margin: 0;
    padding: 0;
    min-width: 1366;
}

.el-breadcrumb{
    margin-bottom: 15px;
    font-size: 12px;
}
.el-card{
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important
}
</style>
