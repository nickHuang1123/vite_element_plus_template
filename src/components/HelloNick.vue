<script setup>
import { computed } from 'vue'
import { ElMessage } from 'element-plus'
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  msg: String,
})

const emit = defineEmits(['update:modelValue'])

const inJuJuJu = computed({
  get: () => props.modelValue,
  set: (ju) => emit('update:modelValue', ju),
})

function testJu() {
  ElMessage({
    message: '啾啾啾.',
    type: 'warning',
  })
  inJuJuJu.value += 1
}
</script>

<template>
  <h2>{{ msg }}</h2>

  <div class="card">
    <el-button type="primary" size="large" @click="testJu">啾啾啾 - 裏 {{ inJuJuJu < 10 ? `0${inJuJuJu}` : inJuJuJu }}</el-button>
    <p>
      每次範例都是 count，我覺得沒有靈魂所以就改成了 啾啾啾 +1
    </p>
    <p>
    主要整合了<b>element-plus 按需引入</b>及<b>element-variables.scss 主題參數</b>引入及打包上的一些設置處理
  </p>
  </div>
  <el-divider></el-divider>
  <el-row justify="space-around">
    <el-col :span="12">
      element-plus 按需引入
      <ul style="text-align: left;">
        <li>unplugin-auto-import</li>
        <li>unplugin-element-plus</li>
        <li>unplugin-vue-components</li>
      </ul>
    </el-col>
    <el-col :span="12">
      打包處理 vite.config
      <ul style="text-align: left;">
        <li>terser</li>
        <li>rollup-plugin-external-globals</li>
        <li>rollup-plugin-visualizer</li>
        <li>vite-plugin-compression</li>
        <li>vite-plugin-html</li>
      </ul>
    </el-col>
  </el-row>
</template>