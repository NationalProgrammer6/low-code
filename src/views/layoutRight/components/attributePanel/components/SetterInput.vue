<script setup>
import { defineEmits } from 'vue';  
import { Textarea} from 'ant-design-vue';
const props = defineProps({
    type: {
        type: String,
    },
    initialValue: {
        type: any
    }
})
const emits = defineEmits(['change'])
function change(){

}
</script>

<template>
    <Textarea @change="change"></Textarea>
</template>