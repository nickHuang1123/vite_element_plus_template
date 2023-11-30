const TITLE = 'Vite ElementPlus Vue Template'

import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'

import path from 'path'

import Components from 'unplugin-vue-components/vite'

import ElementPlus from 'unplugin-element-plus/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { visualizer } from 'rollup-plugin-visualizer'
import externalGlobals from 'rollup-plugin-external-globals'
import viteCompression from 'vite-plugin-compression'
import { createHtmlPlugin } from 'vite-plugin-html'

let cdn = ''
const cdnDomain = 'https://cdn.jsdelivr.net/npm/'

// 須注意版號是否有跟 package.json 一致
const cdnData = [
  'vue@3.3.8/dist/vue.runtime.global.prod.js',
  'vue-demi@0.14.6/lib/index.iife.min.js',
  'pinia@2.1.7/dist/pinia.iife.min.js',
  'vue-router@4.2.5/dist/vue-router.global.min.js',
  'element-plus@2.4.3/dist/index.full.min.js',
]

cdnData.forEach((str) => (cdn += `<script src="${cdnDomain}/${str}"></script>`))

export default () => {
  return defineConfig({
    server: {
      host: '0.0.0.0'
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/styles/element-variables.scss" as *;`
        }
      }
    },
    plugins: [
      vue(),
      Components({
        dts: true,
        resolvers: [ElementPlusResolver({
          importStyle: 'sass'
        })],
      }),
      ElementPlus({
        useSource: true,
      }),
      // 打包產生 stats.html 解析圖表
      visualizer({ open: true }),
      // gzip 壓包
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      }),
      // EJS 模板注入 html 功能
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: TITLE,
            injectScriptCss: process.env.NODE_ENV === 'production' ? cdn : ''
          }
        }
      })
    ],
    build: {
      minify: 'terser',
      // 生產環境移除 Log
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          // 指定打包 file name
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        },
        // 略過打包項目
        external: ['vue-demi', 'pinia', 'vue', 'vue-router', 'element-plus'],
        plugins: [
          // 暴露參數供外部 CDN 連結調用
          externalGlobals({
            // vue-demi 由於 element-plue、pinia 都要調用此依賴項所以也得優先引入，否則會 Error
            ['vue-demi']: 'VueDemi',
            pinia: 'Pinia',
            vue: 'Vue',
            ['vue-router']: 'VueRouter',
            ['element-plus']: 'ElementPlus',
          })
        ]
      }
    }
  })
}
