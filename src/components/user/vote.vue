<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动投票</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格区 -->
    <!-- 普通活动table表格 -->
    <el-table :data="VoteForm" border="true" stripe="true">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="name" label="发布人"></el-table-column>
      <el-table-column prop="time" label="活动时间"></el-table-column>
      <el-table-column prop="title" label="活动标题"></el-table-column>
      <!-- 查看按钮 -->
      <el-table-column label="查看">
        <template slot-scope="scope">
          <el-button type="danger" @click="context(scope.row)">投票</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 对话框 -->
    <el-dialog title="活动内容" :visible.sync="ActivityContentDialogVisible" width="50%">
      <!-- 活动内容 -->
      <el-row>{{this.Content}}</el-row>
      <br />
      <el-row :gutter="20">
        <el-col :span="10">*</el-col>
        <el-col :span="8">
          <el-button type="success" icon="el-icon-check" circle @click="Vote = 1"></el-button>
          <el-button type="danger" icon="el-icon-close" circle @click="Vote = 2"></el-button>
        </el-col>
      </el-row>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="ActivityContentDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 普通活动表格数据 下面是一些假数据 只需要把数据渲染到VoteForm这个数组就行了
      VoteForm: [
        {
          name: 'dfdf',
          time: '2012-12-12',
          title: '周六去团队建设',
          content: '加班'
        },
        {
          name: '小明',
          time: '2012-12-12',
          title: '周六去团队建设',
          content: '明天放假'
        },
        {
          name: '小明',
          time: '2012-12-12',
          title: '周六去团队建设',
          content: '的课件放辣椒发烧了解放大路设计费拉是放假啦'
        },
        {
          name: '小明',
          time: '2012-12-12',
          title: '周六去团队建设',
          content:
            '5水电费第三方第三方水电费水电费水电费水电费水电费水电费胜多负少的'
        },
        {
          name: '小明',
          time: '2012-12-12',
          title: '周六去团队建设',
          content: '第三方水电费水电费无法为'
        }
      ],
      // 下面是前端用到的数据  不用管  也不要删除
      // 记录投票的结果
      Vote: 0,
      // 投票内容的弹框可视化 默认为false
      ActivityContentDialogVisible: false,
      // 投票内容弹框  活动内容
      Content: ''
    }
  },
  methods: {
    // 投票内容弹框
    context(content) {
      // 活动内容的弹框可视化 赋值为true
      this.ActivityContentDialogVisible = true
      // 后端的content赋值给前端的Content 重新赋值Content
      this.Content = content.content
    },
    // 投票内容弹框  确定按钮
    submit() {
      if (this.Vote === 0) {
        // 没有点击投票
        return this.$message.error('请选择投票')
      }
      // 在此处调用接口把this.vote的值存进数据库  1赞成 2反对

      // 投票成功
      this.$message.success('投票成功')
      // 重置Vote的值
      this.Vote = 0
      // 点击确定关闭弹框
      this.ActivityContentDialogVisible = false
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
