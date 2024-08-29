<script setup>
import { Button } from 'ant-design-vue';
import { defineOptions } from 'vue';
defineOptions({
    name: 'MyButton',
})
const props = defineProps({
    schema: {
        type: Object,
        default: () => {
            return {}
        }
    },
    children: {
        type: Array,
        default: () => {
            return []
        }
    }
})

</script>

<template>
    <Button type="primary" :id="schema.id">{{ schema?.label }}</Button>
</template>

<style scoped>

</style>