<!-- 
    物料面板
-->
<script setup>
import { ref, watch } from 'vue'
import { Collapse, CollapsePanel, Input, Empty } from 'ant-design-vue';
import { currentMaterial, materialList } from '@/stores/globalData.js'
import { SearchOutlined } from '@ant-design/icons-vue';
import { debounce } from 'lodash-es'
const activeKey = ref(['0','1'])
// 鼠标被按下
function mousedown(component) {
    currentMaterial.type = component.type
    currentMaterial.action = 'ADD'
}
const keyWord = ref('')
const materialTree = ref([])

function handleListToTree(list) {
    const materialMap = new Map()
    list.forEach(material => {
        if (!materialMap.has(material.group)) {
            materialMap.set(material.group, {
                name: material.group,
                children: []
            })
        }
        materialMap.get(material.group).children.push({ ...material })
    });
    materialTree.value = [...materialMap.values()]
}

const handleSearch = debounce(handleListToTree, 200)
watch(() => keyWord.value, (value) => {
    value = value.trim()
    let newValue = materialList.filter(item => {
        if (!value) {
            return true
        } else {
            let keyWord = item.keywords || ''
            return keyWord.toLowerCase().includes(value.toLowerCase())
        }
    })
    handleSearch(newValue)
}, {
    immediate: true
})


</script>

<template>
    <div class="materia_panel">
        <div class="panel-title">
            组件库
        </div>
        <div class="panel-search">
            <Input v-model:value="keyWord" placeholder="搜索组件">
            <template #suffix>
                <SearchOutlined />
            </template>
            </Input>
        </div>
        <div class="panel-body">
            <Collapse v-model:activeKey="activeKey" style="border-radius: 0">
                <template v-for="(item, index) in materialTree" :key="index">
                    <CollapsePanel :header="item.name" style="border-radius: 0">
                        <div class="mater-list">
                            <div v-for="component in item.children" class="component" :draggable="true"
                                :title="component.description" @mousedown="mousedown(component)">
                                {{ component.name }}
                            </div>
                        </div>
                    </CollapsePanel>
                </template>
            </Collapse>
            <Empty description="暂无组件" v-show="materialTree && materialTree.length == 0"></Empty>
        </div>
    </div>
</template>

<style lang="scss">
.materia_panel {
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
        max-height: calc(100% - 100px);
        overflow-y: auto;

        .ant-collapse-content-box {
            padding: 0 !important;
        }

        .mater-list {
            display: flex;
            flex-wrap: wrap;

            .component {
                width: 33.3333333333%;
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

        .ant-empty {
            margin-top: 50px;
        }

    }

}
</style>