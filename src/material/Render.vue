<script setup>

const props = defineProps({
    schema: {
        type: Object,
        default: () => { }
    }
})
</script>

<template>
    <template v-if="schema.display === 'inline-block'">
        <component :is="schema.componentName" :children="schema.children || []" :schema="schema">
        </component>
    </template>
    <template v-else class="c_wrap">
        <component :is="schema.componentName" :children="schema.children || []" :schema="schema">
            <Empty v-if="!schema.children || schema.children.length === 0" />
        </component>
    </template>
</template>

<style scoped lang="scss">
.c_wrap {
    // background-color: white;
}
</style>