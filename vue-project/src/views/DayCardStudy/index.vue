<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { getCoursePageContainAPI, getCourseHistoryAPI, getCardHistoryAPI } from "@/apis/lesson.js";
import { useUserStore } from '@/stores/userStore';
import CodeMirror from 'vue-codemirror6'
import { oneDark } from '@codemirror/theme-one-dark'
import { javascript } from '@codemirror/lang-javascript';
const extensions = [oneDark];
const lang = javascript();
const userStore = useUserStore();
const userInfo = userStore.userInfo
const router = useRouter();
const route = useRoute();
const returnPage = () => {
  router.go(-1);
};
//差一个结束的标志
const index = ref(1);

// 代码编辑器
let codeVal = ref('');

//获取课程
const coursePage = ref({});
const getCoursePage = async () => {
  const res = await getCoursePageContainAPI(route.params.cardId, index.value)
  coursePage.value = res;
};

// 用户历史
const courseHistory = ref();
const getCourseHistory = async () => {
  const res = await getCourseHistoryAPI(userInfo.userId,route.params.courseId,route.params.cardId,index.value);
  courseHistory.value = res;
};
const indexMax = 6
const percent = 244/indexMax
let widthT = ref((index.value)*percent)
let widthB = ref(244-widthT.value)

// 选择题答案
let correctAnswer = ref()
// 填空题答案
let correctCodeAnswer = ref()
// 是否显示成功
let isShowSuccess = ref(false)
// 是否显示失败
let isShowError = ref(false)

const nextPage = async () => {
  if(index.value == indexMax) {
    alert('当前已是最后一页')
    return
  }
  if(index.value <= indexMax) {
    index.value += 1;
    if(widthT.value==(indexMax)*percent){
      widthB.value = 0
    }
    widthT.value+=percent
    widthB.value-=percent
    const res = await getCoursePageContainAPI(route.params.cardId, index.value);
    coursePage.value = res;

    // 选择题
    if (coursePage.value.pageType == 4) {
       if(JSON.parse(coursePage.value.pageContent).answer) {
        correctAnswer = JSON.parse(coursePage.value.pageContent).answer
      }
    }
    // 代码运行题
    if(coursePage.value.pageType == 3) {
      codeVal = JSON.parse(coursePage.value.pageContent).code
      correctCodeAnswer = JSON.parse(coursePage.value.pageContent).output
    }
   
    const response = await getCourseHistoryAPI(userInfo.userId,route.params.courseId,route.params.cardId,index.value);
    courseHistory.value = response
  }
};
// 检查答案是否正确
const option = async(item) => {
  if(item === correctAnswer) {
    isShowSuccess.value = true
    isShowError.value = false
  } else {
    isShowError.value = true
    isShowSuccess.value = false
  }
}

let isShow = ref(false)
// 代码运行按钮
const runCode = () => {
  codeVal = correctCodeAnswer
  isShow.value = true
}

onMounted(async() => {
  await getCoursePage();
  await getCourseHistory();
});
</script>

<template>
  <div class="contain">
    <div class="card-container">
      <div class="return">
        <el-button plain @click="returnPage">
          <img src="../../assets/icons/Vector 202.png" alt=""/>
        </el-button>
      </div>
      <div class="test">
        <el-progress :percentage="100" :show-text="false" :style="{width: widthT+'px'}" />
        <el-progress :percentage="100" :show-text="false" :style="{width: widthB+'px'}"/>
      </div>
      <!-- 课程首页--标题 -->
      <div v-if="coursePage.pageType === 1" class="pageTypeTitle">
        <div class="title">{{ JSON.parse(coursePage.pageContent).title }}</div>
        <span>{{ JSON.parse(coursePage.pageContent).description }}</span>
        <div class="img"><img :src="JSON.parse(coursePage.pageContent).img" alt=""></div>
      </div>
      
      <!-- 课程描述(有图) -->
      <div v-if="coursePage.pageType === 5" class="pageTypeTitle">
        <div v-if="JSON.parse(coursePage.pageContent).img" class="showContent"><img :src="JSON.parse(coursePage.pageContent).img" alt=""></div>
        <h6>{{ JSON.parse(coursePage.pageContent).description }}</h6>
      </div>

      <!-- 课程描述 -->
      <div v-if="coursePage.pageType === 2" class="pageTypeTitle">
        <h2>{{ coursePage.pageContent }}</h2>
      </div>

      <!-- 代码描述题 -->
      <div v-if="coursePage.pageType === 3" class="pageTypeTitle">
        <h4>{{ JSON.parse(coursePage.pageContent).description }}</h4>
          <div class="codeEdit">
            <el-scrollbar height="110px">
              <code-mirror 
                v-model="codeVal" 
                basic 
                :indent-with-tab="true"
                :tabSize="2"
                :lang="lang" 
                style="height: 110px; width: 545px" 
                :extensions="extensions"
                placeholder="请输入"
                :readOnly="true"
              />
            </el-scrollbar>
          </div>
        <div class="run">
          <el-button plain size="large" @click="runCode">
            <img src="../../assets/icons/icon-run.png" alt="">运行
          </el-button>
        </div>
        <!-- 运行结果 -->
        <div class="showCorrectAnswer" v-if="isShow">
          <div class="correctAnswer">{{ correctCodeAnswer }}</div>
        </div>
      </div>

      <!-- 选择题 -->
      <div v-if="coursePage.pageType === 4" class="pageTypeTitle">
        <h5>{{ JSON.parse(coursePage.pageContent).question }}</h5>
        <div class="answers">
          <div 
            class="answer" 
            v-for="(option1, index) in JSON.parse(coursePage.pageContent).options" 
            :key="index"
            @click="option(option1)"
            :class="{ 'correct': isShowSuccess && option1 === correctAnswer, 'incorrect': isShowError && option1 !== correctAnswer }" 
          >
            {{ option1 }}
          </div>
        </div>
        <div v-if="isShowSuccess" class="resultOption resultSuccess">耶！做对啦 :-)</div>
        <div v-if="isShowError" class="resultOption resultError">错了，再检查检查吧</div>
      </div>
      
      <ul class="left-bottom">
        <a href=""><li><div class="icon-feedback"></div>反馈</li></a>
        <a href=""><li><div class="icon-note"></div>记笔记</li></a>
      </ul>
      <div class="continute">
        <el-button plain size="large" @click="nextPage">继续</el-button>
      </div>
    </div> 
  </div>
</template>

<style lang="scss" scoped>
::v-deep .ͼ1 {
  background-color: #595959;
}
::v-deep .ͼo .cm-gutters{
  background-color: #595959;
}
.contain {
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  background: url(../../assets/images/course.png) no-repeat;
  background-size: cover;
  background-attachment: fixed;
  .card-container{
    width: 1400px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
.return .el-button {
  position: absolute;
  left: 64px;
  top: 32px;
  width: 46px;
  height: 46px;
  border-radius: 46px;
  background-color: #fff;
  img {
    width: 5.83px;
    height: 11.67px;
  }
}
.pageTypeTitle {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 849px;
  height: 650px;
  .title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 71px;
    padding-left: 66px;
    padding-right: 66px;
    border-radius: 46px;
    background-color: #d8e8ff;
    font-size: 26px;
    color: $titleColor;
    text-align: center;
    line-height: 70px;
  }
  span {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 237px;
  }
  .img {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 284px;
    width: 598px;
    height: 324px;
    background-color: #fff;
    border-radius: 8px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .showContent {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 164px;
    width: 849px;
    height: 345px;
    background-color: #D9D9D9;
    border-radius: 4px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  h2 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 280px;
    font-size: 16px;
  }
  h6 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 537px;
    font-size: 16px;
  }
  h5 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 237px;
    font-size: 16px;
  }
  .answers {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    // background-color: #fff;
    top: 301px;
    .answer {
      margin-bottom: 16px;
      background-color: #fff;
      padding: 6px 80px;
      border-radius: 34px;
    }
  }
  .resultOption {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 420px;
    background-color: pink;
    padding: 9px 54px;
  }
  .resultSuccess {
    color: #03835D;
    background-color: #C8FFEE;
  }
  .resultError {
    color: #FF1313;
    background-color: #FFE8E8;
  }
  .correct {
    background-color: #37F3BA !important;
    color: #fff !important;
  }
  .incorrect {
    background-color: #FF1313 !important;
    color: #fff !important;
  }
  h4 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 16px;
    top: 164px;
  }
  .run {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 291px;
    width: 545px;
    height: 40px;
    background-color: #4a4a4b;
    .el-button{
    float: right;
    width: 102px;
    height: 40px;
    border-radius: 0;
    background-color: #05D697;
    color: #FFFFFF;
    font-weight: 700;
    border: none;
    img{
      width: 12px;
      height: 12px;
      margin-right: 6px;
      background-size: 12px 12px;
    }
  }
  }
  .codeEdit {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 221px;
    width: 545px;
    background-color: #595959;
    pointer-events:none
  }
  .showCorrectAnswer {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 400px;
    width: 545px;
    background-color: #595959;
    pointer-events:none;
    border-radius: 8px;
    min-height: 60px;
    max-height: 230px;
    .correctAnswer {
      width: 100%;
      min-height: 60px;
      max-height: 230px;
      background-color: #595959;
      border-radius: 8px;
      color: #fff;
      padding: 20px;
    }
  }
}

.test {
  position: absolute;
  top: 310px;
  left: -40px;
  width: 250px;
  height: 10px;
  transform: rotate(90deg);
  overflow: hidden;
}
.test .el-progress {
  float: left;
  transform: rotate(0deg);
  ::v-deep .el-progress-bar__outer {
    height: 10px !important;
  }
}
.test .el-progress:nth-child(1) {
  ::v-deep .el-progress-bar__inner {
    background-color: #20f9b8;
  }
}
.test .el-progress:nth-child(2) {
  float: left;
  // width: 60px;
  margin-left: 6px;
  ::v-deep .el-progress-bar__inner {
    background-color: #C0D9FF;
  }
}
.left-bottom {
  position: absolute;
  top: 666px;
  left: 80px;
  width: 205px;
  height: 40px;
  li {
    float: left;
  }
  .icon-feedback {
    float: left;
    width: 40px;
    height: 40px;
    background: url(../../assets/icons/icon-feedback.png) no-repeat;
    background-size: 40px 40px;
  }
  font-size: 16px;
  line-height: 40px;
  .icon-note {
    float: left;
    margin-left: 33px;
    width: 40px;
    height: 40px;
    background: url(../../assets/icons/icon-note.png) no-repeat;
    background-size: 40px 40px;
  }
}
.continute .el-button {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 654px;
  width: 212px;
  height: 52px;
  border-radius: 8px;
  background-color: $blueXColor;
  color: #fff;
}
</style>
