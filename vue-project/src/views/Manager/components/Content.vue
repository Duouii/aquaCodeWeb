<script setup>
import {ref} from 'vue'
import difficultIcon from '@/assets/icons/icon-difficult.png'
import normalIcon from '@/assets/icons/icon-normal.png'
import easyIcon from '@/assets/icons/icon-easy.png'
import { useRouter } from "vue-router";
const router = useRouter();
const value = ref('')
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
const addQuestion = () => {
  router.push('/manageContent/addQuestion')
}
</script>
<template>
  <div class="background">
    <div class="header">
        <div class="flex flex-wrap gap-4 items-center">
          <el-select
            v-model="value"
            placeholder="选择难度"
            size="large"
            style="width: 165px"
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
        </div>
        <el-dropdown>
          <el-button type="primary">+</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="addQuestion">添加题目</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <div class="search">
          <div class="icon-search fl"></div>
          <input class="fl" type="text" placeholder="请输入你要找的题目/题目ID">
        </div>
    </div>
    <ul class="title">
      <li>
        <div class="circle"></div>
        <h6>11</h6>
        <span>循环综合</span>
        <div class="score"><el-rate v-model="score" :max="3" disabled/></div>
        <div class="label">二叉树</div>
        <h5>删除</h5>
        <RouterLink>修改</RouterLink>
      </li>
      <li>
        <div class="circle"></div>
        <h6>11</h6>
        <span>循环综合</span>
        <div class="score"><el-rate v-model="score" :max="3" disabled/></div>
        <div class="label">二叉树</div>
      </li>
      <li>
        <div class="circle"></div>
        <h6>11</h6>
        <span>题目</span>
        <div class="score"><el-rate v-model="score" :max="3" disabled/></div>
        <div class="label">二叉树</div>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.background {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.header {
  width: 100%;
  height: 88px;
}
.flex .el-select{
  float: left;
  margin-left: 36px;
  margin-top: 24px;
  border-radius: 4px;
  .el-select__wrapper{
    box-shadow: 0 0 0 1px rgba(0,0,0,0.0);
  }
}
.el-dropdown {
  float: right;
  margin-right: 39px;
  margin-top: 29px;
}
.el-button {
  width: 30px;
  height: 30px;
  border-radius: 30px !important;
  font-size: 30px;
  color: #fff;
}
.search{
  float: right;
  width: 612px;
  height: 40px;
  border-radius: 4px;
  margin-right: 29px;
  margin-top: 24px;
  background-color: #F4F5F5;
  .icon-search{
    width: 24px;
    height: 24px;
    background: url(../../../assets/icons/icon-search.png) no-repeat;
    background-size: 24px 24px;
    margin-left: 10px;
    margin-top: 8px;
  }
  input{
    font-size: 14px;
    color: #7D7F81;
    margin-left: 10px;
    width: 560px;
    height: 40px;
    background-color: transparent;
  }
}
.title {
  width: 100%;
  li {
    width: 100%;
    height: 48px;
    border-radius: 4px;
    .circle{
      float: left;
      width: 6px;
      height: 6px;
      border-radius: 6px;
      margin-left: 36px;
      margin-top: 20px;
      background-color: #34ECB5;
    }
    h6{
      float: left;
      font-size: 16px;
      margin-left: 4px;
      margin-top: 12px;
    }
    span {
      float: left;
      width: 80px;
      font-size: 16px;
      margin-left: 38px;
      margin-top: 12px;
      text-overflow:ellipsis;
      overflow:hidden;
      white-space: nowrap;
    }
    .score {
      float: left;
      margin-left: 39px;
      margin-top: 14px;
      width: 64.5px;
      height: 19.5;
    }
    .label {
      float: left;
      padding-left: 16px;
      padding-right: 16px;
      height: 24px;
      border-radius: 4px;
      color: #fff;
      text-align: center;
      line-height: 24px;
      margin-left: 43.5px;
      margin-top: 12px;
      background-color: #7DB1FF;
    }
    h5, a {
      float: right;
      font-size: 14px;
    }
    h5 {
      color: #FF1313;
      margin-right: 26px;
      margin-top: 14px;
      cursor: pointer;
    }
    a {
      color: #00C98D;
      margin-right: 36px;
      margin-top: 14px;
    }
  }
  li:hover {
    background-color: #EBF3FF;
  }
}
</style>