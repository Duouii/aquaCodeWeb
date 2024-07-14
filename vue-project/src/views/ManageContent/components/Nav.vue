<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
import {useUserStore} from '@/stores/userStore'
const userStore = useUserStore()
const userInfo = userStore.userInfo
const toIndividual = () => {
  router.push('/')
}
</script>

<template>
  <nav>
    <div class="center">
      <div class="name fl">Aqua code</div>
      <h4 class="fr">管理员</h4>
      <el-dropdown class="fr">
        <div class="userAvatar">
          <img v-if="userInfo.userAvatar" :src="userInfo.userAvatar" alt="">
          <div v-else class="nameFirst">{{ userInfo.userName?.charAt(0) }}</div>
        </div>
        <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="toIndividual">个人中心</el-dropdown-item>
          <el-dropdown-item @click="logout">退出账号</el-dropdown-item>
        </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </nav>
</template>
<style lang="scss" scoped>
nav{
  z-index: 99;
  position: fixed;
  width: 100vw;
  height: 78px;
  background-color: #fff;
}
.center{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 1302px;
  height: 78px;
  background-color: #fff;
  .name{
    font-size: 24px;
    color: $titleColor;
    line-height: 78px;
    font-weight: 700;
  }
  h4 {
    font-size: 16px;
    line-height: 78px;
    margin-right: 50px;
  }
  .userAvatar{
    width: 40px;
    height: 40px;
    margin-top: 19px;
    margin-right: 15px;
    border-radius: 40px;
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
}
  
  
</style>