<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { _state, _stateKeys } from '@/stores/index.js'
import { Collapse, CollapsePanel, Modal, Form, FormItem, Input, Textarea, Button, List, ListItem } from 'ant-design-vue';
import { CaretRightOutlined, PlusOutlined } from '@ant-design/icons-vue';
const activeKey = ref("")
function handleClick() { }
const showAddModel = ref(false)
const formRef = ref(null)
const formState = reactive({
    variable: "",
    describe: '',
    initValue: ''
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
    initValue: { required: true, message: '请设置初始值' }
}
function saveState() {
    formRef.value
        .validate()
        .then(() => {
            _state[formState.variable] = formState.initValue
            showAddModel.value = false
            Object.keys(formState).forEach(key => {
                formState[key] = "";
            });
        }).catch(err => { })
}

function clearFormState() {
    formRef.value.clearValidate()
    Object.keys(formState).forEach(key => {
        formState[key] = "";
    });
}
</script>

<template>
    <div class="data-panel">
        <Collapse v-model:activeKey="activeKey" style="border-radius: 0">
            <template #expandIcon="{ isActive }">
                <caret-right-outlined :rotate="isActive ? 90 : 0" />
            </template>
            <CollapsePanel style="border-radius: 0" key="1" header="data(接口数据)">
                <template #extra>
                    <PlusOutlined @click="handleClick" />
                </template>
            </CollapsePanel>
            <CollapsePanel style="border-radius: 0" key="2" header="state(页面变量)">
                <template #extra>
                    <PlusOutlined @click.stop="showAddModel = true" />
                </template>
                <List :data-source="_stateKeys" size="small">
                    <template #renderItem="{ item }">
                        <ListItem>
                            {{ item }}
                            <template #actions>
                                <a key="list-loadmore-edl">del</a>
                                <a key="list-loadmore-edit">edit</a>
                            </template>
                        </ListItem>
                    </template>
                </List>
            </CollapsePanel>
        </Collapse>
        <!-- 页面变量弹窗 -->
        <Modal v-model:open="showAddModel" title="创建页面变量" :bodyStyle="{ paddingTop: '20px' }" @Cancel="clearFormState">
            <Form :model="formState" :rules="stateRules" ref="formRef">
                <div class="row">
                    <FormItem label="变量名" name="variable" class="var">
                        <Input v-model:value="formState.variable" addon-before="state." />
                    </FormItem>
                    <FormItem name="describe" class="var-name" placeholder="中文名">
                        <Input v-model:value="formState.describe" />
                    </FormItem>
                </div>
                <FormItem label="初始值" name="initValue">
                    <Textarea v-model:value="formState.initValue"></Textarea>
                </FormItem>
            </Form>
            <template #footer>
                <Button @click="showAddModel = false">取消</Button>
                <Button key="submit" type="primary" @click="saveState">确定</Button>
            </template>
        </Modal>
    </div>
</template>

<style lang="scss">
.data-panel {
    height: 100%;
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