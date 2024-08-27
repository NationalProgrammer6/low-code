import { ref, watch } from 'vue'
import { nanoid } from 'nanoid'

const modules = import.meta.glob('@/components/**/index.ts',{ eager: true });
console.log(modules)
for (const path in modules) {
    console.log(modules[path].default)
}
// Object.keys(modules).map(async (path) => {
//     let component = await modules[path]()
//     console.log(component.default)
// })


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
const currentSchema = ref(null)

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
    currentSchema
}