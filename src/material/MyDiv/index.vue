<script setup>
import Render from '../Render.vue';
import { ref } from 'vue';
import { defineOptions } from 'vue';
defineOptions({
    name: 'MyDiv',
})
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
const myRef = ref('')
</script>

<template>
    <div class="my-div" ref="myRef" :id="schema.id">
        <template v-if="children && children.length > 0">
            <Render v-for="item in children" :key="item.id" :schema="item"></Render>
        </template>
        <slot></slot>
    </div>
</template>

<style scoped>
.my-div{
    background-color: white;
}
</style>