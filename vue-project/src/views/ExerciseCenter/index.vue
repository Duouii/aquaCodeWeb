<script setup>
import {onMounted, ref, computed} from 'vue'
import { postQuestionListAPI } from '@/apis/lesson.js'
import difficultIcon from '@/assets/icons/icon-difficult.png'
import normalIcon from '@/assets/icons/icon-normal.png'
import easyIcon from '@/assets/icons/icon-easy.png'
import { useRouter } from 'vue-router';
// import { toScore } from '@/components/score.js'
const router = useRouter()
const returnPage = ()=>{
  router.push({ path: "/" });
}
// const language = ref('cpp')
// const selectedLanguage = ref('')
// const selectLanguage = (command) => {
//   language.value = command.toString()
//   console.log(language.value);
// }
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


let questionList = ref([])
const questionIndex =  ref(1) // 用于保存题目序号的变量

// const score = ref()
const postQuestionList = async() => {
  const res = await postQuestionListAPI(1, 19, " ", null)
  questionList.value = res.records
  // console.log(questionList.value);
  // questionList.value = res.records.map(item => {
  //   const score = toScore(item.questionDifficulty)
  //   return { ...item, score }
  // })
}
const getquestionTag = (questionTagsString) => {
  const questionTags = JSON.parse(questionTagsString);
  return questionTags;
};
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
          <input class="fl" type="text" placeholder="搜索你想要练习的题目">
        </div>
        <div class="ai">
          <img src="../../assets/icons/icon-revise.png" alt="">
          <h3>AI推荐刷题</h3>
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
                <div class="status">未做</div>
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
    // height: 820px;
    // background-color: pink;
}
.search-container{
  width: 1108px;
  height: 93px;
  border-radius: 6px;
  background-color: #fff;
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
      width: 40px;
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
</style>