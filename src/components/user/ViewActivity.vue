<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>查看活动</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!--按钮区域-->
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary" @click="Connom">普通活动</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="danger" @click="Vote">投票活动</el-button>
        </el-col>
      </el-row>
      <!-- 路由站位符 -->
      <router-view></router-view>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    // 普通活动按钮
    Connom() {
      // 路由重定向
      this.$router.push('/ViewActivityCommon')
    },
    // 投票活动按钮
    Vote() {
      // 路由重定向
      this.$router.push('/ViewActivityVote')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
