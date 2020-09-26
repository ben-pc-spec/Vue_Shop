<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人管理</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <el-form :inline="true" :model="UserInfoForm" label-width="100px">
        <el-form-item label="姓名">
          <el-input v-model="UserInfoForm.name" @change="onSubmit"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="UserInfoForm.username" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="UserInfoForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="UserInfoForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="UserInfoForm.department" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="UserInfoForm.position" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-input v-model="UserInfoForm.role" disabled="true"></el-input>
        </el-form-item>
        <br />
        <br />
        <el-form-item label=" ">
          <el-button type="primary" @click="onSubmit">确认修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 表单数据对象
      UserInfoForm: {
        username: '',
        name: '',
        email: '',
        tel: '',
        // 部门
        department: '',
        // 职位
        position: '',
        // 角色
        role: ''
      }
    }
  },
  methods: {
    // 点击修改按钮的事件
    onSubmit() {}
  }
}
</script>
<style lang="less" scoped>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
  min-width: 1366;
}

.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}
</style>
