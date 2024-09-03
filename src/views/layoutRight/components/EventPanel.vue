<script setup lang='ts'>
{/* <Textarea v-model:value="str"></Textarea>
<Button @click="save">保存</Button>
<Textarea v-model:value="fn"></Textarea>
<Button @click="run">执行</Button> */}
// const str = ref('')
// const fn = ref('')
// function save() {
//     if (currentNode && currentNode.value) {
//         currentNode.value.val = str.value
//     }
// }
// function run() {
//     // 使用.bind()创建一个新函数，该函数的this被永久绑定到obj  
//     let func = new Function(fn.value);
//     let newFn = func.bind(_state)
//     newFn()
// }
</script>

<template>
    <div class="event-panel">
        <h1>事件面版</h1>
    </div>
</template>

<style scoped>
</style>