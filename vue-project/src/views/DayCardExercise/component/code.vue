<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CodeMirror from 'vue-codemirror6'
import { oneDark } from '@codemirror/theme-one-dark'
import { json } from '@codemirror/lang-json';
import { javascript } from '@codemirror/lang-javascript';
import {java} from '@codemirror/lang-java'

let codeVal = ref('');

const lang = javascript();

const extensions = [oneDark];
onMounted(() => {
})
</script>
<template>
  <div class="main">
    <code-mirror 
      v-model:codeVal="codeVal" 
      basic 
      :indent-with-tab="true"
      :tabSize="2"
      :lang="lang" 
      style="height: 400px; width: 680px" 
      :extensions="extensions"
      placeholder="请输入"
    />
  </div>
</template>
<style>
.cm-editor {
  height: 100%;
}
</style>
