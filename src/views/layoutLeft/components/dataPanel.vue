<script setup>
import { reactive, ref } from 'vue'
import { _state, _stateKeys } from '@/stores/index.js'
import { Tree } from 'ant-design-vue';
import { Collapse, CollapsePanel, Modal, Form, FormItem, Input, Textarea, Button, List, ListItem } from 'ant-design-vue';
import { CaretRightOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons-vue';
// https://jsonplaceholder.typicode.com/users
const activeKey = ref("")
function handleClick() { }


const stateModel = ref(false)
const stateFormRef = ref(null)
const isStateEdit = ref(false)
const stateForm = reactive({
    variable: "",
    describe: '',
    value: ''
})
const stateRules = {
    variable: [
        { required: true, message: '请输入变量名' },
        {
            pattern: /^[a-zA-Z_][a-zA-Z0-9_]*$/,
            message: '命名需要符合变量命名规则',
        },
        {
            validator: (rule, value) => {
                if (_stateKeys.value.includes(value)) {
                    return Promise.reject(new Error('变量名已存在'));
                } else {
                    return Promise.resolve();
                }
            },
            message: '变量名已存在',
            trigger: 'blur',
        },
    ],
    value: { required: true, message: '请设置初始值' }
}
function saveState() {
    stateFormRef.value
        .validate()
        .then(() => {
            _state[stateForm.variable] = {
                value: stateForm.value,
                describe: stateForm.describe,
                type: typeof stateForm.value
            }
            clearstateForm()
        }).catch(err => { })
}
function clearstateForm() {
    if(stateModel.value){
        stateModel.value = false
    }
    stateFormRef.value && stateFormRef.value.clearValidate()
    Object.keys(stateForm).forEach(key => {
        stateForm[key] = "";
    });
}
function editState(field){
    isStateEdit.value = true
}

function getType(value) {
    let type =  '???'
    if(Object.prototype.toString.call(value) === '[object Object]'){
        return 'Obj.'
    }
    if(Object.prototype.toString.call(value) === '[object Null]'){
        return 'Nul.'
    }
    if(typeof value === 'number'){
        return '123.'
    }
    if(typeof value === 'string'){
        return 'Str.'
    }
    if(typeof value === 'boolean'){
        return 'Bol.'
    }
    return type;  
}

function handleChildren(children){
    if(typeof children != 'object' || Array.isArray(children)) return ''
    return Object.keys(children).map(key =>{
        return {
            key,
            type: getType(children[key]),
            value: children[key],
            describe: '',
            children: children[key] ? handleChildren(handleChildren) : ''
        }
    })
}

function handleState(state){
    return Object.keys(state).map(key =>{
        let noed = {
            ...state[key],
            key,
            type: getType(state[key].value)
        }
        if(noed.value && typeof noed.value == 'object'){
            noed.children = handleChildren(noed.value)
        }
        return noed
    })
}
const list = handleState(_state)


</script>

<template>
    <div class="data-panel">
        <Collapse v-model:activeKey="activeKey" style="border-radius: 0">
            <template #expandIcon="{ isActive }">
                <caret-right-outlined :rotate="isActive ? 90 : 0" />
            </template>
            <CollapsePanel style="border-radius: 0" key="1" header="data(接口数据)">
                <template #extra>
                    <div class="icon-wrap" @click="handleClick">
                        <PlusOutlined  />
                    </div>
                </template>
            </CollapsePanel>
            <CollapsePanel style="border-radius: 0" key="2" header="state(页面变量)">
                <template #extra>
                    <div class="icon-wrap">
                        <PlusOutlined @click.stop="stateModel = true" />
                    </div>
                </template>
                <Tree :tree-data="list">
                    <template #title="{ value, key, type,children }">
                        <div class="field-row">
                            <div class="field-type">
                                <span >{{ type }}</span>  
                            </div>
                            <span class="field-key">{{ key }}</span> 
                            <span class="field-value" v-if="!children">{{ value }}</span>
                        </div>
                    </template>
                </Tree>
            </CollapsePanel>
        </Collapse>
        <!-- 添加页面变量弹窗 -->
        <Modal 
            v-model:open="stateModel" 
            title="创建页面变量" 
            :bodyStyle="{ paddingTop: '20px' }"
            @Cancel="clearstateForm"
        >
            <Form :model="stateForm" :rules="stateRules" ref="stateFormRef">
                <div class="row">
                    <FormItem label="变量名" name="variable" class="var">
                        <Input v-model:value="stateForm.variable" addon-before="state." />
                    </FormItem>
                    <FormItem name="describe" class="var-name" placeholder="中文名">
                        <Input v-model:value="stateForm.describe" />
                    </FormItem>
                </div>
                <FormItem label="初始值" name="value">
                    <Textarea v-model:value="stateForm.value"></Textarea>
                </FormItem>
            </Form>
            <template #footer>
                <Button @click="clearstateForm">取消</Button>
                <Button key="submit" type="primary" @click="saveState">确定</Button>
            </template>
        </Modal>
    </div>
</template>

<style lang="scss">
.data-panel {
    height: 100%;
    .icon-wrap{
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        cursor: pointer;
        &:hover{
            font-weight: 500;
            color: #333;
        }
    }
    .ant-collapse-content-box{
        padding: 5px 0 !important;
        .ant-tree-treenode{
            width: 100%;
            .ant-tree-node-content-wrapper{
                flex: 1;
                min-width: 0;
                .field-row{
                    display: flex;
                    align-items: center;
                    flex-wrap: nowrap;
                    overflow: hidden;
                    &:hover{
                        .field-type{
                            background-color: transparent;
                        }
                    }
                    .field-type{
                        width: 32px;
                        margin-right: 6px;
                        text-align: center;
                        background-color: rgba(0, 0, 0, 0.04);
                        flex-grow: 0;
                        position: relative;
                        
                    }
                    .field-key{
                        margin-right: 8px;
                        color: #000;
                        font-weight: 600;
                        &::after{
                            font-weight: 400;
                            color: #333;
                            margin-left: 3px;
                            display: inline-block;
                            content: ':';
                        }
                    }
                    .field-value{
                        flex: 1;
                        margin-right: 5px;
                        white-space: nowrap;   
                        overflow: hidden;  
                        text-overflow: ellipsis;  
                        color: #666;
                    }
                }
            }
        }
    }
}

.row {
    display: flex;
    gap: 15px;

    .var {
        flex: 2;
    }

    .var-name {
        flex: 1;
    }
}
</style>