<script setup>
import Nav from './components/Nav.vue'
</script>

<template>
  <div class="contanier">
    <Nav />
    <RouterView /> 
  </div>
  
</template>
<style lang="scss" scoped>
.contanier{
  position: relative;
  display: flex;
  width: 100%;
  min-height: 1100px;
  background-color: #f2f4f7;
}
</style>