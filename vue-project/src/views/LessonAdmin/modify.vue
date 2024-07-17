<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()
import { putCourseAPI, putLessonCoverAPI } from '@/apis/admin.js'
import difficultIcon from '@/assets/icons/icon-difficult.png'
import normalIcon from '@/assets/icons/icon-normal.png'
import easyIcon from '@/assets/icons/icon-easy.png'
import { ElMessage } from 'element-plus';
import { useRoute } from 'vue-router';
const route = useRoute()

const options = [
  {
    value: 1,
    label: '简单',
    icon: easyIcon
  },
  {
    value: 2,
    label: '普通',
    icon: normalIcon
  },
  {
    value: 3,
    label: '困难',
    icon: difficultIcon
  }
]
const optionStatus = [
  {
    value: 1,
    label: '未开放'
  },
  {
    value: 2,
    label: '已公开'
  },
  {
    value: 3,
    label: '隐藏'
  }
]
const handleCoverSuccess = async (res) => {
  if (res) {
    form.value.courseCover = res;
    ElMessage({ type: 'success', message: '上传成功' })
  } else {
    console.error('No image URL received from upload API');
    return
  }
};

const beforeCoverUpload = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await putLessonCoverAPI(formData)
  handleCoverSuccess(res);
  return false; 
};

// const lesson = ref({})


const form = ref({
  courseName: '',
  courseCover: '',
  courseTags1: '',
  courseTags2: '',
  courseDifficulty: '',
  courseStatus: ''
})
const submit = async() => {
  const submitForm = {
    courseId: route.params.lessonId,
    courseName: form.value.courseName,
    courseCover: form.value.courseCover,
    courseTags: [form.value.courseTags1, form.value.courseTags2],
    courseDifficulty: form.value.courseDifficulty,
    courseStatus: form.value.courseStatus
  }
  console.log(submitForm);
  const res = await putCourseAPI(submitForm)
  console.log(res);
  ElMessage({ type: 'success', message: '添加成功' });
}
const returnPage = ()=>{
  router.push({ path: "/manage/lessonManage" });
}
</script>
<template>
  <div class="add-background">
    <div class="addQuestion-container">
      <div class="return-btn"><el-button class="return" plain @click="returnPage"><img src="../../assets/icons/Vector 202.png" alt=""></el-button></div>
      <h2>修改课程</h2>
      <div class="title">
        <el-form class="question" :model="form">
          <el-form-item label="课程标题">
            <el-input v-model="form.courseName" style="width: 300px; margin-bottom: 20px" clearable />
          </el-form-item>
          <el-form-item label="课程标签">
            <el-input v-model="form.courseTags1" style="width: 100px; margin-right: 16px; margin-bottom: 20px" clearable />
            <el-input v-model="form.courseTags2" style="width: 100px; margin-bottom: 20px" clearable />
          </el-form-item>
          <el-form-item label="课程难度">
            <el-select
                v-model="form.courseDifficulty"
                placeholder="选择难度"
                size="large"
                style="width: 165px; background: #f4f5f5;  margin-bottom: 20px"
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
            <div v-if="form.courseDifficulty==='easy'" class="starShow"><img :src="easyIcon" alt=""></div>
            <div v-if="form.courseDifficulty==='normal'" class="starShow"><img :src="normalIcon" alt=""></div>
            <div v-if="form.courseDifficulty==='difficult'" class="starShow"><img :src="difficultIcon" alt=""></div>
          </el-form-item>
          <el-form-item label="课程状态">
            <el-select
              v-model="form.courseStatus"
              placeholder="选择状态"
              size="large"
              style="width: 165px; background: #f4f5f5"
            >
            <el-option
              v-for="item in optionStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <template #default>
                <span style="margin-left: 17px;">
                  {{ item.label }}
                </span>
              </template>
            </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-top: 32px" label="课程封面" >
            <div class="showCourseCover">
              <el-upload
                action="uploadUrl"
                :show-file-list="false"
                :on-success="handleCoverSuccess"
                :before-upload="beforeCoverUpload"
                >
                <img v-if="form.courseCover" :src="form.courseCover" class="Cover" />
                <div v-else class="addCover">+</div>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item style="margin: 32px 0 0 65px">
            <el-button style="width: 200px; height: 40px" plain @click="submit">提交</el-button>
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
//   height: 83%;
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
  width: 650px;
  height: 800px;
//   background: skyblue;
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
.showCourseCover{
  width: 254px;
  height: 197px;
  background-color: #fafafa;
  margin-bottom: 27px;
  background-size: 254px 197px;
  overflow: hidden;
}
.addCover {
  width: 254px;
  height: 197px;
  font-size: 100px;
  margin-left: 90px;
  margin-top: 70px;
  color: #909399;
}
</style>