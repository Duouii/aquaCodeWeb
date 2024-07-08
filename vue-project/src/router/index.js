import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Register from '@/views/Register/index.vue'
import FindPassword from '@/views/FindPassword/index.vue'
import Individual from '@/views/Individual/index.vue'
import Update from '@/views/Update/index.vue'
import CourseCenter from '@/views/CourseCenter/index.vue'
import ExerciseCenter from '@/views/ExerciseCenter/index.vue'
import Course from '@/views/Course/index.vue'
import DayCardStudy from '@/views/DayCardStudy/index.vue'
import DayCardExercise from '@/views/DayCardExercise/index.vue'

import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [{
        path: '',
        component: Individual
      },
      {
        path: '/user/update',
        component: Update
      },
      {
        path:'/course',
        component:CourseCenter
      },
      {
        path:'/exercise',
        component:ExerciseCenter
      },
      {
        path:'/course/:courseId',
        component:Course
      },
    ]
    },
    {
      path: '/user/login',
      component: Login
    },
    {
      path: '/user/register',
      component: Register
    },
    {
      path: '/user/findPassword',
      component: FindPassword
    },
    {
      path: '/course/page/:cardId',
      component: DayCardStudy
    },
    {
      path: '/dayCardExercise/:questionId',
      component: DayCardExercise
    },
  ]
})

/**
 * 前置守卫
 */

const whiteList = ['/user/login', '/user/register','/user/findpassword']
router.beforeEach((to, from, next) => {
  nProgress.start()
  if (getToken('TokenKey')) {
    if (whiteList.includes(to.path)) {
      // 跳转到主页
      next('/')
      nProgress.done()
    } else {
      next()
    }
  } else {
    // 没有token
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/user/login')
      nProgress.done()
    }
  }
})

/**
 * 后置守卫
 */

router.afterEach(() => {
  nProgress.done()
})

export default router

