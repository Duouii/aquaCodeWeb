import httpInstance from "@/utils/http";

// 获取验证码
export const getCaptchaAPI = () => {
    return httpInstance({
        url: '/user/captcha'
    })
}

// 登录
export const loginAPI = async (data) => {
    return httpInstance({
        url: '/user/login',
        method: 'POST',
        data
    })
}

// 注册
export const registerAPI = async (data) => {
    return httpInstance({
        url: '/user/register',
        method: 'POST',
        data
    });
}

// 获取用户信息
export const getUserInfoAPI = () => {
    return httpInstance({
        url:'/user/info'
    })
}

// 修改用户信息
export const putUserInfoAPI = ({ userName, userProfile }) => {
    return httpInstance({
        method: 'put',
        url: '/user/update',
        data: {
            userName: userName,
            userProfile: userProfile
        }
    });
}

// 修改用户信息--密码
export const putUserPswAPI = ({ oldPassword,userPassword }) => {
    return httpInstance({
        method: 'put',
        url: '/user/update',
        data: {
            oldPassword: oldPassword,
            userPassword: userPassword
        },
    });
}