<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()
import { getCaptchaAPI } from '@/apis/user';

const form = ref({
  userName:'',
  userEmail: '',
  userPassword: '',
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
  userName: [
    { required: true, message: '用户名不能为空',trigger: 'blur' },
  ],
  userEmail: [
    { required: true, message: '账号不能为空',trigger: 'blur' }
  ],
  userPassword: [
    { required: true, message: '密码不能为空',trigger: 'blur' },
    { min: 6, message: '密码长度至少为6个字符',trigger: 'blur' }
  ],
  captcha:[
    {required: true , message: '验证码不能为空',trigger: 'blur' },
    { min: 4, max: 4, message:'验证码长度为4',trigger: 'blur' }
  ]
}

const formRef = ref(null);

const doRegister = async() => {
  const data = form.value
  formRef.value.validate(async (valid) => {
   if (valid) {
     await userStore.getRegister(data)
   }
  })
};
</script>

<template>
    <div class="register-container">
      <Header>
        <div><img src="../../assets/images/logo.png" alt=""></div>
        <div>Aqua code</div>
        <div>首页</div>
      </Header>
      <div class="form">
        <h1>注册</h1>
        <h3>您可以通过邮箱注册</h3>
        <div class="account-box">
          <div class="form-container">
            <el-form :hide-required-asterisk="true" ref="formRef" :model="form" :rules="rules" label-position="top" label-width="60px" status-icon>
              <el-form-item prop="userName" label="用户名">
                <el-input v-model="form.userName" placeholder="请输入您的用户名" />
              </el-form-item>
              <el-form-item prop="userEmail" label="账号" style="margin-top: 18px;">
                <el-input v-model="form.userEmail" placeholder="请输入您的邮箱" />
              </el-form-item>
              <el-form-item prop="userPassword" label="密码" style="margin-top: 18px;">
                <el-input v-model="form.userPassword" placeholder="请输入您的密码" show-password />
              </el-form-item>
              <el-form-item prop="captcha" label="验证码" style="margin-top: 18px;">
                <el-input v-model="form.captcha" style="width: 130px;" placeholder="请输入验证码" />
              </el-form-item>
              <div class="showCode">
               <img v-if="form.captchaUrl" :src="form.captchaUrl" alt="">
              </div>
              <h6 @click="getCaptcha">换一张</h6>
              <el-button size="large" style="width: 190px;height: 40px; margin-left: 35px; margin-top: 20px;" @click="doRegister">注册</el-button>
             </el-form>
          </div>
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
.register-container{
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
  height: 500px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #FFFFFF;
  h1{
   margin-top: 30px;
   margin-left: 58px;
   width: 58px;
   height: 40px;
   font-weight: bold;
   border-bottom: $titleColor solid 2px;
   color: $titleColor;
  }
  h3{
   position: absolute;
   top: 50px;
   left: 120px;
   font-size: 14px;
   color: #7D7F81;
  }
  .form-container{
   position: absolute;
   left: 50%;
   transform: translateX(-50%);
   margin-top: 20px;
   .showCode{
      position: absolute;
      top: 291px;
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
   top: 310px;
   font-size: 11px;
   color: $blueColor;
   cursor: pointer;
  }
}
</style> 