<script setup>
import { onMounted, ref } from 'vue'
import { getStudyingCourseAPI } from '@/apis/user'

const customColors = [
  { color: '#FFAD0E' },
]
const studyingCourse = ref([])

const getStudyingCourse = async() => {
    const res = await getStudyingCourseAPI()
    studyingCourse.value = res
}
const getCourseTag = (courseTagsString) => {
  try {
    const courseTags = JSON.parse(courseTagsString);
    return courseTags;
  } catch (error) {
    console.error("Error parsing courseTags: ", error);
    return [];
  }
};
const getuserProgress = (courseTotalProgress,userProgress)=>{
    try{
        const userProgressPersent = userProgress/courseTotalProgress;
        return userProgressPersent;
    }catch (error) {
        console.error("Error parsing courseTags: ", error);
        return "";
  }
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
  --el-rate-fill-color:#FFC24B;
}
.lesson{
  position: relative;
  width: 597px;
  min-height: 800px;
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
    height: 668px;
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
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
      img{
        width: 254px;
        height: 197px;
      }
      h3, .difficulty, .score, .progress{
        margin-left: 16px;
      } 
      h3{
        margin-top: 10px;
        font-size: 20px;
        color: #BA5004;
      }
      .difficulty,
      .subject{
        display: inline-block;
        margin-top: 4px;
        height: 20px;
        border-radius: 2px;
        background-color: #FFF2E4;
        font-size: 13px;
        color: #FFAD0E;
        text-align: center;
      }
      .difficulty{
        width: 50px;
      }
      .subject{
        margin-left: 8px;
        width: 63px;
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