<script setup>
import { ref, watch } from 'vue'
import { FormItem } from 'ant-design-vue';
import { currentNode, materialMap } from '@/stores/globalData.js'
import SetterInput from './components/SetterInput.vue';
import SetterSelect from './components/SetterSelect.vue';
// 获取组件
function getComponent(propType){
    if(propType.inputType === 'Input'){
        return SetterInput
    }
    if(propType.inputType === 'Select'){
        return SetterSelect
    }
}
const formData = ref({})
const props = ref([])
watch(()=>currentNode.value.id,()=>{
    let node = materialMap.get(currentNode.value.type)
    formData.value = {}
    Object.keys(currentNode.value.props).forEach(key=>{
        formData.value[key] = currentNode.value.props[key]
    })
    props.value = node.props || {} 
})
function change(type,value) {
    currentNode.value.props[type] = value
}
</script>

<template>
    <div class="attribute-panel">
        <template v-if="props && props.length > 0">
            <div v-for="(item,index) in props" :key="item.name">
                <FormItem :label="item.name" :label-col="{ style: { width: '80px' } }">
                    <component 
                        :is="getComponent(item.propType)" 
                        :options="item.propType.options"
                        :type="item.value"
                        @change="change"
                        :initialValue="formData[item.value]"
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