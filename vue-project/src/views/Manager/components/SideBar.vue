<script setup>
  import {ref} from 'vue'
  import { useRouter } from "vue-router";
  const router = useRouter();
  let tab = ref(localStorage.getItem('selectedTab') || 'question')
  const questionManage = () => {
    tab.value = 'question'
    localStorage.setItem('selectedTab', 'question');
    router.push('/manage')
  }
  const userManage = () => {
    tab.value = 'user'
    localStorage.setItem('selectedTab', 'user');
    router.push('/manage/userManage')
  }
  const lessonManage = () => {
    tab.value = 'lesson'
    localStorage.setItem('selectedTab', 'lesson');
    router.push('/manage/lessonManage')
  }
</script>
<template>
  <div class="sideBar">
    <ul>
      <li @click="questionManage" :style="{ backgroundColor: tab === 'question' ? '#E3EEFF' : '#fff' }">
        <img src="../../../assets/icons/icon-question-manage.png" alt="">
        <span>题目管理</span>
      </li>
      <li @click="userManage" :style="{ backgroundColor: tab === 'user' ? '#E3EEFF' : '#fff' }">
        <img src="../../../assets/icons/icon-user-manage.png" alt="">
        <span>用户管理</span>
      </li>
      <li @click="lessonManage" :style="{ backgroundColor: tab === 'lesson' ? '#E3EEFF' : '#fff' }">
        <img src="../../../assets/icons/icon-lesson-manage.png" alt="">
        <span>课程管理</span>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.sideBar {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
ul {
  width: 100%;
  padding-top: 24px;
  li {
    position: relative;
    width: 100%;
    height: 58px;
    img {
      width: 24px;
      height: 24px;
      margin-left: 34px;
      margin-top: 15px;
      background-size: 24px 24px;
    }
    span {
      position: absolute;
      top: 15px;
      font-size: 16px;
      margin-left: 11px;
    }
  }
  li:hover {
    background-color: #E3EEFF;
  }
  // li.active {
  //   background-color: #E3EEFF;
  // }
}
</style>