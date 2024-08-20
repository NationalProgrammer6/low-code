<script setup>
import LayouLeft from './layoutLeft/index.vue';
import LayoutRight from './layoutRight/index.vue';
import LayoutContent from './layoutContent/index.vue'
</script>

<template>
  <div class="layout-header"></div>
  <div class="layout-body">
    <!-- 左边面板 -->
    <LayouLeft />
    <!-- 中间画布 -->
    <LayoutContent />
    <!-- 设置面板 -->
    <LayoutRight />
  </div>
</template>

<style lang="scss">
.layout-header{
    height: 48px;
    border-bottom: 1px solid rgba(18, 32, 50, 0.1);
  }
.layout-body {
    width: 100%;
    height: calc(100% - 48px);
    display: flex;
    flex-wrap: nowrap;
}
</style>