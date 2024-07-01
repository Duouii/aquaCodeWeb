<script setup>
  import { getCaptchaAPI } from '@/apis/user.js'
  import { onMounted } from 'vue'
  onMounted(()=>getCaptchaAPI())
</script>
<template>
     <el-button type="primary">取消</el-button>
    <h1>对</h1>
</template>
<style lang="scss" scoped>
h1 {
  color: $titleColor;
}
</style>