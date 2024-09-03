<script setup>
import { ref, watch, defineComponent } from 'vue'
import { Input, Select, Textarea, FormItem } from 'ant-design-vue';
import { currentNode, materialMap } from '@/stores/globalData.js'
function getComponent(propType){
    if(propType.inputType === 'Input'){
        return Input
    }
    if(propType.inputType === 'Select'){
        return Select
    }
}
const formData = ref({})
const props = ref([])
watch(()=>currentNode.value.id,()=>{
    let node = materialMap.get(currentNode.value.type)
    props.value = node.props || {}
})
const change = (e) =>{
    console.log(e)
    console.log(e.target.getAttribute('_key'))
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
                        v-model:value="formData[item.value]"
                        :_key="item.value"
                        @change="change"
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