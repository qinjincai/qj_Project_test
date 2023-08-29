// 引入 1级路由组件
import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'

import routes from './routes'

Vue.use(VueRouter)

//需要重写VueRouter. prototype原型对象身上的push I replace方法
//先把VueRouter . prototype身上的push |replace方法进行保存一一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写 push| replace
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        //call||app1y区别
        //相同点，都可以调用函数一次，都可以篡改函数的上下文1次
        //不痛点: call与apply传递参数: call传递 参数用逗号隔开，apply方法执行， 传递数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {
        }, () => {
        })
    }
}
//重写VueRouter . prototype身上的replace方法了
VueRouter.prototype.push = function (location, resolve, reject) {
    if (reject && resolve) {
        originReplace.call(this, resolve, reject)
    } else {
        originReplace.call(this, location, () => {
        }, () => {
        })
    }
}
// 配置路由//对外暴露VueRouter类的实例
let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return {y: 0}
    }
})

// 全局守卫:前置守卫(在路由跳转之间进行判断)
//to: 可以获取到你要跳转到那个路由信息
//from:可以获取到你从 哪个路由而来的信息
//next:放行函数next( )放行，next(path)放行 到指令路由next(false) ;
router.beforeEach(async (to, from, next) => {
    next()
    // console.log(store)
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    if (token) {
        // 用户已经登录，成功不能去登录页面了，重定向首页
        if (to.path === '/login') {
            next('/home')
        } else {
            // 存在name通过，用户去的页面是 home search detail shopcart
            if (name) {
                next();
            } else {
                // 没有用户信息，派发action 仓库
                try {
                    await store.dispatch('getUserInfo');
                    next();
                } catch (e) {
                    // token 过期了 清除token 重新登录
                    await store.dispatch('userLogout');
                    next('/login');
                }
            }
        }
    } else {
        // 用户未登录 不可以进入交易页面 后面再处理
        let toPath = to.path;
        // console.log(toPath)
        if (toPath.indexOf('/trade') !== -1 || toPath.indexOf('/pay')!== -1 || toPath.indexOf('/center') != -1)
           {

            next('/login?redirect='+toPath);
        }else{
            next()
        }


    }
})


export default router


// export default router