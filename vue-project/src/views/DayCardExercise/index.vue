<script setup>
// import {ref} from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()

const returnPage = ()=>{
    if (window.history.length <= 1) {
      router.push({ path: "/system/storageManagement" });
      console.log(1);
      return false;
    } else {
      router.go(-1);
    }
}
// import { ref, onMounted } from 'vue';
// import CodeMirror from 'vue-codemirror6'
// import { oneDark } from '@codemirror/theme-one-dark'
// import { json } from '@codemirror/lang-json';
// // import { javascript } from '@codemirror/lang-javascript';
// // import { python } from '@codemirror/lang-python';

// const initJson = {
//   name: `maybaby`,
//   year: 25,
//   weight: 45,
//   height: 165
// }
// // 初始化
// let codeVal = ref('');
// // 转成json字符串并格式化
// codeVal.value = JSON.stringify(initJson, null, '\t')

// // json语言
// const lang = json();
// // 扩展
// const extensions = [oneDark];

// onMounted(() => {
// })
import {ref} from 'vue'
import Code from '@/views/Code/index.vue'

const fetchTxtFileData = ref('你好 世界!')
</script>

<template>
    <div class="contain">
        <div class="left-contain">
            <el-scrollbar>
                <div class="return"><el-button plain @click="returnPage"><img src="../../assets/icons/Vector 202.png" alt=""></el-button></div>
                <ul class="title">
                    <li>1</li>
                    <li>题目标题名称</li>
                </ul>
                <ul class="ul">
                    <li>
                        <span>题目</span>
                        <h4>利用代码打印一句“Hellow world:-)”</h4>
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
                <!-- <code-mirror 
                    v-model="codeVal" 
                    basic 
                    :lang="lang" 
                    style="height: 400px;" 
                    :extensions="extensions"
                /> -->
                <Code v-model="fetchTxtFileData" :style="{width: '771px',height: '100%', background: '#414447'}"></Code>
            </div>
            <div class="run"><el-button plain size="large"><img src="../../assets/icons/icon-run.png" alt="">运行</el-button></div>
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
</template>

<style lang="scss" scoped>
::v-deep .cm-editor{
    width: 771px;
    height: 668px;
}
::v-deep .ͼ1 {
    background-color: #414447;
}
::v-deep .ͼo .cm-gutters{
    background-color: #414447;
}
/* required! */
.cm-editor {
  height: 100%;
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
    width: 1440px;
    height: 820px;
    background-color: #F6FAFF;
}
.return .el-button{
    position: absolute;
    left: 64px;
    top: 32px;
    width: 46px;
    height: 46px;
    border-radius: 46px;
    img{
        width: 5.83px;
        height: 11.67px;
    }
}
.left-contain{
    float: left;
    width: 669px;
    height: 820px;
}
.right-contain{
    float: left;
    width: 771px;
    height: 820px;
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
    .run .el-button{
        width: 102px;
        height: 40px;
        margin-left: 670px;
        border-radius: 0;
        background-color: #05D697;
        color: #FFFFFF;
        font-weight: 700;
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
    top: 740px;
    width: 1440px;
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
    background-color: #267DFF;
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
    height: 668px;
    background-color: #414447;
}
</style>