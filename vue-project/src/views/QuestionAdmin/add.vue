<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()
import { postAddQuestionAPI } from '@/apis/admin.js'
import difficultIcon from '@/assets/icons/icon-difficult.png'
import normalIcon from '@/assets/icons/icon-normal.png'
import easyIcon from '@/assets/icons/icon-easy.png'
import { ElMessage } from 'element-plus';

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
const form = ref({
  questionTitle: '',
  questionContent: '',
  questionTags1: '',
  questionTags2: '',
  questionDifficulty: '',
  questionAnswer: '',
  questionInput1: '',
  questionInput2: '',
  questionInput3: '',
  questionInput4: '',
  questionOutput1: '',
  questionOutput2: '',
  questionOutput3: '',
  questionOutput4: '',
  questionMemoryLimit: '',
  questionTimeLimit: '',
  questionStackLimit: ''
})
const submit = async() => {
  const submitForm = {
    questionTitle: form.value.questionTitle,
    questionContent: form.value.questionContent,
    questionTags: [form.value.questionTags1, form.value.questionTags2],
    questionAnswer: form.value.questionAnswer,
    questionDifficulty: form.value.questionDifficulty,
    questionJudgeConfig: {
      timeLimit: form.value.questionTimeLimit,
      stackLimit: form.value.questionStackLimit,
      memoryLimit: form.value.questionMemoryLimit
    },
    questionCase: [
      { input: form.value.questionInput1, output: form.value.questionOutput1 },
      { input: form.value.questionInput2, output: form.value.questionOutput2 },
      { input: form.value.questionInput3, output: form.value.questionOutput3 },
      { input: form.value.questionInput4, output: form.value.questionOutput4 },
    ],
  }
  const res = await postAddQuestionAPI(submitForm)
  ElMessage({ type: 'success', message: '添加成功' });
}
const returnPage = ()=>{
  router.push({ path: "/manage" });
}
</script>
<template>
  <div class="add-background">
    <div class="addQuestion-container">
      <div class="return-btn"><el-button class="return" plain @click="returnPage"><img src="../../assets/icons/Vector 202.png" alt=""></el-button></div>
      <h2>添加题目</h2>
      <div class="title">
        <el-form :inline="true" class="question" :model="form">
          <el-form-item label="问题标题">
            <el-input v-model="form.questionTitle" clearable />
          </el-form-item>
          <el-form-item label="问题标签">
            <el-input v-model="form.questionTags1" style="width: 100px; margin-right: 16px" clearable />
            <el-input v-model="form.questionTags2" style="width: 100px" clearable />
          </el-form-item>
          <el-form-item label="问题难度">
            <el-select
                v-model="form.questionDifficulty"
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
            <div v-if="form.questionDifficulty==='easy'" class="starShow"><img :src="easyIcon" alt=""></div>
            <div v-if="form.questionDifficulty==='normal'" class="starShow"><img :src="normalIcon" alt=""></div>
            <div v-if="form.questionDifficulty==='difficult'" class="starShow"><img :src="difficultIcon" alt=""></div>
          </el-form-item>
          <el-form-item style="margin-top: 32px" label="问题内容" >
            <el-input v-model="form.questionContent" class="textarea" type="textarea" :autosize="{minRows: 10, maxRows: 10}"  maxlength="500"/>
          </el-form-item>
          <el-form-item style="margin-top: 32px" label="问题答案" >
            <el-input v-model="form.questionAnswer" class="textarea" type="textarea" :autosize="{minRows: 3, maxRows: 3}"  maxlength="100"/>
          </el-form-item>
          <el-form-item style="margin-top: 32px" label="判题用例">
            <el-input v-model="form.questionInput1" placeholder="输入内容" clearable />
            <el-input v-model="form.questionOutput1" style="margin-left: 24px" placeholder="输出内容" clearable />
          </el-form-item>
          <el-form-item style="margin-top: 12px" label="判题用例">
            <el-input v-model="form.questionInput2" placeholder="输入内容(选填)" clearable />
            <el-input v-model="form.questionOutput2" style="margin-left: 24px" placeholder="输出内容(选填)" clearable />
          </el-form-item>
          <el-form-item style="margin-top: 12px" label="判题用例">
            <el-input v-model="form.questionInput3" placeholder="输入内容(选填)" clearable />
            <el-input v-model="form.questionOutput3" style="margin-left: 24px" placeholder="输出内容(选填)" clearable />
          </el-form-item>
          <el-form-item style="margin-top: 12px" label="判题用例">
            <el-input v-model="form.questionInput4" placeholder="输入内容(选填)" clearable />
            <el-input v-model="form.questionOutput4" style="margin-left: 24px" placeholder="输出内容(选填)" clearable />
          </el-form-item>
          <el-form-item style="margin-top: 32px" label="判题配置">
            <el-input v-model="form.questionMemoryLimit" placeholder="内存限制(单位mb)" clearable />
            <el-input v-model="form.questionTimeLimit" style="margin-left: 24px" placeholder="时间限制(单位秒s)" clearable />
            <el-input v-model="form.questionStackLimit" style="margin-left: 24px" placeholder="堆栈限制(单位秒kb)" clearable />
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
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  top: 80px;
  width: 950px;
  height: 800px;
}
.question .el-input {
  --el-input-width: 170px !important;
}
.starShow {
  position: absolute;
  left: 50px;
  top: 3px;
  width: 64.5px;
  height: 19.5px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>