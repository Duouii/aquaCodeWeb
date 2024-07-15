<script setup>
import { onMounted, ref, resolveComponent } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { getCoursePageContainAPI, getCourseHistoryAPI } from "@/apis/lesson.js";
import { useUserStore } from '@/stores/userStore';
const userStore = useUserStore();
const userInfo = userStore.userInfo
const router = useRouter();
const route = useRoute();
const returnPage = () => {
  router.go(-1);
};
//差一个结束的标志
const index = ref(1);
const coursePage = ref({});
const getCoursePage = async () => {
  const res = await getCoursePageContainAPI(route.params.cardId, index.value)
  coursePage.value = res;
};
const courseHistory = ref();
const getCourseHistory = async () => {
  const res = await getCourseHistoryAPI(userInfo.userId,route.params.courseId,route.params.cardId,index.value);
  courseHistory.value = res;
};
const indexMax = 6
const percent = 244/5
let widthT = ref((index.value-1)*percent)
let widthB = ref(244-widthT.value)

const nextPage = async () => {
  if(index.value == indexMax) {
    alert('当前已是最后一页')
    return
  }
  if(index.value <= indexMax) {
    index.value += 1;
    if(widthT.value==(indexMax-1)*percent){
      widthB.value = 0
    }
    widthT.value+=percent
    widthB.value-=percent
    const res = await getCoursePageContainAPI(route.params.cardId, index.value);
    coursePage.value = res;
    const response = await getCourseHistoryAPI(userInfo.userId,route.params.courseId,route.params.cardId,index.value);
    courseHistory.value = response
  }
};
onMounted(async() => {
  await getCoursePage();
  await getCourseHistory();
});
</script>

<template>
  <div class="contain">
    <div class="card-container">
      <div class="return">
        <el-button plain @click="returnPage">
          <img src="../../assets/icons/Vector 202.png" alt=""/>
        </el-button>
      </div>
      <div class="test">
        <el-progress :percentage="100" :show-text="false" :style="{width: widthT+'px'}" />
        <el-progress :percentage="100" :show-text="false" :style="{width: widthB+'px'}"/>
      </div>
      <div class="title">{{ coursePage.pageContent }}</div>
      <ul class="left-bottom">
        <a href=""><li><div class="icon-feedback"></div>反馈</li></a>
        <a href=""><li><div class="icon-note"></div>记笔记</li></a>
      </ul>
      <div class="continute">
        <el-button plain size="large" @click="nextPage">继续</el-button>
      </div>
    </div> 
  </div>
</template>

<style lang="scss" scoped>
.contain {
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  background: url(../../assets/images/course.png) no-repeat;
  background-size: cover;
  background-attachment: fixed;
  .card-container{
    width: 1400px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
.return .el-button {
  position: absolute;
  left: 64px;
  top: 32px;
  width: 46px;
  height: 46px;
  border-radius: 46px;
  background-color: #fff;
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
  color: $titleColor;
  text-align: center;
  line-height: 70px;
}
.test {
  position: absolute;
  top: 310px;
  left: -40px;
  width: 250px;
  height: 10px;
  transform: rotate(90deg);
  overflow: hidden;
}
.test .el-progress {
  float: left;
  transform: rotate(0deg);
  ::v-deep .el-progress-bar__outer {
    height: 10px !important;
  }
}
.test .el-progress:nth-child(1) {
  // width: 62px;
  ::v-deep .el-progress-bar__inner {
    background-color: #20f9b8;
  }
}
.test .el-progress:nth-child(2) {
  float: left;
  // width: 60px;
  margin-left: 6px;
  ::v-deep .el-progress-bar__inner {
    background-color: #C0D9FF;
  }
}
.left-bottom {
  position: absolute;
  top: 666px;
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
  left: 50%;
  transform: translateX(-50%);
  top: 654px;
  width: 212px;
  height: 52px;
  border-radius: 8px;
  background-color: $blueXColor;
  color: #fff;
}
</style>
