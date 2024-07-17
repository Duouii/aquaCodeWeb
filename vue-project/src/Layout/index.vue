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
  min-height: 800px;
}
</style>