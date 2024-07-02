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

export const getCourseHistoryAPI = async ({ userId, courseId, cardId, pageId }) => {
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

