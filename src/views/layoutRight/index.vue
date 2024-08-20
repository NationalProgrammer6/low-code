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
            <Textarea v-model:value="str"></Textarea>
            <Button @click="save">保存</Button>
            <Textarea v-model:value="fn"></Textarea>
            <Button @click="run">执行</Button>
            <AttributePanel v-show="activeKey === '属性'" />
            <EventPanel v-show="activeKey === '样式'" />
            <StylePanel v-show="activeKey === '事件'" />
        </div>
    </div>
</template>

<script setup>
import AttributePanel from './components/AttributePanel.vue';
import EventPanel from './components/EventPanel.vue';
import StylePanel from './components/StylePanel.vue';
import { Textarea, Button } from 'ant-design-vue'
import MyTabs from './components/MyTabs.vue'
import { RightOutlined } from '@ant-design/icons-vue';
import { _state, _stateKeys } from '@/stores/index.js'
import { ref } from 'vue'
const navList = ["页面", "Flex", 'Txt']
const activeKey = ref('属性')
import { currentSchema, schemaJson } from '@/stores/globalData.js'
const str = ref('')
const fn = ref('')
function save() {
    if (currentSchema && currentSchema.value) {
        currentSchema.value.val = str.value
    }
}
function run() {
    // 使用.bind()创建一个新函数，该函数的this被永久绑定到obj  
    let func = new Function(fn.value);
    let newFn = func.bind(_state)
    newFn()
}
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
        height: calc(100% - 66px);
        overflow-y: auto;
    }
}
</style>