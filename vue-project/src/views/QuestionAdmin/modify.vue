<script setup>
import {onMounted, ref, toRefs, reactive} from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()
import { useRoute } from 'vue-router';
const route = useRoute()
import { putAddQuestionAPI } from '@/apis/admin.js'
import difficultIcon from '@/assets/icons/icon-difficult.png'
import normalIcon from '@/assets/icons/icon-normal.png'
import easyIcon from '@/assets/icons/icon-easy.png'
import { ElMessage } from 'element-plus';
import { getQuestionAPI } from '@/apis/admin.js'

const question = ref({})
const getQuestion = async () => {
  const res = await getQuestionAPI(route.params.questionId);
  question.value = res
  // 解析questionTags
  const questionTag = JSON.parse(question.value.questionTags)
  question.value.questionTag1 = questionTag[0] || ''
  question.value.questionTag2 = questionTag[1] || ''
  // 解析questionJudgeConfig
  const judgeConfig = JSON.parse(question.value.questionJudgeConfig);
  question.value.questionMemoryLimit = judgeConfig.memoryLimit || '';
  question.value.questionStackLimit = judgeConfig.stackLimit || '';
  question.value.questionTimeLimit = judgeConfig.timeLimit || '';
   // 解析questionCase
  const cases = JSON.parse(question.value.questionCase);
  if (cases.length >= 1) {
    question.value.questionInput1 = cases[0].input || '';
    question.value.questionOutput1 = cases[0].output || '';
  }
  if (cases.length >= 2) {
    question.value.questionInput2 = cases[1].input || '';
    question.value.questionOutput2 = cases[1].output || '';
  }
  if (cases.length >= 3) {
    question.value.questionInput3 = cases[2].input || '';
    question.value.questionOutput3 = cases[2].output || '';
  }
  if (cases.length >= 4) {
    question.value.questionInput4 = cases[3].input || '';
    question.value.questionOutput4 = cases[3].output || '';
  }
};
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
const submit = async() => {
  const submitForm = {
    questionId: route.params.questionId,
    questionTitle: question.value.questionTitle,
    questionContent: question.value.questionContent,
    questionTags: [question.value.questionTag1, question.value.questionTag2],
    questionAnswer: question.value.questionAnswer,
    questionDifficulty: question.value.questionDifficulty,
    questionJudgeConfig: {
      timeLimit: question.value.questionTimeLimit,
      stackLimit: question.value.questionStackLimit,
      memoryLimit: question.value.questionMemoryLimit
    },
    questionCase: [
      { input: question.value.questionInput1, output: question.value.questionOutput1 },
      { input: question.value.questionInput2, output: question.value.questionOutput2 },
      { input: question.value.questionInput3, output: question.value.questionOutput3 },
      { input: question.value.questionInput4, output: question.value.questionOutput4 },
    ],
  }
  const res = await putAddQuestionAPI(submitForm)
  ElMessage({ type: 'success', message: '修改成功' });
}
const returnPage = ()=>{
  router.push({ path: "/manage" });
}
onMounted(() => getQuestion())
</script>
<template>
  <div class="add-background">
    <div class="addQuestion-container">
      <div class="return-btn"><el-button class="return" plain @click="returnPage"><img src="../../assets/icons/Vector 202.png" alt=""></el-button></div>
      <h2>修改题目</h2>
      <div class="title">
        <el-form :inline="true" class="question" :model="question">
          <el-form-item label="问题标题">
            <el-input v-model="question.questionTitle" clearable />
          </el-form-item>
          <el-form-item label="问题标签">
            <el-input v-model="question.questionTag1" style="width: 100px; margin-right: 16px" clearable />
            <el-input v-model="question.questionTag2" style="width: 100px" clearable />
          </el-form-item>
          <el-form-item label="问题难度">
            <el-select
            v-model="question.questionDifficulty"
            placeholder="选择难度"
            size="large"
            style="width: 165px; background: #f4f5f5"
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
          </el-form-item>
          <el-form-item style="margin-top: 32px" label="问题内容" >
            <el-input v-model="question.questionContent" class="textarea" type="textarea" :autosize="{minRows: 10, maxRows: 10}"  maxlength="500"/>
          </el-form-item>
          <el-form-item style="margin-top: 32px" label="问题答案" >
            <el-input v-model="question.questionAnswer" class="textarea" type="textarea" :autosize="{minRows: 3, maxRows: 3}"  maxlength="100"/>
          </el-form-item>
          <el-form-item style="margin-top: 32px" label="判题用例">
            <el-input v-model="question.questionInput1" placeholder="输入内容" clearable />
            <el-input v-model="question.questionOutput1" style="margin-left: 24px" placeholder="输出内容" clearable />
          </el-form-item>
          <el-form-item style="margin-top: 12px" label="判题用例">
            <el-input v-model="question.questionInput2" placeholder="输入内容(选填)" clearable />
            <el-input v-model="question.questionOutput2" style="margin-left: 24px" placeholder="输出内容(选填)" clearable />
          </el-form-item>
          <el-form-item style="margin-top: 12px" label="判题用例">
            <el-input v-model="question.questionInput3" placeholder="输入内容(选填)" clearable />
            <el-input v-model="question.questionOutput3" style="margin-left: 24px" placeholder="输出内容(选填)" clearable />
          </el-form-item>
          <el-form-item style="margin-top: 12px" label="判题用例">
            <el-input v-model="question.questionInput4" placeholder="输入内容(选填)" clearable />
            <el-input v-model="question.questionOutput4" style="margin-left: 24px" placeholder="输出内容(选填)" clearable />
          </el-form-item>
          <el-form-item style="margin-top: 32px" label="判题配置">
            <el-input v-model="question.questionMemoryLimit" placeholder="内存限制(单位mb)" clearable />
            <el-input v-model="question.questionTimeLimit" style="margin-left: 24px" placeholder="时间限制(单位秒s)" clearable />
            <el-input v-model="question.questionStackLimit" style="margin-left: 24px" placeholder="堆栈限制(单位秒kb)" clearable />
          </el-form-item>
          <el-form-item style="margin-top: 32px">
            <el-button style="width: 200px" plain @click="submit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
::v-deep .el-input__wrapper {
  border-radius: 8px;
  background-color: #fff !important;
}
::v-deep .el-input {
    width: 240px ;
}
::v-deep .el-textarea__inner {
    resize: none;
    width: 845px;
}
.add-background {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  top: 116px;
  width: 1108px;
  height: 950px;
  border-radius: 4px;
  background-color: #fff;
}
.return-btn .el-button{
  position: absolute;
  left: -101px;
  top: -10px;
  width: 46px;
  height: 46px;
  border-radius: 46px;
  background-color: #fff;
  img{
    width: 5.83px;
    height: 11.67px;
  }
}
h2 {
  position: relative;
  left: 54px;
  top: 25px;
  font-size: 24px;
}
.title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 80px;
  width: 950px;
  height: 800px;
}
.question .el-input {
  --el-input-width: 170px !important;
}
</style>