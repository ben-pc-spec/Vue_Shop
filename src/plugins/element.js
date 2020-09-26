import Vue from 'vue'

// Vue组件的按需导入
import {
  Button, Form, FormItem, Input, Message,
  Container, Header, Aside, Main, Menu, Submenu, MenuItemGroup, MenuItem,
  Breadcrumb, BreadcrumbItem, Card, Row, Col, Table, TableColumn, Switch,
  Tooltip, Pagination, Dialog, MessageBox, Tag, Tree, Select, Option, Cascader,
  DatePicker, Radio, Progress
} from 'element-ui'
//  注册成为全局可用的组件
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(DatePicker)
Vue.use(Radio)
Vue.use(Progress)
//  把message组件挂载到vue上 让这个组件成为vue的一个属性
//  每一个组件都可以通过this$message访问到Message组件
//  进行弹框提示 message是自己进行的命名
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
