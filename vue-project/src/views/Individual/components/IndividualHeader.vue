<script setup>
import { getUserInfoAPI } from '@/apis/user';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
const userStore = useUserStore();
const userInfo = userStore.userInfo
const router = useRouter()

const getUserInfo=async()=> {
  const res = await getUserInfoAPI();
  userInfo.value = res;
}

const user =  JSON.parse(localStorage.getItem('user'))
console.log(user);
// console.log(user.userInfo.value.userStudiedCourses);
console.log(user.userInfo);
const toUpdate = () => {
  router.push('/user/update');
}
onMounted(() => getUserInfo());
</script>
<template>
  <div class="header">
    <div class="userAvatar">
      <img v-if="userInfo.userAvatar" :src="userInfo.userAvatar" alt="">
      <div v-else class="nameFirst">{{ userInfo.userName?.charAt(0) }}</div>
    </div>
    <div class="showUsername">
      <span>{{userInfo.userName}}</span>
    </div>
    <div class="icon-update" @click="toUpdate"></div>
    <div class="showUserProfile">
      <span>{{ userInfo.userProfile }}</span>
    </div>
    <div class="record">
      <ul class="fr">
        <li class="fl">
          <span>已学课程</span>
          <h3>{{ user.userInfo.userStudiedCourses}}</h3>
        </li>
        <li class="fl">
          <span>已刷题</span>
          <h3>{{ user.userInfo.value.userAcceptedQuestions }}</h3>
        </li>
        <li class="fl">
          <span>学习时长</span>
          <h3>{{ user.userInfo.value.userStudyTime }}</h3>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header{
  position: relative;
  height: 131px;
  margin-top: 130px;
  border-radius: 4px;
  background-color: #FFFFFF;
  .userAvatar{
    position: absolute;
    left: 55px;
    top: -37px;
    width: 75px;
    height: 75px;
    border-radius: 75px;
    .nameFirst{
      width: 100%;
      height: 100%;
      border-radius: 75px;
      text-align: center;
      background-color: #deeafa;
      color: $blueColor;
      font-size: 50px;
    }
  }
  .showUsername{
    margin-left: 139px;
    margin-top: 26px;
    float: left;
    height: 36px;
    font-size: 24px;
    color: #000000;
    font-weight: 700;
  }
  .icon-update{
    margin-left: 12px;
    margin-top: 32px;
    float: left;
    width: 21px;
    height: 21px;
    background: url(../../../assets/icons/icon-update.png) no-repeat;
    background-size: 21px 21px;
  }
  .showUserProfile{
    position: absolute;
    left: 139px;
    top: 66px;
    height: 21px;
    font-size: 14px;
    color: #7D7F81
  }
  .record{
    ul{
      margin-right: 25px;
      li{
        text-align: center;
        margin-top: 28px;
        width: 70px;
        height: 79px;
        margin-left: 64px;
        span{
          font-size: 16px;
          color: #414447;
        }
        h3{
          margin-top: 18px;
          font-size: 24px;
          font-weight: 700;
          color: #267DFF;
        }
      }
    }
  }
}

</style>