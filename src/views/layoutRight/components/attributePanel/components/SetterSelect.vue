<script setup>
import { defineEmits } from 'vue';  
import { Select } from 'ant-design-vue';
const props = defineProps({
    type: {
        type: String,
    },
    initialValue: {
        type: any
    },
    options: {
        type: Array,
        default: ()=>{
            return []
        }
    }
})
const value = ref("")
const emits = defineEmits(['change'])
function change(value){
    emits('change',value)
}
</script>

<template>
    <Select @change="change" :options="options" v-model:value="value"></Textarea>
</template>