import httpInstance from "@/utils/http";

// 获取课程卡片
export const getCourseCardAPI = async() => {
  return httpInstance({
    method: 'get',
    url: '/course/listCourses'
  });
}

// 获取课程卡片里的学习，练习卡片
export const getCourseCardContainAPI = (courseId) => {
  return httpInstance({
    method: 'get',
    url: `/course/${courseId}`,
    params:{
      courseId
    }
  });
}

// 获取学习卡片里的页面
export const getCoursePageContainAPI = (cardId, index) => {
  return httpInstance({
    method: 'get',
    url: '/course/page',
    params: {
      cardId: cardId,
      index: index
    },
  });
}

// 获取用户历史记录
export const getCourseHistoryAPI = async ( userId, courseId, cardId, pageId ) => {
  return httpInstance({
    url: '/studyHistory/add',
    method: 'POST',
    data: {
      userId,
      courseId,
      cardId,
      pageId
    }
  });
}

// 用户获取某卡片的学习进度
export const getCardHistoryAPI = async ( cardId ) => {
  return httpInstance({
    url: '/studyHistory/getHistory',
    params: {
      cardId
    }
  });
}

// 获取练习卡片里的页面
export const getQuestionAPI =(id) =>{
  return httpInstance({
    url: '/question',
    params: {
      id:id
    },
  })
}

// 提交题目
export const postQuestionAPI =async(questionId, language, code) =>{
  return httpInstance({
    method: 'post',
    url: '/question/questionSubmit/submit',
    data: {
      questionId,
      language,
      code
    },
  })
}

// 追踪获取一个提交记录的结果
export const getQuestionResultAPI =async(submitId) =>{
  return httpInstance({
    url: '/question/questionSubmit/get',
    params: {
      submitId: submitId
    }
  })
}

// 刷题中心问题列表
export const postQuestionListAPI = async(current, pageSize, title, tages) => {
  return httpInstance({
    method: 'post',
    url: '/question/list',
    data: {
      current, 
      pageSize, 
      title, 
      tages
    }
  })
}

// AI大模型智能纠错
export const postAiCorrectAPI = async(questionId, code, lang) => {
  return httpInstance({
    method: 'post',
    url: '/bigmodel/correction',
    data: {
      questionId, 
      code, 
      lang
    }
  })
}