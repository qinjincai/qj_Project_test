import {reqGetCode, reqUserRegister, reqUserLogin, reqUserInfoToken, reqLogOut} from "@/api";
import {getToken, setToken, removeToken} from "@/utils/token";

const state = {
    code: "",
    token: getToken(),
    userInfo: {},
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    CATUSERINFO(state, userInfo){
        state.userInfo = userInfo
    },
    CLEAR(stae){
        stae.token='',
        state.userInfo={},
        removeToken()
    }
}
const actions = {
    // 获取验证码  正常开发不需要获取验证码到vuex 处理
    async getCode({commit}, phone) {
        let result = await reqGetCode(phone);
        // console.log(result.code)
        if (result.code === 200) {
            commit("GETCODE", result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('验证码获取失败'))
        }
    },
    // 用户注册
    async useRegister({commit}, user) {
        let result = await reqUserRegister(user)
        // console.log(result)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error("faile"));
        }
    },
    // 用户登录
    async userLogin({commit}, data) {
        let result = await reqUserLogin(data)
        // console.log(result)
        if (result.code == 200) {
            commit("USERLOGIN", result.data.token);
            // localStorage.setItem("TOKEN",result.data.token)
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('登录失败！'))
        }
    },
    // 获取用户 信息token
    async getUserInfo({commit}) {
        let result = await reqUserInfoToken();
        // console.log(result)
        if(result.code == 200){
            // console.log('ok')
            commit("CATUSERINFO",result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error("用户未登录"));
            // return Promise.reject(new Error('登录失败！'))
        }
    },
    // 退出登录u
    async userLogout({commit}){
      let result =  await reqLogOut();
      if (result.code == 200){
          commit("CLEAR")
          return 'ok'
      }else{
          return  Promise.reject(new Error('退出失败'))
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