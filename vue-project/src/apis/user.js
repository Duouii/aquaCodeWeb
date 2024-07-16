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
export const putUserInfoAPI = ({ userName, userProfile, userAvatar }) => {
  return httpInstance({
    method: 'put',
    url: '/user/update',
    data: {
      userName: userName,
      userProfile: userProfile,
      userAvatar: userAvatar
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

// 用户正在学习的课程
export const getStudyingCourseAPI = () => {
  return httpInstance({
    url: '/user/studyingCourseInfo'
  })
}

// 用户通过的题目
export const getAcceptQuestionAPI = () => {
  return httpInstance({
    url: '/user/recentAcceptedQuestions'
  })
}

// 上传头像
export const putUserAvatarAPI =(formData)=> {
  return httpInstance({
    method: 'post',
    url: '/common/upload',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}