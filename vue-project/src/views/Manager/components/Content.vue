<script setup>
import {onMounted, ref} from 'vue'
import { postQuestionAPI, delQuestionAPI } from '@/apis/admin.js'
import difficultIcon from '@/assets/icons/icon-difficult.png'
import normalIcon from '@/assets/icons/icon-normal.png'
import easyIcon from '@/assets/icons/icon-easy.png'
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { toScore } from '@/components/score.js'
import { ElMessage, ElMessageBox } from 'element-plus'
const userStore = useUserStore()
const userInfo = userStore.userInfo;
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
const question = ref([])
const score = ref()
const postQuestion =  async() => {
  const res = await postQuestionAPI(1, 19, " ", null, null)
  question.value = res.records
  question.value = res.records.map(item => {
    const score = toScore(item.questionDifficulty)
    return { ...item, score }
  })
}
const getquestionTag = (questionTagsString) => {
  const questionTags = JSON.parse(questionTagsString);
  return questionTags;
};
const deleteQuestion = (id) => {
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
    delQuestionAPI(id).then(() => {
      window.location.reload();
    });
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已删除'
    })
  })
}
onMounted(() => postQuestion())
</script>
<template>
  <div class="background">
    <div class="header">
        <div class="flex flex-wrap gap-4 items-center">
          <el-select
            v-model="value"
            placeholder="选择难度"
            size="large"
            style="width: 165px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <template #default>
                <span style="margin-left: 17px;">
                  {{ item.label }}
                  <img :src="item.icon" alt="icon" style="width: 64.5px" />
                </span>
              </template>
            </el-option>
          </el-select>
        </div>
        <el-dropdown>
          <el-button type="primary">+</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="addQuestion">添加题目</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <div class="search">
          <div class="icon-search fl"></div>
          <input class="fl" type="text" placeholder="请输入你要找的题目/题目ID">
        </div>
    </div>
    <ul class="title">
      <el-scrollbar height="540px">
        <li v-for="item in question" :key="item.questionId">
          <div class="circle"></div>
          <h6>{{ item.questionId }}</h6>
          <span>{{ item.questionTitle }}</span>
          <div class="score"><el-rate v-model="item.score" :max="3" disabled/></div>
          <div class="labels">
            <div class="label" v-if="getquestionTag(item.questionTags)[0]">{{ getquestionTag(item.questionTags)[0] }}</div>
            <div class="label2" v-if="getquestionTag(item.questionTags)[1]">{{ getquestionTag(item.questionTags)[1]}}</div>
          </div>
          <h5 @click="deleteQuestion(item.questionId)">删除</h5>
          <RouterLink :to="`/manageContent/modifyQuestion/${item.questionId}`">修改</RouterLink>
        </li>
      </el-scrollbar>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
::v-deep .el-rate{
  --el-rate-fill-color:#aef7e1;
}
.background {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.header {
  width: 100%;
  height: 88px;
}
.flex .el-select{
  float: left;
  margin-left: 36px;
  margin-top: 24px;
  border-radius: 4px;
  .el-select__wrapper{
    box-shadow: 0 0 0 1px rgba(0,0,0,0.0);
  }
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
.title {
  width: 100%;
  li {
    position: relative;
    width: 100%;
    height: 48px;
    border-radius: 4px;
    .circle{
      // float: left;
      position: absolute;
      left: 36px;
      top: 20px;
      width: 6px;
      height: 6px;
      border-radius: 6px;
      // margin-left: 36px;
      // margin-top: 20px;
      background-color: #34ECB5;
    }
    h6{
      // float: left;
      position: absolute;
      left: 46px;
      top: 12px;
      font-size: 16px;
      // margin-left: 4px;
      // margin-top: 12px;
    }
    span {
      // float: left;
      position: absolute;
      left: 93px;
      top: 12px;
      width: 80px;
      font-size: 16px;
      // margin-left: 38px;
      // margin-top: 12px;
      text-overflow:ellipsis;
      overflow:hidden;
      white-space: nowrap;
    }
    .score {
      position: absolute;
      left: 248px;
      top: 14px;
      // float: left;
      // margin-left: 39px;
      // margin-top: 14px;
      width: 64.5px;
      height: 19.5;
    }
    .labels {
      position: absolute; 
      left: 356px;
      top: 12px;
      display: flex;
    }
    .label, .label2 {
      padding-left: 16px;
      padding-right: 16px;
      height: 24px;
      border-radius: 4px;
      color: #fff;
      text-align: center;
      line-height: 24px;
      background-color: #7DB1FF;
    }
    .label2 {
      margin-left: 12px;
    }
    h5, a {
      float: right;
      font-size: 14px;
    }
    h5 {
      color: #FF1313;
      margin-right: 26px;
      margin-top: 14px;
      cursor: pointer;
    }
    a {
      color: #00C98D;
      margin-right: 36px;
      margin-top: 14px;
    }
  }
  li:hover {
    background-color: #EBF3FF;
  }
}
</style>