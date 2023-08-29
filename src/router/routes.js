// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Search from '@/pages/Search'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import pay from '@/pages/Pay'
import Paysuccess from'@/pages/PaySuccess'
import Center from '@/pages/Center'

import MyOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'
// 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
// 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了
/* 路由 懒加载 */
// const foo = ()=> import("@/pages/Home")

// 配置路由
export default [
    {
        path: '/Center',
        component: Center,
        meta: {show: true},
        name: 'Center',
        children:[
            {
                path:'MyOrder',
                component: MyOrder,
            },
            {
                path:'groupOrder',
                component: groupOrder,
            },
            {/*redirect  重定向*/
                path:'/Center/',
                redirect:'/Center/MyOrder'
            }
        ]
    },
    {
        path: '/paysuccess',
        component: Paysuccess,
        meta: {show: true},
        name: 'paysuccess',
    },
    {
        path: '/pay',
        component: pay,
        meta: {show: true},
        name: 'pay',
        beforeEnter:(to, from, next)=>{
            if (from.path == '/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: '/Trade',
        component: Trade,
        meta: {show: true},
        name: 'Trade',
        // 独享守卫
        beforeEnter:(to,from,next)=>{
            if (from.path == '/shopcart'){
                next();
            }else{
                next(false);
            }
        },
    },
    {
        path: '/shopcart',
        component: ()=> import("@/pages/ShopCart"),
    },
    {
        path: '/AddCartSuccess/',
        component: ()=> import("@/pages/AddCartSuccess"),
        meta: {
            show: true
        },
        //路由元信息key不能瞎写:只能叫做meta
        name: 'AddCartSuccess',
    },
    {
        path: '/Detail/:skuid',
        component: ()=> import("@/pages/Detail"),
        meta: {
            show: true
        },
        //路由元信息key不能瞎写:只能叫做meta
        name: 'Detail',
    },
    {
        path: '/home',
        component: ()=> import("@/pages/Home"),
        meta: {
            show: true
        },
        name: 'home',
    },
    {
        path: '/login',
        component: ()=> import("@/pages/Login"),
        meta: {
            show: false
        },
        name: 'login',

    },
    {
        path: '/register',
        component: ()=> import("@/pages/Register"),
        meta: {
            show: false
        },
        name: 'register',

    },
    {
        path: '/search/:keyword?',
        component: ()=> import("@/pages/Search"),
        meta: {
            show: true
        },
        name: 'search',
        //路由组件能不能传递props数据?
        //布尔值写法:params
        // props:true, 
        //对象写法:额外的给路由组件传递些props
        // props:{a:1,b:2},
        //函数写法:可以params参数、query参 数，通过props传递给路由组件
        props: ($route) => ({
            keyword: $route.params.keyword,
            k: $route.query.big
        })

    },
    // 重定向 项目执行run 默认访问首页
    {
        path: '*',
        redirect: "/home",
        meta: {
            show: true
        },

    }
]