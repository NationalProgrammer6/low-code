<script setup>
import Render from '../Render.vue';
import { ref } from 'vue';
import { defineOptions } from 'vue';
defineOptions({
    name: 'MyFlex',
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
const myRef = ref('')
</script>

<template>
    <div class="my-flex" ref="myRef" :id="schema.id">
        <template v-if="children && children.length > 0">
            <Render v-for="item in children" :key="item.id" :schema="item"></Render>
        </template>
        <template v-else>
            
        </template>
        <slot></slot>
    </div>
</template>

<style scoped>
.my-flex{
    /* background-color: #eaeaea; */
}
</style>