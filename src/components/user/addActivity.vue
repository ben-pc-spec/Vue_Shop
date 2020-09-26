<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加活动</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <el-form
        :model="addActivityForm"
        :rules="addActivityFormRules"
        ref="addActivityFormRef"
        label-width="100px"
      >
        <!-- 活动标题 -->
        <el-form-item label="活动标题" prop="title">
          <el-input v-model="addActivityForm.title" style="width:150px"></el-input>
        </el-form-item>
        <!-- 活动类型 label  选中的值-->
        <el-form-item label="活动类型" prop="type">
          <template>
            <el-radio v-model="addActivityForm.type" label="1">普通活动</el-radio>
            <el-radio v-model="addActivityForm.type" label="2">投票活动</el-radio>
          </template>
        </el-form-item>
        <!-- 活动内容 -->
        <el-form-item label="活动内容" prop="content">
          <el-input v-model="addActivityForm.content" type="textarea" :rows="10"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-row :gutter="20">
          <el-col :span="9">.</el-col>
          <el-col :span="4">
            <el-button type="danger" @click="resetForm('addActivityFormRef')">重置</el-button>
            <el-button type="primary" @click="submit('addActivityFormRef')">提交</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 添加活动的表单对象
      addActivityForm: {
        // 标题
        title: '',
        // 类型
        type: '',
        // 内容
        content: ''
      },
      // 添加活动的验证规则对象
      addActivityFormRules: {
        title: [{ required: true, message: '请输入活动标题', trigger: 'blur' }],
        type: [{ required: true, message: '请选择活动类型', trigger: 'blur' }],
        content: [
          { required: true, message: '请输入活动内容', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 重置按钮事件
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 提交按钮事件
    submit(formName) {
      // 表单预验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 表单预验证通过
          // 在此处申请数据库的接口
          // 显示成功
          return this.$message.success('添加活动成功')
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
