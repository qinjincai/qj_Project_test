import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
//定义全局组件:在入口文件注册一次之后，在任何组件当中都可以使用 三级联动组件 全局
import TypeNav from '@/components/TypeNav'
import pagination from '@/components/Pagination'
import { Button,MessageBox } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//第一个参数:全局组件的名字，第二个参数:哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(pagination.name, pagination)

// 全局注册组件
Vue.component(Button.name, Button)
/* ElementUI 注册组件的时候，还有一种写法，挂在原型上 */
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

import '@/mock/mockServer';
// 引入swiper
import 'swiper/css/swiper.css'
// 引入统一接口的api
import * as API from '@/api'
import tu from '@/assets/logo.png'

// 测试
import { reqGetSearchInfo } from '@/api'
// reqCategoryList();
reqGetSearchInfo();
// console.log(reqGetSearchInfo());
import VueLazyload from 'vue-lazyload';
//注册插件
Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading:tu
});
import '@/plugins/validata'
new Vue({
  render: h => h(App),
  // 全局事件总线 配置
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册路由:底下的写法KV-致省略V [ router小写的]
  //注册路由信息:当这里书写router的时候，组件身上都拥有$route，$router属性
  router,
  //注册仓库:组件实例的身上会多个一个属性$store属性
  store
}).$mount('#app')
