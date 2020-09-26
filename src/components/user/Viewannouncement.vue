<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>公告管理</el-breadcrumb-item>
      <el-breadcrumb-item>查看公告</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <!-- 使用v-for循环 循环 ViewAnnouncementForm对象里面的数组ViewAnnouncementFormArr-->
    <el-card v-for="(item,index) in ViewAnnouncementForm.ViewAnnouncementFormArr" :key="index">
      <el-form :model="ViewAnnouncementForm" label-width="80px">
        <el-form-item label="公告id">
          <el-input v-model="item.id"></el-input>
        </el-form-item>
        <el-form-item label="公告标题">
          <el-input v-model="item.title"></el-input>
        </el-form-item>
        <el-form-item label="公告时间">
          <el-input v-model="item.time"></el-input>
        </el-form-item>
        <el-form-item label="发布人">
          <el-input v-model="item.name"></el-input>
        </el-form-item>
        <el-form-item label="公告内容">
          <el-input v-model="item.context" type="textarea" :rows="10" style="width:450px"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-button type="danger">删除</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 查看公告表单
      ViewAnnouncementForm: {
        ViewAnnouncementFormArr: [
          // 下面是一些假数据  是可以删除的  数组里面有五组数组
          {
            id: '1',
            title: 'hello',
            time: '2012-12-12',
            name: '黎总',
            context: '今天加班'
          },
          {
            id: '2',
            title: 'hello',
            time: '2012-12-12',
            name: '黎总',
            context: '明天加班'
          },
          {
            id: '3',
            title: 'hello',
            time: '2012-12-12',
            name: '黎总',
            context: '后天加班'
          },
          {
            id: '4',
            title: 'hello',
            time: '2012-12-12',
            name: '黎总',
            context: '大后天加班'
          },
          {
            id: '5',
            title: 'hello',
            time: '2012-12-12',
            name: '黎总',
            context: '这个星期都加班'
          }
        ]
      }
    }
  }
}
</script>
<style lang="less" scoped>
.el-card {
  margin-top: 20px;
  background-color: rgb(154, 155, 154);
}
.el-input {
  width: 150px;
}
</style>
