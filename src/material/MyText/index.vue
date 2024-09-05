<script setup>
import { currentNode } from '@/stores/globalData.js'
import { defineOptions } from 'vue';
defineOptions({
    name: 'MyText',
})
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
watch(currentNode,(newValue)=>{
    console.log(222,newValue)
    if(newValue){
        key.value = newValue.val
    } else {
        key.value = null
    }
},{deep: true})
</script>

<template>
    <component :is="schema.props.type" :id="schema.id" class="txt"> {{ schema.props.txt || schema.label}}</component>
</template>

<style scoped>
.txt{
    color: aqua;
}
</style>