// API 进行统一管理

import requests from "./request";
import mockRequests from './mockAxios'

// 三级联动接口
// /api/product/getBaseCategoryList get 无参数

// 发请求 axios 返回的是 promise 
// export const reqCategoryList = ()=>requests({url:'/product/getBaseCategoryList',method:'get'})
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList')

// 获取首页轮播图 banner
// export const reqGetBannerList =() =>mockRequests({url:'/banner',method:'get'})
export const reqGetBannerList = () => mockRequests.get('/banner')

// 获取floor 数据
export const reqfloorList = () => mockRequests.get('/floor')

// 获取搜索商品接口 api/list
export const reqGetSearchInfo = (params) => requests({url: '/list', method: 'post', data: params});

//获取产品详情信息的接口URL: /api/ item/{ skuId 请求方式: get
export const reqGoodsInfo = (skuId) => requests({url: `/item/${skuId}`, method: 'get'});

// 将产品添加到购物车中(获取更新某一个产品的个数)
// /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'POST'})

//获取购物车列表数据接口
//URL : /api/cart/cartList
export const reqCartList = () => requests({url: '/cart/cartList', method: 'get'});

// 删除购物车商品 /api/cart/deleteCart/{skuId}
export const reqDeleteCartById = (skuId) => requests({url: `/cart/deleteCart/${skuId}`, method: 'delete'})
// export const reqDeleteCartById = (skuId) => requests({url: `/cart/deleteCart/${skuId}`, method: 'delete'});

//切换商品选中状态 /api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateCheckedByid = (skuId, isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

// 获取验证码  /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`, method:'get'})

// 注册 /api/user/passport/register
export const reqUserRegister =(data)=>requests({url:`/user/passport/register`,data,method:'post'})

// 登录接口 /api/user/passport/login
export const reqUserLogin = (data)=>requests({url:`/user/passport/login`,data, method:'post'})

// 获取用户token    /api/user/passport/auth/getUserInfo
export const reqUserInfoToken = ()=>requests({url: `/user/passport/auth/getUserInfo`, method:'get'})

// 退出登录 /api/user/passport/logout
export const reqLogOut = ()=>requests({url: `/user/passport/logout`, method:'get'})

//获取用户地址信息
//URL:/api/user/userAddress/auth/findUserAddressList  method:get
export const reqAddressInfo = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'});

// 获取商品清单 /api/order/auth/trade
export const reqOrderInfo = ()=>requests({url:`/order/auth/trade`, method:'get'})

// 提交添加订单 /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder =(tradeNo, data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

 // 获取订单信息   /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`, method:'get'})

//获取支付订单状态
//URL:/api/payment/weixin/queryPayStatus/{orderId}  get
export  const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});

 // 获取个人中心数据  /api/order/auth/{page}/{limit}
export const reqMyOrderList = (page, limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})











