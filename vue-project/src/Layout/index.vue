<script setup>
import LayoutNav from '@/Layout/component/LayoutNav.vue'
</script>
<template>
  <div class="contanier">
    <LayoutNav></LayoutNav>
    <RouterView />
  </div>
</template>
<style lang="scss" scoped>
.contanier{
  position: relative;
  display: flex;
  width: 100%;
  height: 3000px;
  background: url(../assets/images/Layout.png) no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
</style>