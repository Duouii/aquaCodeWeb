<script setup>
import { onMounted, ref } from 'vue'
import { getStudyingCourseAPI } from '@/apis/user'

const customColors = [
  { color: '#5297FF' },
]
const studyingCourse = ref([])

const getStudyingCourse = async() => {
  const res = await getStudyingCourseAPI()
  studyingCourse.value = res
}
const getCourseTag = (courseTagsString) => {
  const courseTags = JSON.parse(courseTagsString);
  return courseTags;
};
const getuserProgress = (courseTotalProgress,userProgress)=>{
  const userProgressPersent = (userProgress/courseTotalProgress).toFixed(2)*100;
  return userProgressPersent;
}

onMounted(()=>getStudyingCourse())
</script>
<template>
  <div class="lesson">
    <div class="title">已学课程</div>
    <div class="icon-lesson"></div>
    <div class="container">
      <ul>
        <li v-for="item in studyingCourse" :key="item.courseId">
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
</template>

<style lang="scss" scoped>
::v-deep .el-rate{
  --el-rate-fill-color:#5297FF;
}
.lesson{
  position: relative;
  width: 597px;
  min-height: 659px;
  border-radius: 4px;
  background-color: #FFFFFF;
  .title{
    position: absolute;
    top: 20px;
    left: 38px;
    font-size: 20px;
    color: #414447;
  }
  .icon-lesson{
    position: absolute;
    left: 126px;
    top: 25px;
    width: 20px;
    height: 20px;
    background: url(../../../assets/icons/icon-lesson.png) no-repeat;
    background-size: 20px 20px;
  }
  .container{
    position: absolute;
    left: 38px;
    top: 68px;
    width: 524px;
    min-height: 500px;
    border-radius: 4px;
    background-color: #fff;
    ul{
      width: 556px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
    ul li{
      width: 254px;
      height: 326px;
      border-radius: 4px;
      margin-bottom: 16px;
      margin-right: 24px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      background-color: #fff;
      img{
        width: 254px;
        height: 197px;
        border-radius: 4px;
      }
      h3, .difficulty, .score, .progress{
        margin-left: 16px;
      } 
      h3{
        margin-top: 10px;
        font-size: 20px;
        color: #5297FF;
      }
      .difficulty,
      .subject{
        display: inline-block;
        margin-top: 4px;
        padding: 2px 12px;
        border-radius: 2px;
        background-color: #EDF4FF;
        font-size: 13px;
        color: #0146AF;
        text-align: center;
      }
      .subject{
        margin-left: 8px;
      }
      .score{
        margin-top: 4px;
        width: 53px;
        height: 15px;
      }
      .progress{
        margin-top: 19px;
        width: 222px;
        height: 16px;
      }
    }
  }
}
</style>