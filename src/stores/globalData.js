import { ref, watch } from 'vue'
import { nanoid } from 'nanoid'

// 引入物料
const materialList = []
const materialMap = new Map()
const modules = import.meta.glob('@/material/**/index.ts',{ eager: true });
for (const path in modules) {
    const module = modules[path].default
    materialList.push(module)
    materialMap.set(module.type,module)
}

function setProps(props){
    let newProps = {}
    props && props.forEach(item =>{
        newProps[item.name] = item.defaultValue || ''
    })
    return newProps
}

// 数据扁平化
function flattenSchemaObject(schema, result = new Map, parent = null,index = 0) {
    schema.index = index
    schema.parent = parent
    result.set(schema.id, schema)
    if (schema['children']) {
        schema['children'].forEach((item, i) => {
            flattenSchemaObject(item, result, schema,i);
        })
    }
    return result;
}

// 拖拽的物料
let currentMaterial = {}

// 画布渲染的数据
const schemaJson = ref({
    title: '页面',
    type: 'page',
    id: nanoid(10),
    display: 'block',
    children: []
})

// 选中的节点
const currentNode = ref({})

// schemaJson扁平化
let schemaMap = new Map()
watch(schemaJson.value,(newValue)=>{
    // 当schema发生变化时重新
    schemaMap = flattenSchemaObject(newValue)
},{
    immediate: true
})

export {
    schemaJson,
    schemaMap,
    currentMaterial,
    currentNode,
    materialList,
    materialMap,
    setProps
}