import httpInstance from "@/utils/http";

export const getCourseCardAPI = async() => {
  return httpInstance({
    method: 'get',
    url: '/course/listCourses'
  });
}

export const getCourseCardContainAPI = (courseId) => {
  return httpInstance({
    method: 'get',
    url: `/course/${courseId}`,
    params:{
      courseId
    }
  });
}

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

// 从卡片进入练习
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

