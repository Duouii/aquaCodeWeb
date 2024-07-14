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
  <Header>
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
  </Header>
</template>
<style lang="scss" scoped>
Header {
  position: fixed;
  width: 100vw;
  height: 78px;
  background-color: #fff;
  box-shadow: 0 0 10 10px rgba(0, 0, 0, 0.01);
  z-index: 999;
}
h4 {
  font-size: 16px;
  line-height: 78px;
  margin-right: 111px;
}
.name{
  margin-left: 69px;
  font-size: 24px;
  color: $titleColor;
  line-height: 78px;
  font-weight: 700;
}
.userAvatar{
  width: 40px;
  height: 40px;
  margin-top: 19px;
  border-radius: 40px;
  margin-right: 15px;
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
 
</style>