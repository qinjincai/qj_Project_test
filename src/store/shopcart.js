import {reqCartList, reqDeleteCartById, reqUpdateCheckedByid} from '@/api';

//state:仓库存储数据的地方
// 仓库初始状态
const state = {
    cartList: [],
};
//mutations :修改state的唯一手 段
const mutations = {
    GETCARTLIST(state, cartlist) {
        state.cartList = cartlist
    }
};
//action:处理action,可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 获取购物车列表数据
    async getCartList({commit}) {
        let result = await reqCartList();
        if (result.code === 200) {
            commit("GETCARTLIST", result.data)
        }
        // console.log(result.data)
    },
    // 删除购物车每一个产品
    async deleteCartListBySkuId({commit}, skuId) {
        let result = await reqDeleteCartById(skuId);
        // console.log(result)
        if (result.code === 200) {
            console.log(result.code)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改购物车某一个产品选中状态
    async updateCheckedById({commit}, {skuId, isChecked}) {
        let result = await reqUpdateCheckedByid(skuId, isChecked)
        if (result.code === 200) {
            console.log(result.code)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //删除全部勾选的产品
    deleteAllCheckedCart({dispatch, getters}){
        //context:小仓库，commit [提交mutations修改state] getters [计算属性] dispatch [派发action]
        //获取购物车中全部的产品(是一个数组)
        console.log(getters.cartList)
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item=>{
            let promise = item.isChecked === 1 ?dispatch('deleteCartListBySkuId',item.skuId): '';
            //将每一次返回的Promise添加到数组当中
            PromiseAll.push(promise)
        });
        //只要全部的p1|p2....都成功，返回结果即为成功
        //如果有一个失败，返回即为失败结果
        return Promise.all(PromiseAll)
    },
    // 修改全部产品状态
    updateAllCartChecked({dispatch, state}, isChecked){
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach((item=>{
            let promise = dispatch("updateCheckedById",{skuId:item.skuId, isChecked});
            console.log(promise)
            promiseAll.push(promise)
        }));
        // 最终返回结果
        return Promise.all(promiseAll);
    }
};

//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
// 可以把我们将来在组件当中需要用的数据简化一下[将来组件在获取数据的时候就方便了
const getters = {
    cartList(state) {
        return state.cartList[0] || {};
    }
};


//对外暴露Store类的一个实例
export default {
    state,
    mutations,
    actions,
    getters
}