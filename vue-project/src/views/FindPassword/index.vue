<script setup>
import { ref,onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()

import { getCaptchaAPI } from '@/apis/user';

const form = ref({
  userEmail: '',
  captcha:'', //用户输入的图形验证码
  checkKey:'', //将来请求传递的图形验证码唯一标识
  captchaUrl:'' //地址
})

const getCaptcha = async()=>{
  const data = await getCaptchaAPI()
  form.value.captchaUrl = data.captcha;
  form.value.checkKey = data.checkKey
}
onMounted(()=>getCaptcha())

// 规则数据对象
const rules = {
  userEmail: [
    { required: true, message: '账号不能为空',trigger:'blur' }
  ],
  captcha:[
    {required: true , message: '验证码不能为空',trigger:'blur' },
    { min: 4, max: 4, message:'验证码长度为4',trigger:'blur' }
  ]
}

const formRef = ref(null);

const doLogin = () => {
  const { userEmail, userPassword, captcha, checkKey } = form.value
  // 调用实例方法
  formRef.value.validate(async (valid) => {
   // valid: 所有表单都通过校验  才为true
   console.log(valid)
   // 以valid做为判断条件 如果通过校验才执行登录逻辑
   if (valid) {
     await userStore.getUserInfo({ userEmail, userPassword, captcha, checkKey })
   }
  })
}

</script>

<template>
    <div class="findPassword-container">
      <Header>
        <div><img src="../../assets/images/logo.png" alt=""></div>
        <div>Aqua code</div>
        <div>首页</div>
      </Header>
      <div class="form">
         <h1>找回密码</h1>
         <div class="line"></div>
         <div class="form-container">
            <el-form :hide-required-asterisk="true" ref="formRef" :model="form" :rules="rules" label-position="top" label-width="60px" status-icon>
              <el-form-item prop="userEmail" label="账号">
                <el-input v-model="form.userEmail"  placeholder="请输入您的邮箱" />
              </el-form-item>
              <el-form-item prop="captcha" label="验证码" style="margin-top: 21px;">
                <el-input v-model="form.captcha" style="width: 130px;" placeholder="请输入验证码" />
              </el-form-item>
              <div class="showCode">
               <img v-if="form.captchaUrl" :src="form.captchaUrl" alt="">
              </div>
              <h6 @click="getCaptcha">换一张</h6>
              <el-button size="large"style="width: 190px; height: 40px; margin-left: 55px; margin-top: 108px;">
              确认</el-button>
            </el-form>
         </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
.findPassword-container{
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 100vh;
  background: url(../../assets/images/background.png) no-repeat;
  background-size: cover;
}
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
.form{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 380px;
  height: 450px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #FFFFFF;
  h1{
   margin-top: 30px;
   margin-left: 55px;
   width: 112px;
   height: 40px;
   font-weight: bold;
   color: $titleColor;
  }
  .line{
   width: 60px;
   height: 2px;
   margin-left: 56px;
   background-color: #0059DD;
  }
  .form-container {
   position: absolute;
   left: 50%;
   transform: translateX(-50%);
   margin-top: 30px;
   .showCode{
     width: 74px;
     height: 32px;
     background-color: #D9D9D9;
     position: absolute;
     top: 120px;
     left: 140px;
     img {
      width: 100%;
      height: 100%;
     }
   }
   h6{
   position: absolute;
   left: 220px;
   top: 135px;
   font-size: 11px;
   color: $blueColor;
   cursor: pointer;
  }
 }
}
</style> 