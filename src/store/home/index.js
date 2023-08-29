import { reqCategoryList, reqGetBannerList, reqfloorList } from '@/api';

//state:仓库存储数据的地方
const state = {
    //state中数据默认初始值别瞎写，服务器返回对象，服务器返回数组。[根据接口返回值初始化的]
    categoryList: [],
    // 轮播图数据
    bannerList:[],
    // floor组件数据
    floorList:[],
};
//mutations :修改state的唯一手 段 这里保存了vuex 仓库的数据并且修改
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList){
        state.bannerList = bannerList;
        // console.log('修改仓库bannerList数据');
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
};
//action:处理action,可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        // console.log(result.data);
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data)
        }
    },  
    // 获取轮播图数据
    async getBannerList({commit}) {
        // console.log('服务器发送请求获取bannerList数据');

        let result = await reqGetBannerList();
        //    console.log(result);
        if(result.data.code == 200){
            commit('GETBANNERLIST',result.data)
        }
    },
    // 获取floor 数据
    async getfloorList({commit}){
        let result = await reqfloorList();
        //    console.log(result);
        if(result.data.code == 200){
            // 提交 motation
            // console.log('获取resultok');
            commit('GETFLOORLIST',result.data)
        }
    } 

};



//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {};

//对外暴露Store类的一个实例
export default {
    state,
    mutations,
    actions,
    getters
}

