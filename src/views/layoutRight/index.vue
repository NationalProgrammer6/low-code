<template>
    <div class="layout-right">
        <div class="setting-path">
            <template v-for="(item, index) in navList">
                <span class="nav-txt">{{ item }}</span>
                <span class="nav-next" v-if="index !== navList.length - 1">
                    <RightOutlined />
                </span>
            </template>
        </div>
        <div class="seting-menu">
            <MyTabs v-model="activeKey"></MyTabs>
        </div>
        <div class="setting-page">
            <AttributePanel v-show="activeKey === '属性'"  />
            <EventPanel v-show="activeKey === '样式'" />
            <StylePanel v-show="activeKey === '事件'" />
        </div>
    </div>
</template>

<script setup>
import AttributePanel from './components/attributePanel/index.vue';
import EventPanel from './components/EventPanel.vue';
import StylePanel from './components/StylePanel.vue';
import MyTabs from './components/MyTabs.vue'
import { RightOutlined } from '@ant-design/icons-vue';
import { _state, _stateKeys } from '@/stores/index.js'
import { ref } from 'vue'
const navList = ref(["页面", "Flex", 'Txt'])
const activeKey = ref('属性')
import { currentNode, materialMap } from '@/stores/globalData.js'
import { watch } from 'vue';



function getNavPath(node, arr){
    if(node && node.type){
        arr.push(node.type)
    }
    if(node && node.parent){
        getNavPath(node.parent,arr)
    }
    return arr
}

let formData = {}
//  选中的节点发生变化时 
watch(()=>currentNode.value.id,()=>{
    navList.value = getNavPath(currentNode.value,[])
    formData = materialMap.get(currentNode.value.type)
})
</script>

<style scoped lang="scss">
.layout-right {
    width: 400px;

    .setting-path {
        padding: 0 14px;
        font-size: 12px;
        height: 32px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #dcdfe6;

        .nav-txt {
            cursor: pointer;
        }

        .nav-next {
            margin: 0 8px;
        }
    }

    .seting-menu {
        height: 33px;
        border-bottom: 1px solid #dcdfe6;
    }

    .setting-page {
        padding: 8px;
        height: calc(100% - 66px);
        overflow-y: auto;
    }
}
</style>