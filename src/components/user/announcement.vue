<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>公告管理</el-breadcrumb-item>
      <el-breadcrumb-item>发布公告</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 表单区 -->
      <el-form
        :rules="announcementFormRules"
        ref="announcementFormRef"
        :model="announcementForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <!-- 发布人 -->
        <el-form-item label="发布人" prop="name">
          <el-input v-model="announcementForm.name" style="width:150px"></el-input>
        </el-form-item>
        <!-- 发布内容 -->
        <el-form-item label="发布内容" prop="content">
          <el-input
            v-model="announcementForm.content"
            type="textarea"
            :rows="10"
            style="width:450px"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="reset('announcementFormRef')">重置</el-button>
          <el-button type="danger" @click="submit('announcementFormRef')">发布</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 发布公告的表单数据
      announcementForm: {
        // 发布人
        name: '',
        // 发布内容
        content: ''
      },
      // 验证规则对象
      announcementFormRules: {
        name: [{ required: true, message: '请输入发布人!', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容!', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 重置
    reset(announcementFormRef) {
      this.$refs[announcementFormRef].resetFields()
    },
    // 发布
    submit(announcementFormRef) {
      // 表单预验证
      this.$refs[announcementFormRef].validate(valid => {
        if (valid) {
          // 表单预验证通过
          // 在此处申请数据库的接口
          // 显示成功
          return this.$message.success('发布公告成功')
        } else {
          // 表单预验证失败
          // 显示失败
          return this.$message.error('表单验证失败')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
