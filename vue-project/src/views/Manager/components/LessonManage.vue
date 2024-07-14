<script setup>
import {ref,onMounted} from 'vue'
import difficultIcon from '@/assets/icons/icon-difficult.png'
import normalIcon from '@/assets/icons/icon-normal.png'
import easyIcon from '@/assets/icons/icon-easy.png'
import {getCourseCardAPI} from '@/apis/lesson.js';
import { useRouter } from "vue-router";
const router = useRouter();
const value = ref('')
const options = [
  {
    value: 'easy',
    label: '简单',
    icon: easyIcon
  },
  {
    value: 'normal',
    label: '普通',
    icon: normalIcon
  },
  {
    value: 'difficult',
    label: '困难',
    icon: difficultIcon
  }
]
const addQuestion = () => {
  router.push('/manageContent/addQuestion')
}
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
onMounted(()=>getCourseCard())
</script>
<template>
  <div class="background">
    <div class="header">
      <el-dropdown>
        <el-button type="primary">+</el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="addQuestion">添加课程</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div class="search">
        <div class="icon-search fl"></div>
        <input class="fl" type="text" placeholder="请输入你要找的题目/题目ID">
      </div>
    </div>
    <ul class="contain">
      <li v-for="item in courseCard" :key="item.courseId">
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
      </li>
      <li v-for="item in courseCard" :key="item.courseId">
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
      </li>
      <li v-for="item in courseCard" :key="item.courseId">
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
      </li>
      <li v-for="item in courseCard" :key="item.courseId">
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
      </li>
      <li v-for="item in courseCard" :key="item.courseId">
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
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.background {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.header {
  width: 100%;
  height: 88px;
}
.el-dropdown {
  float: right;
  margin-right: 39px;
  margin-top: 29px;
}
.el-button {
  width: 30px;
  height: 30px;
  border-radius: 30px !important;
  font-size: 30px;
  color: #fff;
}
.search{
  float: right;
  width: 612px;
  height: 40px;
  border-radius: 4px;
  margin-right: 29px;
  margin-top: 24px;
  background-color: #F4F5F5;
  .icon-search{
    width: 24px;
    height: 24px;
    background: url(../../../assets/icons/icon-search.png) no-repeat;
    background-size: 24px 24px;
    margin-left: 10px;
    margin-top: 8px;
  }
  input{
    font-size: 14px;
    color: #7D7F81;
    margin-left: 10px;
    width: 560px;
    height: 40px;
    background-color: transparent;
  }
}
.contain {
  width: 100%;
  // height: 400px;
  padding-left: 49px;
  background-color: skyblue;
  display: flex;
  flex-wrap: wrap;
  li {
    width: 254px;
    height: 326px;
    border-radius: 4px;
    margin-bottom: 16px;
    margin-right: 20px;
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