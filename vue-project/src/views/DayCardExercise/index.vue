<script setup>
import { useRouter } from 'vue-router';
import {onMounted, ref, toRefs} from 'vue'
// import Code from './component/code.vue'
import { getQuestionAPI, postQuestionAPI,getQuestionResultAPI } from '@/apis/lesson.js'
import { useRoute } from "vue-router";
const router = useRouter()
const route = useRoute();

import CodeMirror from 'vue-codemirror6'
import { oneDark } from '@codemirror/theme-one-dark'
import { json } from '@codemirror/lang-json';
import { javascript } from '@codemirror/lang-javascript';
import {java} from '@codemirror/lang-java'

const codeVal = ref('');

const lang = javascript();
const extensions = [oneDark];

const language = ref('java')
const selectedLanguage = ref('')
const selectLanguage = (command) => {
  language.value = command.toString()
  console.log(language.value);
}


const returnPage = ()=>{
  if (window.history.length <= 1) {
    router.push({ path: "/system/storageManagement" });
    console.log(1);
    return false;
  } else {
    router.go(-1);
  }
}
const question = ref({})
const getQuestion = async () => {
  const res = await getQuestionAPI(route.params.questionId)
  question.value = res;
};

const result = ref({})
const runCode = async() => {
  console.log(route.params.questionId);
  console.log(language.value);
  console.log(codeVal.value);
  const res = await postQuestionAPI(route.params.questionId, language.value, codeVal.value)
  const response = await getQuestionResultAPI(res)
  // const response = await getQuestionResultAPI(183)
  result.value = response
  turn(result.value)
  // onsubmit()
  if(result.value.questionStatus === 2) {
    // 显示弹框和遮罩
    showModal.value = true;
    // 禁止滚动
    document.body.style.overflow = 'hidden';
  }
  
};
const turn = (result) => {
  result.judgeInfoList.forEach(item => {
    item.memory = (item.memory/1000/1000).toFixed(2);
    item.time = (item.time/1024/1024).toFixed(2)
  })
}
// 响应式数据
const showModal = ref(false);
const responseData = ref('');

// 关闭弹框
const onCloseModal = () => {
  showModal.value = false;

  // 恢复滚动
  document.body.style.overflow = '';
};
onMounted(()=>getQuestion())
</script>

<template>
  <div class="contain">
    <div class="card-container">
      <div class="left-contain">
        <el-scrollbar>
          <div class="return"><el-button plain @click="returnPage"><img src="../../assets/icons/Vector 202.png" alt=""></el-button></div>
          <ul class="title">
            <li>{{question.questionId}}</li>
            <li>{{question.questionTitle}}</li>
          </ul>
          <ul class="ul">
            <li>
              <span>题目</span>
              <h4>{{question.questionContent}}</h4>
            </li>
            <li>
              <span>输入用例</span>
              <div class="code">无</div>
            </li>
            <li>
              <span>输出用例</span>
              <div class="code">Hellow world:-)</div>
            </li>
          </ul>
        </el-scrollbar>
      </div>
      <div class="right-contain">
        <div class="top">代码编辑器</div>
        <div class="main">
          <!-- <Code v-model:codeVal="codeVal"  :style="{width: '700px',height: '588px', background: '#414447'}"></Code> -->
          <code-mirror 
            v-model="codeVal" 
            basic 
            :indent-with-tab="true"
            :tabSize="2"
            :lang="lang" 
            style="height: 400px; width: 680px" 
            :extensions="extensions"
            placeholder="请输入"
          />
        </div>
        <div class="run">
          <el-dropdown @command="selectLanguage" v-model="selectedLanguage">
            <el-button>
              {{ language  }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="Python">Python</el-dropdown-item>
                <el-dropdown-item command="cpp">cpp</el-dropdown-item>
                <el-dropdown-item command="c">C语言</el-dropdown-item>
                <el-dropdown-item command="java">java</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-button plain size="large" @click="runCode">
            <img src="../../assets/icons/icon-run.png" alt="">运行
          </el-button>
        </div>
      </div>
      <div class="bottom">
        <ul class="left-bottom">
          <a href=""><li><div class="icon-feedback"></div>反馈</li></a>
          <a href=""><li><div class="icon-note"></div>记笔记</li></a>
          <a href=""><li><div class="icon-revise"></div>讯飞大模型辅助纠错</li></a>
        </ul>
        <div class="next"><el-button plain size="large">下一题</el-button></div>
      </div>
    </div>
  </div>
  <!-- 弹框和遮罩 -->
  <div :class="{ 'modal': true, 'show': showModal }">
    <div class="window">
      <h1>SUCCESS</h1>
      <h2>代码运行成功 :-)</h2>
      <span>测试点</span>
      <ul>
        <li v-for="item in result.judgeInfoList">
          <h5>{{item.message}}</h5>
          <h6>{{item.memory}}ms</h6>
          <h6>{{item.time}}kb</h6>
        </li>
      </ul>
    </div>
    <button class="closeBtn" @click="onCloseModal">x</button>
  </div>
  <div :class="{ 'modal-overlay': true, 'show': showModal }"></div>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  display: none;
  .window {
    width: 500px;
    height: 354px;
    background-color: #EEFFFA;
    h1 {
      position: absolute;
      left: 40px;
      top: 30px;
      font-size: 64px;
      color: #BAFFEA;
      font-weight: 700;
    }
    h2 {
      position: absolute;
      left: 40px;
      top: 102px;
      font-size: 32px;
      color: #009F6F;
    }
    span {
      position: absolute;
      left: 40px;
      top: 165px;
      font-size: 16px;
      color: #45E84C;
    }
    ul {
      position: absolute;
      left: 40px;
      top: 192px;
      height: 85px;
      display: flex;
      li {
        width: 85px;
        height: 85px;
        background: #45E84C;
        margin-right: 14px;
        h5, h6 {
          color: #fff;
          font-size: 13px;
          text-align: center;
        }
        h5 {
          font-size: 14px;
          margin-top: 7px;
          margin-bottom: 15px;
        }
      } 
    }
    
  }
  .closeBtn {
    width: 30px;
    height: 30px;
    border-radius: 30px;
    background-color: transparent;
    margin-top: 47px;
    margin-left: 235px;
    font-size: 25px;
    line-height: 30px;
    border: 1px solid #fff;
    color: #fff;
  }
}

.modal.show {
  display: block;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  display: none;
}

.modal-overlay.show {
  display: block;
}
::v-deep .cm-editor{
  width: 770px;
  height: 568px;
}
::v-deep .ͼ1 {
  background-color: #414447;
}
::v-deep .ͼo .cm-gutters{
  background-color: #414447;
}

.scrollbar-demo-item {
    position: absolute;
    left: 647px;
    height: 10px;
    width: 10px;
    border-radius: 4px;
}
ul,li,span,h4{
    font-size: 16px;
}
.contain{
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url(../../assets/images/course.png) no-repeat;
  background-size: cover;
  background-attachment: fixed;
  .card-container{
    width: 1420px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
  }
}
.return .el-button{
  position: absolute;
  left: 64px;
  top: 32px;
  width: 46px;
  height: 46px;
  border-radius: 46px;
  background-color: #fff;
  img{
    width: 5.83px;
    height: 11.67px;
  }
}
.left-contain{
  width: 669px;
  height: 720px;
}
.right-contain{
  width: 770px;
  height: 670px;
  overflow: hidden;
  .top{
    width: 100%;
    height: 32px;
    background-color: #0F1011;
    opacity: .8;
    font-size: 14px;
    color: #7D7F81;
    line-height: 32px;
    padding-left: 16px;
  }
  .run{
    width: 100%;
    height: 40px;
    background-color: #0F1011;
    opacity: .8;
  }
  .run .el-button:nth-child(1) {
    margin-left: 10px;
    margin-top: 2px;
    width: 94px;
    height: 30px;
    color: #7D7F81;
    background-color: #F4F7FA;
  }
  .run .el-button:nth-child(2){
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
.bottom{
  position: absolute;
  left: 0;
  top: 658px;
  width: 100%;
  height: 80px;
  background-color: #FFFFFF;
  .left-bottom{
    position: absolute;
    top: 20px;
    left: 80px;
    width: 500px;
    height: 40px;
    li{
      float: left;
    }
    .icon-feedback{
      float: left;
      width: 40px;
      height: 40px;
      background: url(../../assets/icons/icon-feedback.png) no-repeat;
      background-size: 40px 40px;
    }
    line-height: 40px;
    .icon-note{
      float: left;
      margin-left: 33px;
      width: 40px;
      height: 40px;
      background: url(../../assets/icons/icon-note.png) no-repeat;
      background-size: 40px 40px;
    }
    .icon-revise{
      float: left;
      margin-left: 33px;
      width: 40px;
      height: 40px;
      background: url(../../assets/icons/icon-revise.png) no-repeat;
      background-size: 40px 40px;
    }
  }
}
.next .el-button{
  position: absolute;
  left: 1262px;
  top: 20px;
  width: 136px;
  height: 40px;
  border-radius: 6px;
  background-color: $blueXColor;
  color: #FFFFFF;
}
.title{
  position: absolute;
  left: 64px;
  top: 110px;
  width: 165px;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  li{
    line-height: 40px;
  }
  li:nth-child(1){
    float: left;
    width: 46px;
    height: 40px;
    padding-left: 18px;
    color: #FFFFFF;
    background-color: #34ECB5;
  }
  li:nth-child(2){
    float: left;
    margin-left: 9px;
  }
}
.ul{
  position: absolute;
  left: 65px;
  top: 179px;
  width: 542px;
  height: 556px;
  overflow: auto;
  li{
    width: 100%;
    margin-bottom: 36px;
    span{
      color: #00C98D;
      margin-bottom: 6px;
    }
    h4{
      margin-top: 6px;
    }
    .code{
      width: 100%;
      min-height: 44px;
      border-radius: 8px;
      margin-top: 6px;
      padding: 12px;
      color: #FFFFFF;
      background-color: #414447;
    }
  }
    
}
.main{
  width: 100%;
  height: 588px;
  background-color: #414447;
}
</style>