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

// 管理员添加题目
export const postAddQuestionAPI = async(questionTitle, questionContent, questionTags, questionDifficulty, questionAnswer, questionJudgeConfig, questionCase) => {
  return httpInstance({
    method: 'post',
    url: '/question/add',
    data: {
      questionTitle, 
      questionContent, 
      questionTags, 
      questionDifficulty, 
      questionAnswer, 
      questionJudgeConfig, 
      questionCase
    }
  });
}

// 删除问题
export const delQuestionAPI = async(id) => {
  return httpInstance({
    method: 'delete',
    url: '/question/delete',
    data: {
      id
    }
  });
}

// 更新问题
export const putAddQuestionAPI = async(questionId, questionTitle, questionContent, questionTags, questionDifficulty, questionAnswer, questionJudgeConfig, questionCase) => {
  return httpInstance({
    method: 'put',
    url: '/question/update',
    data: {
      questionId,
      questionTitle, 
      questionContent, 
      questionTags, 
      questionDifficulty, 
      questionAnswer, 
      questionJudgeConfig, 
      questionCase
    }
  });
}

// 【后台】管理员添加课程
export const postAddCourseAPI = async(courseName, courseCover, courseDifficulty, courseTags, courseStatus) => {
  return httpInstance({
    method: 'post',
    url: '/admin/course/add',
    data:{
      courseName, 
      courseCover, 
      courseDifficulty, 
      courseTags, 
      courseStatus
    }
  });
}

// 【后台】管理员修改课程
export const putCourseAPI = async(courseId, courseName, courseCover, courseDifficulty, courseTags, courseStatus) => {
  return httpInstance({
    method: 'put',
    url: '/admin/course/add',
    data:{
      courseId, 
      courseName, 
      courseCover, 
      courseDifficulty, 
      courseTags, 
      courseStatus
    }
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