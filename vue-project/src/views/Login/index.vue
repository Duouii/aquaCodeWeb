<script setup>
import {ref, onMounted} from 'vue'
import { getCaptchaAPI } from '@/apis/user.js'
import { useRouter } from 'vue-router';
const router = useRouter()
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()
//用户输入
const form = ref({
  userEmail: '1994295994@qq.com',
  userPassword: 'czxczxczx',
  captcha:'', //用户输入的图形验证码
  checkKey:'', //将来请求传递的图形验证码唯一标识
  captchaUrl:'' //地址
})
// 规则数据对象
const rules = {
  userEmail: [
    { required: true, message: '账号不能为空',trigger:'blur' }
  ],
  userPassword: [
    { required: true, message: '密码不能为空',trigger:'blur' }
  ],
  captcha:[
    {required: true, message: '验证码不能为空',trigger:'blur' },
    { min: 4, max: 4, message:'验证码长度为4',trigger:'blur' }
  ]
}
const getCaptcha = async()=>{
  const data = await getCaptchaAPI()
  form.value.captchaUrl = data.captcha;
  form.value.checkKey = data.checkKey
}

onMounted(()=>getCaptcha())

const formRef = ref(null);

const doLogin = () => {
  const data = form.value
  formRef.value.validate(async (valid) => {
    if (valid) {
      await userStore.login(data)
    }
  })
}
const toRegister =()=>{
  router.push('/user/register')
}
const toFindPassword =()=>{
  router.push('/user/findpassword')
}
</script>

<template>
  <div class="login-container">
    <Header>
      <div></div>
      <div>Aqua code</div>
      <div>首页</div>
    </Header>
    <div class="title">
      <h1>欢 迎 使 用 Aqua code</h1>
      <h4>让编程学习更轻松，进步更快速</h4>
    </div>
    <div class="form">
      <h1>登录</h1>
      <div class="form-container">
        <el-form ref="formRef" :model="form" :rules="rules" :hide-required-asterisk="true" label-position="top" label-width="60px" status-icon>
          <el-form-item label="账号" prop="userEmail">
            <el-input v-model="form.userEmail" placeholder="请输入您的邮箱" />
          </el-form-item>
          <el-form-item label="密码" prop="userPassword" style="margin-top: 21px;">
            <el-input v-model="form.userPassword" placeholder="请输入您的密码" show-password />
          </el-form-item>
          <el-form-item label="验证码" prop="captcha" style="margin-top: 21px;">
            <el-input v-model="form.captcha" style="width: 130px;" placeholder="请输入验证码" />
          </el-form-item>
          <div class="showCode">
            <img v-if="form.captchaUrl" :src="form.captchaUrl" alt="">
          </div>
          <h6 @click="getCaptcha">换一张</h6>
          <div class="loginOption">
            <a href="javascript:;" class="registerOption" @click="toRegister">注册</a>
            <a href="javascript:;" class="forgetPswOption" @click="toFindPassword">忘记密码？</a>
          </div>
          <el-button size="large" style="width: 190px;height: 40px; margin-left: 35px; margin-top: 50px;" @click="doLogin">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container{
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 100vh;
  background: url(../../assets/images/Login.png) no-repeat;
  background-size: cover;
  Header{
    position: absolute;
    width: 300px;
    height: 50px;
    display: flex;
    div {
      margin-left: 16px;
    }
    div:nth-child(1){
        width: 30px;
        height: 30px;
        margin-top: 17px;
        border-radius: 4px;
        background-color: #D9D9D9;
    }
    div:nth-child(2){
        margin-top: 17px;
        font-size: 20px;
        color: $titleColor;
        font-weight: bold;
    }
    div:nth-child(3){
        margin-top: 22px;
    }
  }
  .title{
      position: relative;
      left: 16%;
      top: 45%;
      width: 27%;
      height: 98px;
      h1{
        font-size: 28px;
        color: #001431;
        font-weight: bold;
      }
      h4{
        font-size: 18px;
        margin-top: 15px;
        color: #7D7F81;
        font-weight: bold;
        letter-spacing: 2px
      }
  }
}
.form{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 15%;
  width: 370px;
  height: 450px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #FFFFFF;
  h1{
    margin-top: 30px;
    margin-left: 55px;
    width: 56px;
    height: 40px;
    font-weight: bold;
    border-bottom: $titleColor solid 2px;
    color: $titleColor;
  }
  .form-container{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 20px;
    .showCode{
      position: absolute;
      top: 210px;
      left: 138px;
      width: 74px;
      height: 32px;
      background-color: #D9D9D9;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  h6{
    position: absolute;
    left: 220px;
    top: 230px;
    font-size: 11px;
    color: $blueColor;
    cursor: pointer;
  }
  .loginOption{
    .registerOption,.forgetPswOption{
        position: absolute;
        top: 265px;
        font-size: 12px;
        color: $blueColor;
    }
    .forgetPswOption{
      margin-left:40px;
    }
  }
}
</style>