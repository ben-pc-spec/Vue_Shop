<template>
  <div>
    <!-- 普通活动table表格 -->
    <el-table :data="VoteForm" border="true" stripe="true">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="name" label="发布人"></el-table-column>
      <el-table-column prop="time" label="活动时间"></el-table-column>
      <el-table-column prop="title" label="活动标题"></el-table-column>
      <!-- 查看按钮 -->
      <el-table-column label="查看">
        <template slot-scope="scope">
          <el-button type="danger" @click="context(scope.row)">活动内容</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 对话框 -->
    <el-dialog title="活动内容" :visible.sync="ActivityContentDialogVisible" width="50%">
      <!-- 活动内容 -->
      <el-row>{{this.Content}}</el-row>
      <br />
      <!-- 活动进度条 -->
      <!-- 支持 -->
      <el-row>
        <el-col :span="5">活动支持百分比</el-col>
        <el-col :span="8">
          <el-progress :text-inside="true" :stroke-width="24" :percentage="Agree" status="success"></el-progress>
        </el-col>
      </el-row>
      <!-- 反对 -->
      <el-row>
        <el-col :span="5">活动反对百分比</el-col>
        <el-col :span="8">
          <el-progress
            :text-inside="true"
            :stroke-width="24"
            :percentage="DisAgree"
            status="exception"
          ></el-progress>
        </el-col>
      </el-row>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="ActivityContentDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ActivityContentDialogVisible = false">确 定</el-button>
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
          content: '加班',
          Agree: '30.55',
          DisAgree: '69.55'
        },
        {
          name: '黎元证',
          time: '2012-12-12',
          title: '周六去团队建设',
          content:
            '所有人都要去团建，不得缺席1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
          Agree: '70',
          DisAgree: '30'
        },
        {
          name: '小明',
          time: '2012-12-12',
          title: '周六去团队建设',
          content: '明天放假',
          Agree: '35.55',
          DisAgree: '64.55'
        },
        {
          name: '小明',
          time: '2012-12-12',
          title: '周六去团队建设',
          content: '的课件放辣椒发烧了解放大路设计费拉是放假啦',
          Agree: '50',
          DisAgree: '50'
        },
        {
          name: '小明',
          time: '2012-12-12',
          title: '周六去团队建设',
          content:
            '5水电费第三方第三方水电费水电费水电费水电费水电费水电费胜多负少的',
          Agree: '66.9',
          DisAgree: '33.1'
        },
        {
          name: '小明',
          time: '2012-12-12',
          title: '周六去团队建设',
          content:
            '不不不不不不不不不不不不不不不不不不不不不不不不不不不不不不不不不不不不不不不不不不不不不不不不不不不不不不不',
          Agree: '70',
          DisAgree: '30'
        },
        {
          name: '小明',
          time: '2012-12-12',
          title: '周六去团队建设',
          content: '第三方水电费水电费无法为',
          Agree: '80',
          DisAgree: '20'
        }
      ],
      // 下面是前端用到的数据  不用管  也不要删除
      // 活动内容的弹框可视化 默认为false
      ActivityContentDialogVisible: false,
      // 活动内容弹框  活动内容
      Content: '',
      // 活动内容弹框  支持百分比
      Agree: '',
      // 活动内容弹框  反对百分比
      DisAgree: ''
    }
  },
  methods: {
    // 活动内容弹框
    context(content) {
      // 活动内容的弹框可视化 赋值为true
      this.ActivityContentDialogVisible = true
      // 后端的content赋值给前端的Content 重新赋值Content
      this.Content = content.content
      // 后端的Agree赋值给前端的Agree  重新赋值Agree
      this.Agree = content.Agree
      // 后端的DisAgree赋值给前端的DisAgree  重新赋值DisAgree
      this.DisAgree = content.DisAgree
    }
  }
}
</script>
<style lang="less" scoped>
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
</style>
