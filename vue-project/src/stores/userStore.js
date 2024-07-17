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
    const userInfo = ref({})
    const state = {
      token: getToken(),
    }
    const login = async (data) => {
      const res = await loginAPI(data)
      if(res) {
        userInfo.value = res;
        state.token = userInfo.value.token
        setToken(userInfo.value.token)
        ElMessage({ type: 'success', message: '登录成功' });
        await getUserInfo()
        router.push({ path: '/' })
        await getUserInfo()
      }
    }
    const getUserInfo = async() => {
        const res = await getUserInfoAPI()
        userInfo.value = res
        userInfo.value.userStudyTime = (userInfo.value.userStudyTime / 1000 / 60).toFixed(2)
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
        window.location.reload();
        await getUserInfo()
    }
    const putUserPsw = async (data) => {
        const res = await putUserPswAPI(data)
        userInfo.value = res
        ElMessage({ type: 'success', message: '修改成功' })
        window.location.reload();
        await getUserInfo()
    }
    //退出时清除用户信息
    const clearUserInfo = () => {
        state.token = null
        removeToken()
        userInfo.value = {}
    }
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

