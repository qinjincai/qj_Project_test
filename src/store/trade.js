import {reqAddressInfo, reqOrderInfo} from "@/api";

const state = {
    useraddress:[],
    orderInfo:{}
}
const mutations = {
    GETUSERADDRESS(state,useraddress){
        state.useraddress = useraddress
    },
    orderInfo(state,orderInfo){
        state.orderInfo = orderInfo
    }
}
const actions = {
    // 获取用户地址信息
    async getUserAddress({commit}) {
       let result = await reqAddressInfo()
        // console.log(result)
        if (result.code == 200){
            commit('GETUSERADDRESS',result.data)
        }
    },
    // 获取商品清单
    async getOrderInfo({commit}){
      let result = await reqOrderInfo();
        // console.log(result)
        if (result.code == 200){
            commit('orderInfo',result.data)
        }
    }
}
const getters = {}


export default {
    state,
    mutations,
    actions,
    getters
}







