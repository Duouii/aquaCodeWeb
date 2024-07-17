<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import {useUserStore} from '@/stores/userStore'
import { getUserInfoAPI } from '@/apis/user';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
const userStore = useUserStore()
const userInfo = userStore.userInfo
const router = useRouter()

async function getUserInfo() {
  const res = await getUserInfoAPI();
  userInfo.value = res;
}

const logout = () => {
  ElMessageBox.confirm(
    '确认退出吗？',
    'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '已退出，请重新登录',
      })
      userStore.clearUserInfo()
      router.push('/user/login')
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消',
      })
    })
}
const toIndividual = () => {
  router.push('/')
}
const manage = () => {
  router.push('/manage')
}
onMounted(()=>getUserInfo())
</script>

<template>
  <nav>
    <div class="center">
      <div class="logo fl"><img src="../../assets/images/logo.png" alt=""></div>
      <div class="name fl">Aqua code</div>
      <ul class="toNav fl">
        <li class="fl"><RouterLink active-class="active" to="/course">学习中心</RouterLink></li>
        <li class="fl"><RouterLink active-class="active" to="/exercise">刷题中心</RouterLink></li>
      </ul>
      <el-dropdown class="fr">
        <div class="userAvatar">
          <img v-if="userInfo.userAvatar" :src="userInfo.userAvatar" alt="">
          <div v-else class="nameFirst">{{ userInfo.userName?.charAt(0) }}</div>
        </div>
        <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-if="userInfo.userRole === 'admin'" @click="manage">管理系统</el-dropdown-item>
          <el-dropdown-item @click="logout">退出账号</el-dropdown-item>
        </el-dropdown-menu>
        </template>
      </el-dropdown>
      <h3 class="fr" @click="toIndividual">个人主页</h3>
      <!-- <div class="search fr">
        <div class="icon-search fl"></div>
        <input class="fl" type="text" placeholder="输入你想搜索的">
      </div> -->
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav{
  z-index: 99;
  position: fixed;
  width: 100vw;
  height: 78px;
  background-color: #FFFFFF;
}
.center{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 1110px;
  height: 78px;
  background-color: #FFFFFF;
  .logo {
    width: 36px;
    height: 36px;
    margin-top: 22px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .name{
    font-size: 24px;
    color: $titleColor;
    line-height: 78px;
    font-weight: 700;
    margin-left: 17px;
  }
  .toNav{
    width: 300px;
    height: 30px;
    margin-left: 33px;
    margin-top: 24px;
    li a{
      width: 80px;
      height: 30px;
      margin-left: 56px;
      line-height: 30px;
      font-size: 20px;
      color: #7D7F81;
    }
    .active{
      font-size: 24px;
      color: $titleColor;
    }
  }
  h3{
    line-height: 78px;
    font-size: 16px;
    margin-right: 16px;
    cursor: default;
  }
  .userAvatar{
    width: 40px;
    height: 40px;
    margin-top: 19px;
    border-radius: 40px;
    overflow: hidden;
    .nameFirst {
      width: 100%;
      height: 100%;
      border-radius: 40px;
      line-height: 40px;
      text-align: center;
      background-color: #deeafa;
      color: $blueColor;
      font-size: 25px;
    }
  }
  // .search{
  //   width: 212px;
  //   height: 44px;
  //   margin-top: 17px;
  //   margin-right: 45px;
  //   border-radius: 24px;
  //   background-color: #F4F5F5;
  //   .icon-search{
  //     width: 24px;
  //     height: 24px;
  //     background: url(../../assets/icons/icon-search.png) no-repeat;
  //     background-size: 24px 24px;
  //     margin-left: 10px;
  //     margin-top: 10px;
  //   }
  //   input{
  //     margin-left: 6px;
  //     margin-top: 12px;
  //     font-size: 14px;
  //     color: #7D7F81;
  //     width: 150px;
  //     height: 20px;
  //     background-color: transparent;
  //   }
  // }
}

</style>