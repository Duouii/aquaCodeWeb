//管理用户数据相关
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI, registerAPI, putUserInfoAPI } from '@/apis/user'
import { useRouter } from 'vue-router';
import { putUserPswAPI, getUserInfoAPI, putUserAvatarAPI } from '@/apis/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

export const useUserStore = defineStore('user', () => {
    const router = useRouter()
    //1.定义管理用户数据的state
    const userInfo = ref({})
    const state = {
      token: getToken(), // 从缓存中读取初始值
    }
    //2.定义获取接口数据的action函数
    const login = async (data) => {
        const res = await loginAPI(data)
        if(res) {
          userInfo.value = res;
          state.token = userInfo.value.token
          setToken(userInfo.value.token)
          ElMessage({ type: 'success', message: '登录成功' });
          router.push({ path: '/' })
          getUserInfo()
        }
    }
    const getUserInfo = async() => {
        const res = await getUserInfoAPI()
        userInfo.value = res
    }
    const getRegister = async(data) => {
        await registerAPI(data)
        ElMessage({ type: 'success', message: '注册成功' })
        router.replace({path: 'user/login'})
    }
    const putUserInfo = async(data) => {
        const res = await putUserInfoAPI(data)
        userInfo.value = res
        ElMessage({ type: 'success', message: '修改成功' })
        getUserInfo()
    }
    const putUserPsw = async (data) => {
        const res = await putUserPswAPI(data)
        userInfo.value = res
        ElMessage({ type: 'success', message: '修改成功' })
        getUserInfo()
    }
    //退出时清除用户信息
    const clearUserInfo = () => {
        state.token = null
        removeToken()
        userInfo.value = {}
    }
    //3.以对象的格式把state和action return
    return {
        userInfo,
        login,
        getUserInfo,
        getRegister,
        putUserInfo,
        clearUserInfo,
        putUserPsw,
    }
}, {
    persist: true,
})

