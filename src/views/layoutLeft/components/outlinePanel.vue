<script setup>
import { Input, Tree } from 'ant-design-vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { schemaJson } from '@/stores/globalData.js'
import { ref, watch } from 'vue'
const list = ref([])
watch(()=>schemaJson.value,(newValue) => {
    console.log(newValue)
    list.value = [{...newValue}]
},{
    immediate: true
})
</script>

<template>
    <div class="outline_panel">
        <div class="panel-title">
            大纲树
        </div>
        <div class="panel-search">
            <Input v-model:value="keyWord" placeholder="搜索组件">
            <template #suffix>
                <SearchOutlined />
            </template>
            </Input>
        </div>
        <div class="panel-body">
            <Tree :tree-data="list">
                
            </Tree>
        </div>
    </div>
    
</template>

<style lang="scss">
.outline_panel {
    width: 100%;
    height: 100%;

    .panel-title {
        height: 48px;
        padding: 0 15px;
        font-size: 16px;
        line-height: 48px;
        font-weight: 700;
    }

    .panel-search {
        height: 52px;
        padding: 0 16px;

    }
    .panel-body {
        box-sizing: border-box;
        border-top: 1px solid rgba(31, 56, 88, .1);
        max-height: calc(100% - 100px);
        overflow-y: auto;
        padding: 10px 0;
        .ant-tree-treenode{
            width: 100%;
            .ant-tree-node-content-wrapper{
                flex: 1;
            }
        }

    }
}
</style>