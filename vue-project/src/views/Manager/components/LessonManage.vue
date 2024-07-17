<script setup>
import {ref,onMounted} from 'vue'
import difficultIcon from '@/assets/icons/icon-difficult.png'
import normalIcon from '@/assets/icons/icon-normal.png'
import easyIcon from '@/assets/icons/icon-easy.png'
import { getCourseCardAPI } from '@/apis/lesson.js';
import { delCourseAPI, postCourseAPI } from '@/apis/admin.js'
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
const addLesson = () => {
  router.push('/manageContent/addLesson')
}
const courseCard = ref([]);
const getCourseCard = async () => {
  const res = await postCourseAPI(1,50,null,null,null,null)
  courseCard.value = res.records;
};
const getCourseTag = (courseTagsString) => {
  const courseTags = JSON.parse(courseTagsString);
  return courseTags;
};
const getuserProgress = (courseTotalProgress,userProgress)=>{
  const userProgressPersent = (userProgress/courseTotalProgress).toFixed(2)*100;
  return userProgressPersent;
}
const deleteLesson = (id) => {
  ElMessageBox.confirm(
    '确认删除吗？',
    'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    ElMessage({
      type: 'success',
      message: '已删除'
    })
    // 删除逻辑
    delCourseAPI(id).then(() => {
      window.location.reload();
    });
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已删除'
    })
  })
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
            <el-dropdown-item @click="addLesson">添加课程</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- <div class="search">
        <div class="icon-search fl"></div>
        <input v-model="userSearch" class="fl" type="text" placeholder="请输入你要找的题目/题目ID">
      </div> -->
    </div>
    <el-scrollbar height="550px">
      <ul class="contain">
        <li v-for="item in courseCard" :key="item.courseId">
          <img :src="item.courseCover">
          <h3>{{item.courseName}}</h3>
          <div class="difficulty" v-if="getCourseTag(item.courseTags)">{{ getCourseTag(item.courseTags)[0]}}</div>
          <div class="subject"  v-if="getCourseTag(item.courseTags)">{{ getCourseTag(item.courseTags)[1]}}</div>
          <div class="score">
            <el-rate v-model="item.courseDifficulty" :max="3" disabled/>
            </div>
          <RouterLink :to="`/manageContent/modifyLesson/${item.courseId}`"><div class="modify">修改</div></RouterLink>
          <div class="delete" @click="deleteLesson(item.courseId)">删除</div>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>
<style lang="scss" scoped>
::v-deep .el-rate {
  --el-rate-fill-color: #5297ff;
}
.background {
  width: 100%;
  border-radius: 4px;
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
.contain {
  width: 100%;
  padding-left: 49px;
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
    .subject,.modify,.delete {
      display: inline-block;
      margin-top: 4px;
      padding: 2px 12px;
      border-radius: 2px;
      background-color: #EDF4FF;
      font-size: 13px;
      color: #0146AF;
      text-align: center;
      cursor: pointer;
    }
    .difficulty {
      margin-left: 16px;
    }
    .subject {
      margin-left: 8px;
    }
    .score {
      margin-left: 16px;
      margin-top: 12px;
      width: 53px;
      height: 15px;
    }
    .modify,.delete {
      padding: 2px 16px;
      line-height: 25px;
    }
    .modify {
      margin-left: 123px;
      background-color: #DDFFF5;
      color: #17D199;
    }
    .delete {
      margin-left: 11px;
      background-color: #FFD8D8;
      color: #FF1313;
    }
  }
}
</style>