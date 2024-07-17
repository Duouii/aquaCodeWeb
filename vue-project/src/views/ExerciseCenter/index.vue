<script setup>
import {onMounted, ref, computed} from 'vue'
import { postQuestionListAPI, getAirecommendAPI } from '@/apis/lesson.js'
import difficultIcon from '@/assets/icons/icon-difficult.png'
import normalIcon from '@/assets/icons/icon-normal.png'
import easyIcon from '@/assets/icons/icon-easy.png'
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const userInfo = userStore.userInfo
const router = useRouter()
const returnPage = async()=>{
  await userStore.getUserInfo()
  router.push({ path: "/" });
}

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

// 选择难度
const checkDifficult = async (difficult) => {
  console.log(difficult);
  const res = await postQuestionListAPI(1, 50, " ", null);
  questionList.value = res.records.filter(item => item.questionDifficulty === difficult);
}

let questionList = ref([])
const userStatus = ref('')
const postQuestionList = async() => {
  const res = await postQuestionListAPI(1, 50, " ", null)
  questionList.value = res.records
}
const getquestionTag = (questionTagsString) => {
  const questionTags = JSON.parse(questionTagsString);
  return questionTags;
};
// 用户输入
const userSearch = ref('')
const userSearching = async() => {
  console.log(userSearch.value);
  const res = await postQuestionListAPI(1, 50, " ", null);
  questionList.value = res.records.filter(item => item.questionTitle === userSearch.value);
}

// ai推题
const aiVisible = ref(false)
// 正在等待中
const showWaiting = ref(false)
// 再次提问
const aiAgain = ref(false)

// ai返回结果
const aiCorrect = ref('')
const aiCorrectShow = ref('')
// ai纠错
const sendAi = async() => {
  showWaiting.value = true
  const res = await getAirecommendAPI()
  aiCorrect.value = res
  aiCorrectShow.value = res
  showWaiting.value = false
  aiAgain.value = true
}
// 再次提问
const again = async() => {
  aiCorrectShow.value = false
  aiAgain.value = false
}
onMounted(() => postQuestionList())
</script>
<template>
  <div class="background">
    <div class="return-btn"><el-button class="return" plain @click="returnPage"><img src="../../assets/icons/Vector 202.png" alt=""></el-button></div>
    <div class="exercise-container">
      <div class="search-container">
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
              @click="checkDifficult(item.value)"
            >
              <template #default>
                <span style="margin-left: 17px;">
                  {{ item.label }}
                  <img :src="item.icon" alt="icon" style="width: 64.5px" />
                </span>
              </template>
            </el-option>
          </el-select>
          <div v-if="value==='easy'" class="starShow"><img :src="easyIcon" alt=""></div>
          <div v-if="value==='normal'" class="starShow"><img :src="normalIcon" alt=""></div>
          <div v-if="value==='difficult'" class="starShow"><img :src="difficultIcon" alt=""></div>
        </div>
        <div class="search">
          <div class="icon-search fl"></div>
          <input v-model="userSearch" class="fl" type="text" placeholder="搜索你想要练习的题目">
          <div class="isSearching" @click="userSearching">搜索</div>
        </div>
        <div class="ai">
          <img src="../../assets/icons/icon-revise.png" alt="">
          <h3 @click="aiVisible = true">AI推荐刷题</h3>
        </div>
      </div>
      <div class="title">
        <ul>
          <li v-for="item in questionList" :key="item.questionId">
            <RouterLink :to="`/dayCardExercise/${item.questionId}`">
              <div class="container">
                <div class="circle"></div>
                <h6>{{ item.questionId }}</h6>
                <span>{{ item.questionTitle }}</span>
                <div class="score">
                  <img v-if="item.questionDifficulty === 'easy'" :src="easyIcon" alt="">
                  <img v-if="item.questionDifficulty === 'normal'" :src="normalIcon" alt="">
                  <img v-if="item.questionDifficulty === 'difficult'" :src="difficultIcon" alt="">
                  </div>
                <div class="labels">
                  <div class="label" v-if="getquestionTag(item.questionTags)[0]">{{ getquestionTag(item.questionTags)[0] }}</div>
                  <div class="label2" v-if="getquestionTag(item.questionTags)[1]">{{ getquestionTag(item.questionTags)[1]}}</div>
                </div>
                <div class="status" v-if="item.status == null">未做</div>
                <div class="status" v-if="item.status == 2" style="color: #17D199">已通过</div>
                <div class="status" v-if="item.status == 3" style="color: #ff7f7f">未通过</div>
              </div>
            </RouterLink>
            <RouterLink>
              <div class="submit">
                <h6>已提交</h6>
                <h3>{{ item.questionSubmitNum }}</h3>
              </div>
            </RouterLink>
            <RouterLink>
              <div class="pass">
                <h6>已通过</h6>
                <h3>{{ item.questionAcceptedNum }}</h3>
              </div>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
    <el-drawer 
    v-model="aiVisible" 
    :show-close="false" 
    style="background-color: #ebf0f6"
  >
    <template #header="{ close }">
      <img 
        src="../../assets/icons/icon-arrow-left.png" 
        style="position:absolute; left: 24px; top: 20px; width: 25px; height: 25px"
        @click="close" alt=""
      >
    </template>
    <div class="avatar userAvatar"><img :src="userInfo.userAvatar" alt=""></div>
    <el-button type="primary" style="width: 80px; margin: -60px 0 0 250px" @click="sendAi">获取题目</el-button>
    <div v-if="showWaiting" class="isWaiting">等待中......</div>
    <div v-if="aiCorrectShow" class="avatar aiAvatar"><img src="../../assets/icons/icon-revise.png" alt=""></div>
    <div v-if="aiCorrectShow" class="showAiAnswer">{{ aiCorrectShow }}</div>
    <div v-if="aiAgain" class="avatar userAvatar" style="margin-top: 30px"><img :src="userInfo.userAvatar" alt=""></div>
    <el-button v-if="aiAgain" type="primary" style="width: 80px; margin: -65px 0 0 250px" @click="again">继续获取</el-button>
  </el-drawer>
  </div>
</template>
<style lang="scss" scoped>
::v-deep .el-select__wrapper{
  box-shadow: 0 0 0 1px rgba(0,0,0,0.05);
}
::v-deep .el-rate{
  --el-rate-fill-color:#aef7e1;
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
  left: 64px;
  top: 126px;
  width: 46px;
  height: 46px;
  border-radius: 46px;
  background-color: #fff;
  img{
    width: 5.83px;
    height: 11.67px;
  }
}
.exercise-container{
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 118px;
    width: 1108px;
}
.search-container{
  position: relative;
  width: 1108px;
  height: 93px;
  border-radius: 6px;
  background-color: #fff;
  .isSearching{
    position: absolute;
    top:10px;
    left: 550px;
    color: #7D7F81;
    cursor: default;
  }
  .flex .el-select{
    position: absolute;
    left: 63px;
    top: 27px;
    border-radius: 4px;
    .el-select__wrapper{
      box-shadow: 0 0 0 1px rgba(0,0,0,0.0);
    }  
  }
  .starShow {
    position: absolute;
    left: 115px;
    top: 36px;
    width: 64.5px;
    height: 19.5px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .search{
    position: absolute;
    left: 251px;
    top: 27px;
    width: 612px;
    height: 40px;
    border-radius: 4px;
    background-color: #F4F5F5;
    .icon-search{
      width: 24px;
      height: 24px;
      background: url(../../assets/icons/icon-search.png) no-repeat;
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
  .ai {
    position: absolute;
    left: 932px;
    top: 32px;
    width: 140px;
    height: 32px;
    border-radius: 4px;
    img {
      float: left;
      width: 32px;
      height: 32px;
    }
    h3 {
      float: left;
      height: 32px;
      font-size: 16px;
      color: #04357E;
      margin-left: 12px;
      line-height: 32px;
      cursor: default;
    }
  }
}
.title {
  width: 1108px;
  margin-top: 40px;
  border-radius: 4px;
  li {
    width: 100%;
    height: 58px;
    margin-bottom: 14px;
  }
  .container {
    position: absolute;
    left: 0;
    width: 900px;
    height: 58px;
    background-color: #fff;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .circle{
      position: absolute;
      left: 36px;
      top: 26px;
      width: 6px;
      height: 6px;
      border-radius: 6px;
      background-color: #34ECB5;
    }
    h6{
      position: absolute;
      left: 46px;
      top: 14px;
      font-size: 20px;
    }
    span {
      position: absolute;
      left: 93px;
      top: 14px;
      font-size: 20px;
    }
    .score {
      position: absolute;
      left: 248px;
      top: 19px;
      width: 64.5px;
      height: 19.5;
    }
    .labels {
      position: absolute;
      left: 356px;
      top: 19px;
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
    .status {
      position: absolute;
      left: 824px;
      top: 14px;
      width: 80px;
      height: 30px;
      font-size: 20px;
      color: #BCBCBC;
    }
  }
  .submit {
    position: absolute;
    left: 932px;
    width: 84px;
    height: 58px;
    border-radius: 4px;
    background-color: #E7F1FF;
    border: 1px solid #BAD6FF;
    h6 {
      margin-top: 6px;
      text-align: center;
      font-size: 13px;
      color: #5297FF;
    }
    h3 {
      text-align: center;
      font-size: 20px;
      color: #5297FF;
    }
  }
  .pass {
    position: absolute;
    left: 1024px;
    width: 84px;
    height: 58px;
    border-radius: 4px;
    background-color: #E3FFF7;
    border: 1px solid #17D199;
    h6 {
      margin-top: 6px;
      text-align: center;
      font-size: 13px;
      color: #17D199;
    }
    h3 {
      text-align: center;
      font-size: 20px;
      color: #17D199;
    }
  }
}
.isWaiting {
  margin-left: 150px;
  color: #7D7F81;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 30px;
  background-color: #fff;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
.userAvatar {
  margin-left: 345px;
}
.showAiAnswer {
  width: 300px;
  min-height: 100px;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-top: -40px;
  margin-left: 55px;
}

</style>