import { computed, reactive } from 'vue'

// 全局变量
const _state = reactive({
    count: {
        value: 0,
        describe: '一个数值',
    },
    str: {
        value: 'hello word 除非是胜多负少的发的说法手打递四方速递防守打法 防守打法是的',
        describe: '一个字符串',
    },
    person: {
        value: {
            name: '张三',
            age: 20
        }
    },
    arr: [
        1,
        2
    ]
})
// 全局变量字段
const _stateKeys = computed(()=>{
    return Object.keys(_state)
})

export {
    _state,
    _stateKeys,
}