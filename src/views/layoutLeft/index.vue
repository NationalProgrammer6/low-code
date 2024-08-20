<script setup>
import { ref, computed } from 'vue'
import MateriaPanel from './components/materialPanel.vue'
import OutlinePanel from './components/outlinePanel.vue';
import dataPanel from './components/dataPanel.vue';
import { Tooltip } from 'ant-design-vue';
import { MenuFoldOutlined, ClusterOutlined, CodeOutlined, CodeSandboxOutlined } from '@ant-design/icons-vue';

const expand = ref(true)

const navList = [
    { title: '大纲', icon: ClusterOutlined, key: 'OutlinePanel',component: OutlinePanel},
    { title: '组件', icon: CodeSandboxOutlined, key: 'MateriaPanel',component: MateriaPanel},
    { title: '数据源', icon: CodeOutlined, key: 'DataPanel',component: dataPanel},
]
const active = ref('组件')

const activePanel = computed(()=>{
    let panel = navList.find(item => item.title === active.value)
    return panel.component
})

</script>

<template>
    <div :class="['layout-left', expand ? 'expand' : '']">
        <div class="the-left-nav">
            <template v-for="item in navList" :key="item.icon">
                <Tooltip placement="right" @click="expand = true">
                    <template #title>
                        <span>{{ item.title }}</span>
                    </template>
                    <div @click="active = item.title" :class="{'active':active === item.title}">
                        <component :is="item.icon"></component>
                    </div>
                </Tooltip>
            </template>
        </div>
        <div class="the-left-panel">
            <component :is="activePanel"></component>
            <!-- <MateriaPanel></MateriaPanel> -->
        </div>
        <!-- 底部暂开&&收起 -->
        <div class="close-wrap" @click="expand = !expand">
            <div class="icon-btn">
                <MenuFoldOutlined />
            </div>
        </div>
    </div>
</template>


<style lang="scss">
.layout-left {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    width: 48px;
    padding-bottom: 40px;
    transition: all 0.3s;
    border-top: 1px solid #edeff3;
    overflow: hidden;
    &.expand {
        width: 320px;
        .close-wrap .icon-btn svg {
            transform: rotate(0deg);
        }
    }

    .the-left-nav {
        padding-top: 20px;
        width: 48px;
        height: 100%;
        display: flex;
        flex-direction: column;
        border-right: 1px solid #eaeaea;
        gap: 15px;
        font-size: 20px;
        flex: 0 0 48px;
        >div{
            text-align: center;
            cursor: pointer;
            &.active{
                color: #0079f2;
            }
        }
    }
    .the-left-panel{
        width: 272px;
        height: 100%;
        flex: 0 0 272px;
        background-color: white;
    }

    .close-wrap {
        position: absolute;
        width: 100%;
        height: 40px;
        bottom: 0;
        box-shadow: 0 0 6px -3px #409EFF;

        .icon-btn {
            display: flex;
            width: 48px;
            height: 40px;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            svg {
                transition-delay: 0.2s;
                transform: rotate(180deg);
            }
        }
    }
}
</style>