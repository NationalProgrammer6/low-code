<script setup>
import { ref, watch } from 'vue'
import { FormItem } from 'ant-design-vue';
import { currentNode, materialMap } from '@/stores/globalData.js'
/**
 * 获取组件名 
 * @param setter 
 */
function getComponent(setter){
    let componentName = setter
    if(typeof setter === 'object'){
        componentName = setter.componentName
    }
    return componentName
}
const formData = ref({})
const props = ref([])
// 切换选中节点时 更新属性页面
watch(()=>currentNode.value.id,()=>{
    formData.value = {}
    let node = materialMap.get(currentNode.value.type)
    if(node && node.props){
        Object.keys(currentNode.value.props).forEach(key=>{
            formData.value[key] = currentNode.value.props[key]
        })
        props.value = node.props || {} 
        console.log(3333,props.value)
    }

})
function change(type,value) {
    currentNode.value.props[type] = value
}
</script>

<template>
    <div class="attribute-panel">
        <template v-if="props && props.length > 0">
            <div v-for="item in props" :key="item.name">
                <FormItem :label="item.label" :label-col="{ style: { width: '80px' } }">
                    <component 
                        :is="getComponent(item.setter)" 
                        :options="item.setter?.options"
                        :type="item.name"
                        @change="change"
                        :initialValue="formData[item.name]"
                        :key="currentNode.id + item.value"
                        >
                    </component>
                </FormItem>
            </div>
        </template>
    </div>
</template>

<style scoped lang="scss">
.attribute-panel{
    padding: 20px 10px 10px 5px;
    .ant-select{
        width: 100%;
    }
}
</style>