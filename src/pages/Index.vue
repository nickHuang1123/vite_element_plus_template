<script setup>
import { ref } from 'vue'
import vite from '/vite.svg'
import vue from '@/assets/svg/vue.svg'
import elementPlus from '@/assets/svg/element-plus.svg'

const outJuJuJu = ref(0)
</script>

<template>
  <div class="flex-space-between">
    <a href="https://vitejs.dev" target="_blank">
      <img :src="vite" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img :src="vue" class="logo vue" alt="Vue logo" />
    </a>
    <a href="https://element-plus.org/" target="_blank">
      <img :src="elementPlus" class="logo element-plus" alt="element-plus logo" />
    </a>
  </div>
  <HelloNick v-model="outJuJuJu" :msg="`Vite + Vue + ElementPlus | 啾啾啾 - 外 ${outJuJuJu}`" />
</template>