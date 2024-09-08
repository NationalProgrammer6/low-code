import { computed, reactive } from 'vue'

// 全局变量
const _state = reactive({
    count: {
        value: 0,
        describe: '一个数值',
        type: 'number'
    },
    str: {
        value: 'hello word',
        describe: '一个字符串',
        type: 'string'
    }
})
// 全局变量字段
const _stateKeys = computed(()=>{
    return Object.keys(_state)
})

export {
    _state,
    _stateKeys,
}