import httpInstance from "@/utils/http";

// 【后台】管理员封禁或解封用户
export const postBanUserAPI = async(userId) => {
  return httpInstance({
    method: 'post',
    url: '/user/admin/ban',
    params: {
      userId
    }
  });
}

// 管理员获取题目列表
export const postQuestionAPI = async(current, pageSize, title, content, tags) => {
  return httpInstance({
    method: 'post',
    url: '/admin/question/getQuestionPage',
    data: {
      current, 
      pageSize, 
      title, 
      content, 
      tags, 
    }
  });
}

// 管理员根据id获取问题
export const getQuestionAPI = async(id) => {
  return httpInstance({
    url: '/admin/question',
    params: {
      id: id
    }
  });
}

// 管理员添加题目
export const postAddQuestionAPI = async(data) => {
  return httpInstance({
    method: 'post',
    url: '/admin/question/add',
    data
  });
}

// 删除问题
export const delQuestionAPI = async(id) => {
  return httpInstance({
    method: 'delete',
    url: '/admin/question/delete',
    data: {
      id
    }
  });
}

// 更新问题
export const putAddQuestionAPI = async(data) => {
  return httpInstance({
    method: 'put',
    url: '/admin/question/update',
    data
  });
}

// 【后台】管理员添加课程
export const postAddCourseAPI = async(data) => {
  return httpInstance({
    method: 'post',
    url: '/admin/course/add',
    data
  });
}

//【后台】管理员上传课程封面 
// 上传头像
export const putLessonCoverAPI =(formData)=> {
  return httpInstance({
    method: 'post',
    url: '/common/upload',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 【后台】管理员修改课程
export const putCourseAPI = async(data) => {
  return httpInstance({
    method: 'put',
    url: '/admin/course/update',
    data
  });
}

// 【后台】管理员删除课程
export const delCourseAPI = async(courseId) => {
  return httpInstance({
    method: 'delete',
    url: '/admin/course/delete',
    params: {
      courseId: courseId
    }
  });
}

// 【后台】管理员条件查询课程
export const postCourseAPI = async(current, pageSize, courseName, courseDifficulty, courseTags, courseStatus) => {
  return httpInstance({
    method: 'post',
    url: '/admin/course/list',
    data:{
      current, 
      pageSize,
      courseName, 
      courseDifficulty, 
      courseTags, 
      courseStatus
    }
  });
}

// 【后台】管理员添加卡片
export const postAddCardAPI = async(cardId, cardTitle, cardType, cardNo, courseId, questionId, difficulty, status) => {
  return httpInstance({
    method: 'post',
    url: '/admin/card/add',
    data:{
      cardId, 
      cardTitle, 
      cardType, 
      cardNo, 
      courseId, 
      questionId, 
      difficulty, 
      status
    }
  });
}

// 【后台】管理员修改卡片
export const putCardAPI = async(cardId, cardTitle, cardType, cardNo, courseId, questionId, difficulty, status) => {
  return httpInstance({
    method: 'put',
    url: '/admin/card/update',
    data:{
      cardId, 
      cardTitle, 
      cardType, 
      cardNo, 
      courseId, 
      questionId, 
      difficulty, 
      status
    }
  });
}

// 【后台】管理员删除卡片
export const delCardAPI = async(cardId) => {
  return httpInstance({
    method: 'delete',
    url: '/admin/card/delete',
    params: {
      cardId: cardId
    }
  });
}

// 【后台】管理员条件查询卡片
export const postCardAPI = async(current, pageSize, cardId, cardTitle, cardType, courseId) => {
  return httpInstance({
    method: 'post',
    url: '/admin/card/query',
    params: {
      current, 
      pageSize, 
      cardId, 
      cardTitle, 
      cardType, 
      courseId
    }
  });
}