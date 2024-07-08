<script setup>
import { ref} from 'vue'
import {putUserAvatarAPI} from '@/apis/user'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
const userStore = useUserStore()
const userInfo = userStore.userInfo;
const router = useRouter()

const returnPage = ()=>{
  router.push('/');
  userStore.getUserInfo()
}
const activeTab = ref('info');
const selectTab = (tab) => {
  activeTab.value = tab
}

const uploadUrl = '/common/upload'
const handleAvatarSuccess = async (res) => {
  if (res) {
    userInfo.userAvatar = res;
  } else {
    console.error('No image URL received from upload API');
  }
};

const beforeAvatarUpload = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await putUserAvatarAPI(formData);
  handleAvatarSuccess(res);
  ElMessage({ type: 'success', message: '上传成功' })
  return false; 
};

const infoUpdate=ref({
  userName:'',
  userProfile:'',
  oldPassword:''
})
const pswUpdate=ref({
  oldPassword:'',
  userPassword:'',
  userPasswordAgain:''
})
const pswRules = {
  oldPassword:[
    { required: true, message: '密码不能为空',trigger:'blur' },
  ],
  userPassword:[
    { required: true, message: '密码不能为空',trigger:'blur' },
    { min: 6, message: '密码长度至少为6个字符',trigger:'blur' }
  ],
  userPasswordAgain:[
    { required: true, message: '密码不能为空',trigger:'blur' },
    { min: 6, message: '密码长度至少为6个字符',trigger:'blur' }
  ]
}
const formRefInfo = ref(null);

const doUpdateInfo = async()=>{
  const data = infoUpdate.value
  await userStore.putUserInfo(data)
    infoUpdate.value.userName='',
    infoUpdate.value.userProfile=''
}

const formRefPsw = ref(null);
const doUpdatePsw = () =>{
  formRefPsw.value.validate(async(valid)=>{
    if(pswUpdate.value.userPassword === pswUpdate.value.userPasswordAgain){
      if(valid){
        await userStore.putUserPsw(pswUpdate.value.oldPassword, pswUpdate.value.userPassword)
        pswUpdate.value.oldPassword='';
        pswUpdate.value.userPassword='';
        pswUpdate.value.userPasswordAgain='';
      }
    }else{
      ElMessage({ type: 'error', message: '两次输入密码不一致，请重新输入' });
    }
  })
}

</script>
<template>
  <div class="background">
    <div class="container">
      <div class="return-btn"><el-button class="return" plain @click="returnPage"><img src="../../assets/icons/Vector 202.png" alt=""></el-button></div>
      <div class="left-nav">
      <div class="option option-info" :class="{active:activeTab === 'info'}" @click="selectTab('info')">
        <div class="icon-info fl" :class="{active:activeTab === 'info'}"></div>
        <span class="info fl">个人信息</span>
      </div>
      <div class="option option-psw" :class="{active:activeTab === 'psw'}" @click="selectTab('psw')">
        <div class="icon-psw fl" :class="{active:activeTab === 'psw'}"></div>
        <div class="psw fl">修改密码</div>
      </div> 
      </div>
      <div class="right-Contain">
        <div class="info-Contain" v-if="activeTab === 'info'">
          <div class="showUserAvatar">
            <el-upload
              action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              >         
              <img v-if="userInfo.userAvatar" :src="userInfo.userAvatar" class="avatar" />
              <div v-else class="nameFirst">{{ userInfo.userName?.charAt(0) }}</div>
            </el-upload>
          </div>
          <div class="info-update">
            <el-form :hide-required-asterisk="true" ref="formRefInfo" :model="infoUpdate" label-position="top" label-width="60px" status-icon>
              <div class="spot fl"></div>
              <el-form-item prop="userName" label="昵称" >
                <el-input v-model="infoUpdate.userName" :placeholder="userInfo.userName" maxlength="10"/>
              </el-form-item>
              <div class="spot fl"></div>
              <el-form-item prop="userProfile" label="个性签名" >
                <el-input class="textarea" type="textarea" :autosize="{minRows: 2, maxRows: 5}" v-model="infoUpdate.userProfile" :placeholder="userInfo.userProfile" maxlength="40"/>
              </el-form-item>
              <el-button class="subBtn" @click="doUpdateInfo">确认修改</el-button>
            </el-form>
          </div>
        </div>
        <div class="psw-Contain" v-if="activeTab === 'psw'">
          <div class="psw-update">
            <el-form :hide-required-asterisk="true" ref="formRefPsw" :model="pswUpdate" :rules="pswRules" label-position="top" label-width="60px" status-icon>
              <div class="userOldPassword-update">
                <el-form-item prop="oldPassword" label="原密码" >
                  <el-input v-model="pswUpdate.oldPassword" placeholder="请输入原本使用的密码" />
                </el-form-item>
              </div>
              <div class="userPassword-update">
                <el-form-item prop="userPassword" label="新密码" >
                  <el-input v-model="pswUpdate.userPassword" placeholder="请输入新密码" />
                </el-form-item>
              </div>
              <div class="userPasswordAgain-update">
                <el-form-item prop="userPasswordAgain" label="重复新密码" >
                  <el-input v-model="pswUpdate.userPasswordAgain" placeholder="请输入新密码" />
                </el-form-item>
              </div>
              <el-button class="subBtn" @click="doUpdatePsw">确认修改</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
::v-deep .el-input__wrapper {
  box-shadow: 0 0 0 1px #7D7F81;
}
.el-input{
  height: 48px;
  width: 338px;
  margin-bottom: 30px;
}
::v-deep .el-textarea__inner {
  background-color: #F4F5F5;
  resize: none;
  border-radius: 8px;
  box-shadow: none;
}
::v-deep .el-form-item__error {
  top: 67%;
}
.background{
  position: relative;
  display: flex;
  width: 100%;
  background: url(../../assets/images/Layout.png) no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
.container{
  display: flex;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 981px;
  margin-top: 125px;
  border-radius: 4px;
}
.return-btn .el-button{
  position: absolute;
  left: -119px;
  width: 46px;
  height: 46px;
  border-radius: 46px;
  background-color: #fff;
  img{
    width: 5.83px;
    height: 11.67px;
  }
}
.left-nav{
  width: 212px;
  height: 591px;
  border-radius: 4px;
  background-color: #FFFFFF;
  .option{
    width: 125px;
    height: 43px;
    color: #7D7F81;
    font-weight: 400;
    border-radius: 39px;
  }
  .option.active{
    color: #000000;
    background-color: #E5E5E7;
  }
  .icon-info,.icon-psw{
    width: 22px;
    height: 22px;
    margin-top: 9px;
    margin-left: 17px;
  }
  .info,.psw{
    margin-left: 5px;
    margin-top: 9px;
    font-size: 16px;
  }
  .option-info{
    position: absolute;
    left: 47px;
    top: 87px;
    .icon-info{
      background: url(../../assets/icons/icon-info.png) no-repeat;
      background-size: 22px 22px;
    }
    .icon-info.active{
      background: url(../../assets/icons/icon-info-active.png) no-repeat;
      background-size: 22px 22px;
    }
  }
  .option-psw{
    position: absolute;
    left: 47px;
    top: 143px;
    .icon-psw{
      background: url(../../assets/icons/icon-psw.png) no-repeat;
      background-size: 22px 22px;
    }
    .icon-psw.active{
      background: url(../../assets/icons/icon-psw-active.png) no-repeat;
      background-size: 22px 22px;
    }
  }
}
.right-Contain{
  margin-left: 24px;
  width: 745px;
  height: 591px;
  border-radius: 4px;
  background-color: #FFFFFF;
  .el-button{
  width: 118px;
  height: 40px;
}
}
.info-Contain{
  margin-left: 85px;
  margin-top: 53px;
  .el-button {
    margin-top: 29px;
  }
  .showUserAvatar{
    width: 86px;
    height: 86px;
    margin-bottom: 27px;
    border-radius: 86px;
    background-size: 86px 86px;
    .nameFirst{
      width: 86px;
      height: 86px;
      border-radius: 86px;
      text-align: center;
      background-color: #deeafa;
      color: $blueColor;
      font-size: 50px;
      line-height: 86px;
    }
  }
  .info-update{
    width: 337px;
    height: 262px;
  }
  .spot{
    width: 4px;
    height: 4px; 
    margin-top: 9px;
    margin-right: 5px;
    border-radius: 4px;
    background-color: $blueColor;
  }
  .textarea{
    resize: none;
    width: 339px;
    outline-color: $blueColor;
    border-radius: 8px;
    font-size: 14px;
    background-color: #f5f4f5;
    border: 1px #7D7F81 solid;
    font-weight: 700;
  }
}
.psw-Contain{
    width: 400px;
    height: 400px;
    margin-left: 86px;
    margin-top: 97px;
    .psw-update{
      width: 339px;
      height: 378px;
    }
}
</style>