<script setup>
import Render from './Render.vue';
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
import { onMounted, ref } from 'vue';
const myRef = ref('')
onMounted(() =>{
    props.schema.setClientRect( myRef.value.getBoundingClientRect())
})
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