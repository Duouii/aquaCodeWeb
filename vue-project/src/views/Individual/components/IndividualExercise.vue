<script setup>
import { onMounted, ref } from 'vue'
import { getAcceptQuestionAPI } from '@/apis/user'
import { toScore } from '@/components/score.js'

const acceptQuestion = ref([])
const getAcceptQuestion = async() => {
  const res = await getAcceptQuestionAPI()
  acceptQuestion.value = res.map(item => {
    const score = toScore(item.questionDifficulty)
    return { ...item, score };
  });
};
onMounted(()=>getAcceptQuestion())
</script>
<template>
  <div class="exercise">
    <div class="title">已提交题目</div>
    <div class="icon-exercise"></div>
    <div class="container">
      <ul>
        <li v-for="item in acceptQuestion" :key="item.questionId">
          <RouterLink to="/dayCardExercise">
            <div class="circle"></div>
            <h6>{{ item.questionId }}</h6>
            <span>{{ item.questionTitle }}</span>
            <div class="score"><el-rate v-model="item.score" :max="3" disabled/></div>
            <div class="status">已通过</div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
::v-deep .el-rate{
  --el-rate-fill-color:#17D199;
}
.exercise{
  position: relative;
  margin-left: 33px;
  width: 463px;
  height: 659px; //自适应
  border-radius: 4px;
  background-color: #FFFFFF;
  .title{
    position: absolute;
    top: 20px;
    left: 38px;
    font-size: 20px;
    color: #414447;
  }
  .icon-exercise{
    position: absolute;
    left: 145px;
    top: 25px;
    width: 20px;
    height: 20px;
    background: url(../../../assets/icons/icon-exercise.png) no-repeat;
    background-size: 20px 20px;
  }
  .container{
    position: absolute;
    left: 31px;
    top: 68px;
    width: 400.5px;
    height: 500px;
    border-radius: 4px;
    ul{
      width: 400.5px;
      height: 500px;
    }
    li, a{
      width: 400.5px;
      height: 47px;
      margin-bottom: 4px;
      border-radius: 4px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.03);
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .circle{
        margin-left: 12px;
        margin-top: 20.5px;
        width: 6px;
        height: 6px;
        border-radius: 6px;
        background-color: #34ECB5;
      }
      h6{
        margin-left: 4px;
        margin-top: 13px;
        font-size: 14px;
      }
      span{
        margin-left: 42px;
        margin-top: 12px;
        font-size: 15px;
      }
      .score{
        margin-left: 80px;
        margin-top: 13.75px;
        width: 64.5px;
        height: 19.5px;
      }
      .status{
        margin-left: 42px;
        margin-top: 12px;
        width: 45px;
        height: 23px;
        text-align: center;
        font-size: 15px;
        color: #17D199;
      }
    }
  }
}
</style>
