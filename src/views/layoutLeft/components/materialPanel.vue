<script setup>
import { ref } from 'vue'
import { Collapse, CollapsePanel } from 'ant-design-vue';
import { currentMaterial, materialList } from '@/stores/globalData.js'
const activeKey = ref(['1'])
// 鼠标被按下
function mousedown(component) {
    currentMaterial.type = component.type
    currentMaterial.action = 'ADD'
}
</script>

<template>
    <div class="materia_Panel">
        <Collapse v-model:activeKey="activeKey" style="border-radius: 0">
            <template v-for="(item, index) in materialList" :key="index">
                <CollapsePanel :header="item.name" style="border-radius: 0">
                    <div class="mater-list">
                        <div v-for="component in item.children" class="component" :draggable="true"
                            :title="component.description"
                            @mousedown="mousedown(component)">
                            {{ component.name }}
                        </div>
                    </div>
                </CollapsePanel>
            </template>
        </Collapse>
    </div>
</template>

<style lang="scss">
.materia_Panel {
    width: 100%;

    .ant-collapse-content-box {
        padding: 0 !important;
    }

    .mater-list {
        display: flex;
        flex-wrap: wrap;

        .component {
            width: 90px;
            box-sizing: border-box;
            cursor: pointer;
            line-height: 80px;
            text-align: center;
            border-style: solid;
            border-right: 1px #eaeaea solid;
            border-bottom: 1px #eaeaea solid;

            &:hover {
                box-shadow: 0 6px 16px 0 rgba(0, 0, 0, .15);
            }
        }
    }
}
</style>