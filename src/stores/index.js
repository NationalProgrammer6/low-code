import { computed, reactive } from 'vue'

// 全局变量
const _state = reactive({
    count: 0,
    str: 'hello word'
})
// 全局变量字段
const _stateKeys = computed(()=>{
    return Object.keys(_state)
})

export {
    _state,
    _stateKeys,
}