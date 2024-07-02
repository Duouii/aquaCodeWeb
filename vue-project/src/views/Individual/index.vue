<script setup>
import IndividualHeader from './components/IndividualHeader.vue'
import IndividualLesson from './components/IndividualLesson.vue'
import IndividualHomeExercise from './components/IndividualExercise.vue'

</script>
<template>
  <div class="container">
    <IndividualHeader />
    <div class="flex">
      <div class="l"><IndividualLesson /></div>
      <div class="r"><IndividualHomeExercise /></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 1092px;
  .flex {
    width: 1092px;
    margin-top: 32px;
    display: flex;
    flex-direction: row;
    .l{
      width: 597px;
    }
    .r {
      width: 464px;
    }
  }
}

</style>
