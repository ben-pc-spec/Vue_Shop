<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/image/icon.jpg" />
      </div>
      <!-- 登录表单区域 -->
      <!--ref是一个引用属性 可以指定名称引用指定的对象-->
      <el-form
        ref="loginFormRef"
        :rules="loginFormRules"
        :model="Loginform"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="Loginform.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="Loginform.password" prefix-icon="el-icon-goods" type="password"></el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //  登录表单的数据绑定对象
      Loginform: {
        username: 'admin',
        password: '123456'
      },
      //  表单的验证规则对象  在forrm中通过:rules属性进行绑定 再在组件中通过prop属性进行具体规则绑定
      loginFormRules: {
        // 验证用户名是否合法 验证规则可以从element-ui官网找
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        //  验证密码是否合法
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //  点击重置按钮 重置登录页面的数据  先用ref属性绑定应用名称  再调用相关的表单函数
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          return
        }
        const { data: res } = await this.$http.post('login', this.Loginform)
        if (res.meta.status !== 200) return this.$message.error('登录失败！')
        this.$message.success('登录成功！')
        // token值是用来记录是否用户登录的一个字符串  也可以叫令牌
        // 把服务器传过来用户登录成功后的token值保存在sessionStorage中
        window.sessionStorage.setItem('token', res.data.token)
        // 编程式导航
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
