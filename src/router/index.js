import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入登录页面
import Login from '../components/login.vue'
// 导入主页页面
import Home from '../components/home.vue'
// 导入欢迎页面
import Welcome from '../components/welcome.vue'
// 导入用户管理页面
import Users from '../components/user/user.vue'
// 导入权限列表
import Right from '../components/power/right.vue'
// 导入角色列表
import Role from '../components/power/role.vue'
// 导入商品分类
import Categories from '../components/goods/categories.vue'
// 导入插件
import TreeTable from 'vue-table-with-tree-grid'
import '../plugins/element.js'
// 导入全局样式表
import '../assets/css/global.css'
// 导入axios
import axios from 'axios'
// 配饰请求的根路径
axios.defaults.baseURL = ''
// 为Vue绑定全局的axios
Vue.prototype.$http = axios
// 设置axios的请求跟路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 设置拦截器  用来访问有权限的api接口  服务器会判断Authorization 符合要求才会进行响应
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 全局注册插件
Vue.component('tree-table', TreeTable)
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    //  重定向路由规则
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        //  嵌套子路由规则  在home页面的  主体内容区域放一个路由站位符
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users },
        { path: '/rights', component: Right },
        { path: '/roles', component: Role },
        { path: '/categories', component: Categories }
      ]
    }
  ]
})
// 挂载路由导航卫视 相当于一个拦截器  用户没有登录就不能访问有权限的页面 这样用户就不能通过url地址访问特定的页面了
router.beforeEach((to, from, next) => {
  // to将要访问的路径
  // from从哪个路径跳转而来
  // next 函数表示放行可以访问这个页面  1.next()放行  2.next('\login')放行跳转到的页面
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
// 暴露路由
export default router
