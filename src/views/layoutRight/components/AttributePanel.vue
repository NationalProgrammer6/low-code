<script setup lang='ts'>
import { Input, Select } from 'ant-design-vue';
const props = defineProps({
    attribute: {
        type: Array || Object,
        default: () => { 
            return []
        }
    }
})
import { Textarea, Button } from 'ant-design-vue'
function getComponent(propType){
    if(propType.inputType === 'Input'){
        return Input
    }
    if(propType.inputType === 'Select'){
        return Select
    }
}

const list = [
    {
        label: "Name",
        value: 'name', // 绑定的字段
        inputType: 'Input', // 使用Input输入框
        defaultValue: '',
    },
    {
        label: "Sex",
        value: 'sex', // 绑定的字段
        inputType: 'Select', // 使用Select组件
        defaultValue: '男',
        options: [  // Select选项
                    {lable:'文本',value: 'span'},
                    {lable:'h1',value: 'h1'},
                    {lable:'h2',value: 'h2'},
                    {lable:'h3',value: 'h3'},
        ],
    },
]
function change(){
    console.log(99999999)
}
</script>

<template>
    <div class="attribute-panel">
        <h1>属性面版</h1>
        <component :is="'Input'"></component>
        <template v-if="attribute && attribute.length > 0">
            <div v-for="(item,index) in attribute">
            <component :is="getComponent(item.propType)" 
                :options="item.propType.options" 
                @change="change">
            </component>
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