import { reqGetSearchInfo } from "@/api"

//state:仓库存储数据的地方
const state = {
    // 仓库初始状态
    searchList:{}
};
//mutations :修改state的唯一手 段
const mutations = {
    GETSEARCHINFO(state, searchList) {
        state.searchList = searchList
    }
};
//action:处理action,可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async getSearchList({ commit }, params = {}) {
        //当前这个reqGetSearchInfo这个图数在调用获取服务器数据的时候，至少传递一- 个参数(空对象)
        //params形参:是当用户派发action的时候，第个参数传递过来的，至少是一个空对 象
        let result = await reqGetSearchInfo(params)
        // console.log(result);
        if (result.code == 200) {
            commit("GETSEARCHINFO", result.data)
        }
    }
};
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
// 可以把我们将来在组件当中需要用的数据简化一下[将来组件在获取数据的时候就方便了
const getters = {
    goodsList(state) {
        // console.log(state);
        return state.searchList.goodsList ||[]   //书写有问题的 没有网络就是没有数据渲染
    },
    attrsList(state) {
        return state.searchList.attrsList||[] 
    },
    trademarkList(state) {
        return state.searchList.trademarkList||[] 
    },
};



//对外暴露Store类的一个实例
export default {
    state,
    mutations,
    actions,
    getters
}