<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { getCoursePageContainAPI } from "@/apis/lesson.js";
// import { getCoursePageContainAPI, getCourseHistoryAPI } from "@/apis/lesson.js";
// import { useUserStore } from "@/stores/userStore";
const router = useRouter();
const route = useRoute();
// const userInfo = useUserStore().userInfo;
const returnPage = () => {
  if (window.history.length <= 1) {
    router.push({ path: "/system/storageManagement" });
    console.log(1);
    return false;
  } else {
    router.go(-1);
  }
};
//差一个结束的标志
const index = ref(1);
const coursePage = ref({});
const getCoursePage = async () => {
  const res = await getCoursePageContainAPI(route.params.cardId, index.value)
  coursePage.value = res;
};
// const courseHistory = ref(index);
// const getCourseHistory = async () => {
//   const res = await getCourseHistoryAPI({
//     userId: userInfo.userId,
//     //补上
//     courseId: 1,
//     cardId: route.params.cardId,
//     pageId: index.value,
//   });
//   courseHistory.value = res;
// };

const nextPage = async () => {
  index.value += 1;
  //拿到用户进入的cardId
  const res = await getCoursePageContainAPI(
    route.params.cardId,
    index.value
  );
  coursePage.value = res;
  // const response = await getCourseHistoryAPI({
  //   userId: userInfo.userId,
  //   //补上
  //   courseId: 1,
  //   cardId: route.params.cardId,
  //   pageId: index.value,
  // });
  // courseHistory.value = response;
};

onMounted(() => {
  getCoursePage();
  // getCourseHistory();
});
</script>

<template>
  <div class="contain">
    <div class="return">
      <el-button plain @click="returnPage"
        ><img src="../../assets/icons/Vector 202.png" alt=""
      /></el-button>
    </div>
    <div class="title">{{ coursePage.pageContent }}</div>
    <el-progress :percentage="50" :show-text="false" />
    <ul class="left-bottom">
      <a href=""
        ><li>
          <div class="icon-feedback"></div>
          反馈
        </li></a
      >
      <a href=""
        ><li>
          <div class="icon-note"></div>
          记笔记
        </li></a
      >
    </ul>
    <div class="continute">
      <el-button plain size="large" @click="nextPage">继续</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.contain {
  position: relative;
  width: 1440px;
  height: 820px;
  background: url(../../assets/images/course.png) no-repeat;
  background-size: 1440px 820px;
}
.return .el-button {
  position: absolute;
  left: 64px;
  top: 32px;
  width: 46px;
  height: 46px;
  border-radius: 46px;
  img {
    width: 5.83px;
    height: 11.67px;
  }
}
.title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 71px;
  padding-left: 66px;
  padding-right: 66px;
  height: 70px;
  border-radius: 46px;
  background-color: #d8e8ff;
  font-size: 26px;
  color: #0059dd;
  text-align: center;
  line-height: 70px;
}
.el-progress {
  position: absolute;
  top: 400px;
  left: -40px;
  width: 244px;
  transform: rotate(90deg);
  ::v-deep .el-progress-bar__outer {
    height: 10px !important;
  }
  ::v-deep .el-progress-bar__inner {
    background-color: #20f9b8;
  }
}
.left-bottom {
  position: absolute;
  top: 746px;
  left: 80px;
  width: 205px;
  height: 40px;
  li {
    float: left;
  }
  .icon-feedback {
    float: left;
    width: 40px;
    height: 40px;
    background: url(../../assets/icons/icon-feedback.png) no-repeat;
    background-size: 40px 40px;
  }
  font-size: 16px;
  line-height: 40px;
  .icon-note {
    float: left;
    margin-left: 33px;
    width: 40px;
    height: 40px;
    background: url(../../assets/icons/icon-note.png) no-repeat;
    background-size: 40px 40px;
  }
}
.continute .el-button {
  position: absolute;
  left: 614px;
  top: 734px;
  width: 212px;
  height: 52px;
  border-radius: 8px;
  background-color: #267dff;
  color: #fff;
}
</style>
