import {reqGoodsInfo, reqAddOrUpdateShopCart} from '@/api';

import  {getUUID} from "@/utils/uuid_token";
//state:仓库存储数据的地方
// 仓库初始状态
const state = {
    goodInfo: {},
    uuidtoken: getUUID()
};
//mutations :修改state的唯一手 段
const mutations = {
    GETCOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
};
//action:处理action,可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //获取产品信息的action
    async getGoodInfo({commit}, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit("GETCOODINFO", result.data)
        }
    },
    //将产品添加到购物车中
    async addOrUpdateShpCart({commit}, {skuId, skuNum}) {
        //加入购物车返回的解构
        //加入购物车以后(发请求)，前台将参数带给服务器
        //服务器写入数据成功， 并没有返回其他的数据，只是返回code=200， 代表这次操作成功
        //因为服务器没有返回其余数据，因此咱们不需要三连环存储数据
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        if (result.code == 200){
            // console.log(result)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
};
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
// 可以把我们将来在组件当中需要用的数据简化一下[将来组件在获取数据的时候就方便了
const getters = {
    // 路径导航简化数据
    categoryView(state) {
        return state.goodInfo.categoryView || {};
    },
    // 简化产品信息
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    // 产品售卖属性的简化, 后
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
};


//对外暴露Store类的一个实例
export default {
    state,
    mutations,
    actions,
    getters
}