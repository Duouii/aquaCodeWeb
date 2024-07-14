<script setup>
import { onMounted,ref } from 'vue'
import {getCourseCardAPI} from '@/apis/lesson.js';
import { useRouter } from 'vue-router';
import { useRoute } from "vue-router";
const router = useRouter()
const route = useRoute();

const courseCard = ref([]);
const getCourseCard = async () => {
  const res = await getCourseCardAPI();
  courseCard.value = res;
};
const getCourseTag = (courseTagsString) => {
  const courseTags = JSON.parse(courseTagsString);
  return courseTags;
};
const getuserProgress = (courseTotalProgress,userProgress)=>{
  const userProgressPersent = userProgress/courseTotalProgress;
  return userProgressPersent;
}
const returnPage = ()=>{
  router.push({ path: "/" });
}
const courseRouter = route.params.courseId
onMounted(()=>getCourseCard())
</script>

<template>
  <div class="background">
    <div class="lesson-container">
      <div class="return-btn"><el-button class="return" plain @click="returnPage"><img src="../../assets/icons/Vector 202.png" alt=""></el-button></div>
        <div class="icon-language-lesson"></div>
        <div class="title">编程语言课程</div>
        <div class="container">
          <ul>
            <li v-for="item in courseCard" :key="item.courseId">
              <RouterLink :to="`/course/${item.courseId}`">
                <img :src="item.courseCover">
                <h3>{{item.courseName}}</h3>
                <div class="difficulty" v-if="getCourseTag(item.courseTags)">{{ getCourseTag(item.courseTags)[0]}}</div>
                <div class="subject"  v-if="getCourseTag(item.courseTags)">{{ getCourseTag(item.courseTags)[1]}}</div>
                <div class="score"><el-rate v-model="item.courseDifficulty" :max="3" disabled/></div>
                <div class="progress">
                  <el-progress 
                  :text-inside="true" 
                  :stroke-width="16" 
                  :percentage="getuserProgress(item.courseTotalProgress,item.userProgress)"
                  :color="customColors"
                  class="text-left"
                  />
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
::v-deep .el-rate {
  --el-rate-fill-color: $blueColor;
}
.background{
  position: relative;
  display: flex;
  width: 100%;
  background: url(../../assets/images/center.png) no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
.return-btn .el-button{
  position: absolute;
  left: -119px;
  width: 46px;
  height: 46px;
  border-radius: 46px;
  background-color: #fff;
  img{
    width: 5.83px;
    height: 11.67px;
  }
}
.lesson-container {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 982px;
  height: 1092px;
  margin-top: 125px;
  border-radius: 4px;
  background-color: #ffffff;
  .icon-language-lesson {
    position: absolute;
    left: 86px;
    top: 49px;
    width: 23.1px;
    height: 23.1px;
    background: url(../../assets/icons/icon-language-lesson.png) no-repeat;
    background-size: 23.1px 23.1px;
  }
  .title {
    position: absolute;
    top: 46px;
    left: 117px;
    font-size: 20px;
    color: #414447;
  }
}
.container {
  position: absolute;
  top: 93px;
  left: 86px;
  width: 810px;
  ul {
    width: 834px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  ul li {
    width: 254px;
    height: 326px;
    border-radius: 4px;
    margin-bottom: 16px;
    margin-right: 24px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    img {
      width: 254px;
      height: 197px;
      border-radius: 4px;
    }
    h3 {
      margin-left: 16px;
      margin-top: 10px;
      font-size: 20px;
      color: #10428D;
    }
    .difficulty,
    .subject {
      display: inline-block;
      margin-top: 4px;
      height: 20px;
      border-radius: 2px;
      background-color: #EDF4FF;
      font-size: 13px;
      color: #0146AF;
      text-align: center;
    }
    .difficulty {
      margin-left: 16px;
      width: 50px;
    }
    .subject {
      margin-left: 8px;
      width: 63px;
    }
    .score {
      margin-left: 16px;
      margin-top: 4px;
      width: 53px;
      height: 15px;
    }
    .progress {
      margin-left: 16px;
      margin-top: 19px;
      width: 222px;
      height: 16px;
    }
  }
}
</style>