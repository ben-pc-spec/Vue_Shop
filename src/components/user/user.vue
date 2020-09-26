<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!--搜索区域-->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button @click="getUserList" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区 -->
      <!-- :data指定数据源 border添加边框线 stripe隔行变色-->
      <el-table :data="userlist" border="true" stripe="true">
        <!-- 用label来指定列的名称 用prop来指定列的值 -->
        <!-- type='index' 意思是添加索引列 -->
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <!--使用switch开关-->
          <template slot-scope="scope">
            <!-- {{scope.row}}作用域插槽会显示这一行所有的信息  会覆盖prop属性 -->
            <el-switch
              @change="userStateChanged(scope.row)"
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserById(scope.row.id)"
            ></el-button>
            <!-- 鼠标点击上去文字提示 -->
            <el-tooltip content="分配角色" placement="top">
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="setRole(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 3, 9]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 添加用户的对话框
    title是对话框的提示信息
    :visible.sync是对话框是否弹出的绑定属性
    width对话框的宽度
    @close监听关闭事件-->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体区
      :rules 是验证规则对象
      ref是添加引用对象
      prop对应验证规则对象的具体规则-->
      <el-form :model="addFrom" :rules="addFromRules" ref="ruleFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addFrom.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addFrom.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addFrom.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addFrom.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户信息的对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <!-- 内容主体 -->
      <el-form :model="editForm" :rules="addFromRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="editForm.username" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- 底部 -->
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配角色的对话框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="setRoleDialogVisible"
      width="50%"
      @closed="setRoleDialogClosed"
    >
      <div>
        <p>当前用户: {{userInfo.username}}</p>
        <p>当前角色: {{userInfo.role_name}}</p>
        <p>
          分配新角色:
          <el-select v-model="selectedRoleId" placeholder="请选择">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 验证邮箱的验证规则
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb()
      }
      // 非法的邮箱
      cb(new Error('请输入合法的邮箱'))
    }
    // 验证手机号的验证规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^[1][3,4,5,7,8][0-9]{9}$/
      if (regMobile.test(value)) {
        // 合法的手机号
        return cb()
      }
      // 非法的手机号
      cb(new Error('请输入正确的手机号'))
    }
    return {
      // 设置获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 每页显示多少数据
        pagesize: 2
      },
      // 用来获取服务器传过来的参数
      userlist: [],
      total: 0,
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 修改用户的表单数据
      editForm: {},
      // 添加用户的表单数据
      addFrom: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加表单的验证规则对象
      addFromRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 控制分配角色对话框的显示与隐藏
      setRoleDialogVisible: false,
      // 需要被分配角色的用户信息
      userInfo: {},
      // 所有角色的数据列表
      rolesList: [],
      // 分配角色中已选中的角色id值
      selectedRoleId: ''
    }
  },
  // 声明周期函数
  created() {
    this.getUserList()
  },
  methods: {
    // 实现声明周期函数
    async getUserList() {
      // 使用get请求并且携带一个参数
      const { data: res } = await this.$http.get('users', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('用户列表获取失败')
      }
      this.userlist = res.data.users
      this.total = res.data.total
      console.log(res)
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      // 重新获取数据
      this.getUserList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      // 重新获取数据
      this.getUserList()
    },
    // 监听switch开关状态的改变 通过调用api接口 实现在数据库中改变数据
    async userStateChanged(userinfo) {
      // 调用接口 传递参数 改变数据库中用户的状态
      const { data: res } = await this.$http.put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      )
      // 如果修改失败
      if (res.meta.status !== 200) {
        // 更新失败之后 立即取反 保证页面状态没有变化
        userinfo.mg_state = !userinfo.mg_state
        // 提示信息
        return this.$message.error('更新用户状态失败!')
      }
      // 修改成功 提示成功信息
      this.$message.success('更新用户状态成功!')
    },
    // 监听用户添加弹框的关闭事件
    addDialogClosed() {
      // addFromRef是添加弹框的引用对象
      this.$refs.ruleFormRef.resetFields()
    },
    // 添加表单预验证和添加表单发送到数据库
    addUser() {
      this.$refs.ruleFormRef.validate(async valid => {
        // 如果表单预验证不同过则返回
        if (!valid) {
          return this.$message.error('请填写正确的信息')
        }
        // 通过了就可以发起数据库请求
        const { data: res } = await this.$http.post('users', this.addFrom)
        console.log(res)
        // 用户添加失败
        if (res.meta.status !== 201) {
          this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
        // 隐藏添加用户的对话框
        this.addDialogVisible = false
        // 重新获取用户数据列表
        this.getUserList()
      })
    },
    // 展示编辑用户的对话框
    async showEditDialog(id) {
      // console.log(id)
      const { data: res } = await this.$http.get('users/' + id)
      // 请求失败
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.editForm = res.data
      this.editDialogVisible = true
    },
    // 监听修改用户对话框的关闭重置事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 修改用户表单并提交到数据库
    editUserInfo() {
      // 表单预验证
      this.$refs.editFormRef.validate(async valid => {
        // 表单预验证失败
        if (!valid) {
          return this.$message.error('修改失败')
        }
        // 发起网络请求
        const { data: res } = await this.$http.put(
          'users/' + this.editForm.id,
          {
            email: this.editForm.email,
            mobile: this.editForm.mobile
          }
        )
        // 请求失败
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg)
        }
        // 请求成功
        this.editDialogVisible = false
        this.getUserList()
        this.$message.success(res.meta.msg)
      })
    },
    // 根据id删除用户
    async removeUserById(id) {
      // 弹框提示用户是否进行删除
      // 用户点击确定 返回confirm字符串  点击取消返回cancel字符串 从而判定用户点击了什么
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => {
        return err
      })
      // 判定用户点击了什么
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消删除')
      }
      // 调用api接口进行删除
      const { data: res } = await this.$http.delete('users/' + id)
      // 删除失败
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      // 删除成功
      this.$message.success(res.meta.msg)
      this.getUserList()
    },
    // 展示分配角色的对话框
    async setRole(userInfo) {
      this.userInfo = userInfo
      // 获取所有的角色列表
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.rolesList = res.data
      this.setRoleDialogVisible = true
    },
    // 分配角色的确定按钮 分配角色
    async saveRoleInfo() {
      if (!this.selectedRoleId) {
        return this.$message.error('请选择心得角色')
      }
      const { data: res } = await this.$http.put(
        `users/${this.userInfo.id}/role`,
        {
          rid: this.selectedRoleId
        }
      )
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.getUserList()
      this.setRoleDialogVisible = false
    },
    // 关闭分配角色对话框的事件
    setRoleDialogClosed() {
      this.selectedRoleId = ''
      this.userInfo = ''
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
.el-pagination {
  margin-top: 15px;
}
</style>
