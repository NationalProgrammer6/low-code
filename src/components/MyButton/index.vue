<script setup>
import { Button } from 'ant-design-vue';
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
</script>

<template>
    <Button type="primary" :id="schema.id">{{ schema?.label }}</Button>
</template>

<style scoped>

</style>