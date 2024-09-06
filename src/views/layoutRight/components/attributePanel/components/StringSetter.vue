<script setup>
import { defineEmits, ref  } from 'vue';  
import { Textarea} from 'ant-design-vue';
import { defineOptions } from 'vue';
const props = defineProps({
    type: {
        type: String,
    },
    initialValue: ''
})
const value = ref(props.initialValue)
const emits = defineEmits(['change'])
function change(){
    emits('change',props.type,value)
}
defineOptions({
    name: 'StringSetter'
})
console.log(3333333)
</script>

<template>
    <Textarea @change="change" v-model:value="value"></Textarea>
</template>