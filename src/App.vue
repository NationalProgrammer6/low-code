<script setup>
import { RouterView } from 'vue-router'
// const modules = import.meta.glob('./views/test/**/index.vue');
// console.log(2,modules)
// Object.keys(modules).map(async (path) => {
//   const routePath = path
//     .replace('../views/', '')
//     .replace('/index.vue', '');
//     let com = await modules[path]()
//     console.log(com)
//     console.log(routePath)
// })
</script>

<template>
  <RouterView />
</template>

<style scoped>
#app{
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
