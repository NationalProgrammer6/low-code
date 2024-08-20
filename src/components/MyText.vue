<script setup>
import { currentSchema } from '@/stores/globalData.js'
import { _state, _stateKeys } from '@/stores/index.js'
const props = defineProps({
    schema: {
        type: Object,
        default: () => {}
    },
    children: {
        type: Array,
        default: () => []
    }
})
let key = ref(null)
import { ref, watch } from 'vue';
watch(currentSchema,(newValue)=>{
    if(newValue){
        key.value = newValue.val
    } else {
        key.value = null
    }
},{deep: true})
</script>

<template>
    <span class="txt"  :id="schema.id">{{ schema?.label }}</span>
</template>

<style scoped>
.txt{
    color: aqua;
}
</style>