<script setup>
import { defineEmits, defineOptions, ref } from 'vue';  
import { Select } from 'ant-design-vue';
const props = defineProps({
    type: {
        type: String,
    },
    initialValue: '',
    options: {
        type: Array,
        default: ()=>{
            return []
        }
    }
})
const value = ref(props.initialValue)
const emits = defineEmits(['change'])
function change(value){
    emits('change',props.type,value)
}
defineOptions({
    name: 'SetterSelect'
})
</script>

<template>
    <div>
    <Select @change="change" :options="options" v-model:value="value"></Select>
    </div>
</template>