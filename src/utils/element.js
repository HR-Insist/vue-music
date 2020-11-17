import Vue from 'vue'

import {
  Icon,
  Input,
  Container,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Carousel,
  CarouselItem,
  Popover,
  Tooltip,
  Slider,
  Table,
  TableColumn,
  Pagination,
  Button,
  Backtop,
  Tabs,
  TabPane,
  Dialog,
  Form,
  FormItem,
  Row,
  Message,
  Notification,
  MessageBox,
} from "element-ui"

Vue.use(Icon)
Vue.use(Input)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Popover)
Vue.use(Tooltip)
Vue.use(Slider)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Button)
Vue.use(Backtop)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Row)
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
Vue.prototype.$confirm = MessageBox.confirm