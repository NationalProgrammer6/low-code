<script setup>
import { defineEmits } from 'vue';  
import { Textarea} from 'ant-design-vue';
const emits = defineEmits(['change'])
function change(){

}
</script>

<template>
    <Textarea @change="change"></Textarea>
</template>