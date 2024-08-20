<template>
    <div class="empty-page"> 拖拽组件或模板到这里 {{ nanoid(10) }} </div>
</template>

<script setup>
import { nanoid } from 'nanoid'
</script>

<style>
.empty-page{
    display: flex;
    height: 100%;
    width: 100%;
    min-height: 60px;
    background-color: #f0f0f0;
    border: 1px dotted;
    color: #a7b1bd;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>