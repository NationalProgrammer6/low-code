<template>
    <div class="my-tabs">
        <div  v-for="item in list" :key="item" :class="['my-tabs-bar',model === item ? 'active' : '']"  @click="changeItem(item)">
            <span>{{ item }}</span>
        </div>
    </div>
</template>

<script setup>
const model = defineModel({ type: String })
const props = defineProps({
    list: {
        type: Array,
        default: () => ["属性","样式","事件"]
    }
})
function changeItem(itme){
    model.value = itme
}
</script>

<style scoped lang="scss">
.my-tabs{
    min-height: 32px;
    display: flex;
    flex-wrap: nowrap;
    font-size: 12px;
    .my-tabs-bar{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        position: relative;
        &.active{
            color: #5584ff;
            &::after{
                content: '';
                position: absolute;
                width: 100%;
                left: 0;
                bottom: 0;
                border-bottom: 2px solid #5584ff;
            }
        }
    }
}
</style>