<script setup>
import Nav from './components/Nav.vue'
import SideBar from './components/SideBar.vue'
</script>
<template>
  <div class="div">
    <Nav></Nav>
    <div class="content">
      <div class="l">
        <SideBar></SideBar>
      </div>
      <div class="r">
        <RouterView />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.div {
  width: 100vw;
  height: 100vh;
  background-color: #D9D9D9;
}
.content {
  padding-top: 79px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.l {
  width: 16%;
  height: 100%;
}
.r {
  width: 84%;
  height: 100%;
  padding-left: 18px;
  padding-top: 14px;
  padding-right: 20px;
}
</style>