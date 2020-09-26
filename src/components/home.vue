<template>
  <el-container class="home_container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <sapn></sapn>
      </div>
      <el-button type="primary" @click="logOut">退出</el-button>
    </el-header>
    <!--页面主体区域-->
    <el-container>
      <!--侧边栏-->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 菜单栏上面的伸展功能 -->
        <div class="toggle-button" @click="toggleCollapse">
          <i :class ="isCollapse ? 'el-icon-plus' : 'el-icon-minus'"></i>
        </div>
        <!--侧边栏菜单区域
        collapse是菜单折叠的属性
        绑定路由属性router 可以传递动态路由链接 传递的事index的值-->
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409eff"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
        >
          <!--一级菜单-->
          <!--绑定一个唯一的:index这样打开一级菜单二级菜单就不会全部出来了-->
          <el-submenu :index="item.id+' '" v-for="item in menulist" :key="item.id">
            <!--一级菜单的模板区域-->
            <!-- 在数据库中获取用户拥有的菜单功能
            再通过v-for指令进行 双重循环进行一级菜单和二级菜单的渲染
            这里通过一个伪数据进行上面的菜单渲染-->
            <template slot="title">
              <!--图标-->
              <i class="el-icon-location"></i>
              <!--文本-->
              <span>{{item.authName}}</span>
            </template>

            <!--二级菜单-->
            <!--:index 动态数据绑定 需要加一个空格字符串才能实现路由的跳转-->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id">
              <template slot="title">
                <!--图标-->
                <i class="el-icon-menu"></i>
                <!--文本-->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--右侧内容主体-->
      <el-main>
        <!-- 放一个路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // 声明一个生命周期函数 这个Vue载入时就会执行函数的代码
  created() {
    this.getMenuList()
  },
  data() {
    return {
      //  左侧菜单数据 伪造的一个数据 真是数据应该是从数据库中拿
      menulist: [],
      isCollapse: false
    }
  },
  methods: {
    logOut() {
      // 清除token值
      window.sessionStorage.clear()
      // 编程式导航到login页面
      this.$router.push('/login')
    },
    //  点击按钮切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 在函数中实现这个生命周期函数 获取所有的菜单
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      // 获取左侧菜单栏失败
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      // 把munulist 数组的值赋值为res.data(也就是服务器返回的数据)  然后再进行渲染
      this.menulist = res.data
      // console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #373d41;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #f1f3f4;
}
.home_container {
  height: 100%;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: right;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
