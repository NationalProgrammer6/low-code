<script setup lang='ts'>
import { ref, watch } from 'vue'
import { Input, Select, Textarea, FormItem } from 'ant-design-vue';
const props = defineProps({
    attribute: {
        type: Array || Object,
        default: () => { 
            return []
        }
    }
})
function getComponent(propType){
    if(propType.inputType === 'Input'){
        return Input
    }
    if(propType.inputType === 'Select'){
        return Select
    }
}
const formData = ref({})
watch(()=>formData.value,(value) => {
    console.log(value)
})
</script>

<template>
    <div class="attribute-panel">
        <template v-if="attribute && attribute.length > 0">
            <div v-for="(item,index) in attribute" :key="item.name">
                <FormItem :label="item.name" :label-col="{ style: { width: '80px' } }">
                    <component 
                        :is="getComponent(item.propType)" 
                        :options="item.propType.options"
                        v-model:value="formData[item.value]"
                        >
                    </component>
                </FormItem>
            </div>
        </template>
    </div>
</template>

<style scoped lang="scss">
.attribute-panel{
    .ant-select{
        width: 100%;
    }
}
</style>