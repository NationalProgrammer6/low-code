<script setup>
import { defineEmits, ref  } from 'vue';  
import { Textarea} from 'ant-design-vue';
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
    name: 'SetterInput'
})
</script>

<template>
    <Textarea @change="change" v-model:value="value"></Textarea>
</template>