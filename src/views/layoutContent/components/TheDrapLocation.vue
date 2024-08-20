<script setup>
import { onMounted, ref } from 'vue'
const style = ref({})

/**
 * 现实组件
 * @param {Object}
 */
function show(location) {
    style.value = {
        width: location.width + 'px',
        height: location.height + 'px',
        left: location.left + 'px',
        top: location.top + 'px',
        opacity: location.opacity ? location.opacity : 1
    }
}
// 隐藏组件
function hide() {
    setTimeout(() => {
        style.value = {
            width: 0,
            height: 0
        }
    },82)
}

defineExpose({
    show,
    hide,
})
onMounted(() => {
    window.addEventListener('drop', hide)
})
</script>

<template>
    <div class="drap-location" :style="style"></div>
</template>

<style scoped>
.drap-location {
    position: absolute;
    pointer-events: none;
    background-color: #aa0000
}
</style>