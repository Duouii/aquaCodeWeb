<script setup>
import { ref,onMounted } from 'vue'
import difficultIcon from '@/assets/icons/icon-difficult.png'
import normalIcon from '@/assets/icons/icon-normal.png'
import easyIcon from '@/assets/icons/icon-easy.png'
// import { toScore } from '@/components/score.js'
import {getCourseCardContainAPI,getCourseCardAPI} from '@/apis/lesson.js';
import {useRoute} from 'vue-router'
const route = useRoute()

const customColors = [
  { color: '#5297FF' },
]
const activeTab = ref('study');
const selectTab = (tab) => {
  activeTab.value = tab
}

const courseCard = ref([])
const courseCardContain = ref([])

const getCourseCard = async()=>{
  const res = await getCourseCardAPI()
  courseCard.value = res
  return courseCard.value;
}
const getuserProgress = (courseTotalProgress,userProgress)=>{
  const userProgressPersent = (userProgress/courseTotalProgress).toFixed(2)*100;
  return userProgressPersent;
}
let cardListLesson=[];
let cardListLessonLock=[];
let cardListPractice=[];

async function getCourseCardContain(courseCardValue) {
  if(courseCardValue && courseCardValue.length > 0){
    const res = await getCourseCardContainAPI(route.params.courseId);
    courseCardContain.value = res;
    courseCardContain.value.cardList.forEach(item=>{
      if(item.cardType === 'lesson'){
        if(item.status == 0){
          cardListLessonLock.push(item)
        } else {
          cardListLesson.push(item);
        }
      }
      else if(item.cardType === 'practice'){
        // const score = toScore(item.difficulty)
        cardListPractice.push(item);
      }
    });
  }
}
onMounted(async () => {
  const courseCardValue = await getCourseCard();
  await getCourseCardContain(courseCardValue);
});
</script>

<template>
  <div class="background">
    <div class="course-container">
      <div class="courseName">{{courseCardContain.courseName}}</div>
      <div class="model">
        <h4>模式</h4>
        <div class="btn study-btn" :class="{active:activeTab === 'study'}" @click="selectTab('study')">学习</div>
        <div class="btn exercise-btn" :class="{active:activeTab === 'exercise'}" @click="selectTab('exercise')">练习</div>
      </div>
      <div class="progress">
        <h4>学习进度</h4>
        <div class="showProgress">
          <el-progress 
          :text-inside="true" 
          :stroke-width="20" 
          :percentage="getuserProgress(courseCardContain.courseTotalProgress,courseCardContain.userProgress)"
          :color="customColors"
          />
        </div>
      </div>
      <div class="contain study-contain" v-if="activeTab === 'study'">
        <ul>
          <li class="li">
            <!-- <h3>Day1</h3> -->
            <ul class="dayContain">
              <li v-for="item in cardListLesson"  :key="item.cardId">
                <RouterLink :to="`/course/${courseCardContain.courseId}/page/${item.total}/${item.cardId}`">
                  <div class="point"></div>
                  <div class="dayList">{{item.cardTitle}}</div>
                </RouterLink>
              </li>
              <li v-for="item in cardListLessonLock" :key="item.cardId">
                <div class="point point-lock"></div>
                <div class="dayList dayList-lock">{{ item.cardTitle }}</div>
                <div class="icon-lock"></div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="contain exercise-contain" v-if="activeTab === 'exercise'">
        <ul>
          <li class="li">
            <!-- <h3>Day1</h3> -->
            <ul class="dayContain">
              <li v-for="item in cardListPractice" :key="item.questionId">
                <RouterLink v-if="item.cardType === 'practice'" :to="`/dayCardExercise/${item.questionId}`">
                  <div class="point"></div>
                  <h6>{{item.questionId}}</h6>
                  <span>{{item.cardTitle}}</span>
                  <div class="score">
                    <img v-if="item.difficulty === 'easy'" :src="easyIcon" alt="">
                    <img v-if="item.difficulty === 'normal'" :src="normalIcon" alt="">
                    <img v-if="item.difficulty === 'difficult'" :src="difficultIcon" alt="">
                    </div>
                  <div class="status">已通过</div>
                </RouterLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
::v-deep .el-rate .el-rate__icon{
  font-size: 19.5px;
}
::v-deep .el-rate{
  --el-rate-fill-color:#34ECB5;
}
.background{
  position: relative;
  display: flex;
  width: 100%;
  background: url(../../assets/images/course.png) no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
.course-container{
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 982px;
  height: 1092px;
  margin-top: 125px;
}
.courseName{
  font-size: 24px;
}
h4{
  font-size: 20px;
  margin-top: 8px;
  margin-left: 24px;
}
.model{
  position: absolute;
  margin-top: 9px;
  width: 322px;
  height: 112px;
  border-radius: 8px;
  background-color: #FFFFFF;
  .btn{
    position: absolute;
    top: 50px;
    float: left;
    width: 133px;
    height: 40px;
    border-radius: 12px;
    text-align: center;
    line-height: 40px;
    background-color: #E5E5E7;
  }
  .btn.active{
    color: $blueColor;
    border: 1px $blueColor solid;
    background-color: #FFFFFF;
  }
  .study-btn{
    left: 24px;
  }
  .exercise-btn{
    left: 165px;
  }
}
.progress{
  position: absolute;
  margin-top: 9px;
  left: 350px;
  width: 632px;
  height: 112px;
  border-radius: 8px;
  background-color: #FFFFFF;
  .showProgress{
    padding: 24px;
  }
}
.contain{
  position: absolute;
  top: 190px;
  width: 873px;
  height: 500px;
}
.study-contain{
  // h3{
  //   font-size: 24px;
  //   color: $blueXColor;
  // }
  .dayContain{
    width: 873px;
    margin-top: 2px;
    margin-bottom: 22px;
    li{
      width: 873px;
      height: 58px;
      margin-bottom: 14px;
      .point{
        position: absolute;
        left: 20px;
        width: 9px;
        height: 9px;
        margin-top: 24px;
        border-radius: 9px;
        background-color: $blueColor;
      }
      .dayList{
        position: absolute;
        left: 75px;
        width: 797px;
        height: 58px;
        border-radius: 8px;
        padding-left: 35px;
        font-size: 20px;
        line-height: 58px;
        background-color: #FFFFFF;
      }
      .dayList:hover{
        color: #FFFFFF;
        background-color: $blueColor;
      }
      .point-lock {
        background-color: #D9D9D9 !important;
      }
      .dayList-lock {
        color: #7D7F81 !important;
        background-color: #D9D9D9 !important;
      }
      .icon-lock{
        position: absolute;
        left: 833px;
        width: 21px;
        height: 21px;
        margin-top: 18px;
        background: url(../../assets/icons/icon-lock.png) no-repeat;
        background-size: 21px 21px;
      }
    }
  }
}
.li{
  margin-bottom: 36px;
}
.exercise-contain{
  // h3{
  //   font-size: 24px;
  //   color: #20BE8F;
  // }
  .dayContain{
    width: 930px;
    margin-top: 20px;
    li,a{
      width: 930px;
      height: 58px;
      border-radius: 8px;
      margin-bottom: 14px;
      background-color: #FFFFFF;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .point{
        margin-left: 36px;
        margin-top: 26px;
        width: 6px;
        height: 6px;
        border-radius: 6px;
        background-color: #34ECB5;
      }
      h6{
        font-size: 20px;
        margin-left: 4px;
        margin-top: 14px;
      }
      span{
        display: inline-block;
        width: 150px;
        font-size: 20px;
        margin-left: 24px;
        margin-top: 14px;
      }
      .score{
        width: 64.5px;
        height: 19.5px;
        margin-left: 66px;
        margin-top: 19px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .status{
        margin-left: 500.5px;
        margin-top: 14px;
        font-size: 20px;
        color: $greenColor;
      }
    }
  }
}
</style>