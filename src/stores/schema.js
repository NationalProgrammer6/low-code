import { ref } from 'vue'
import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'

// 数据扁平化
function flattenSchemaObject(obj, result = new Map, parent = null){
  result.set(obj.id, {
    ...obj,
    parent,
  })
  if(obj['children']){
    obj['children'].forEach(item =>{
      flattenSchemaObject(item, result, obj); 
    })
  }
  return result;  
}

export const useSchemaStore = defineStore('counter', () => {
  let currentMaterial = ref(null)
  const SCHEMAJSON = ref({
    title: '页面',
    type: 'page',
    id: nanoid(10),
    display: 'block',
    children: []
  })
  let SCHEMLIST = new Map()
  SCHEMLIST = flattenSchemaObject(SCHEMAJSON.value)

  const setCurrenMaterial = (val) => {
      currentMaterial.value = val
  }
  
  return { SCHEMAJSON, SCHEMLIST, setCurrenMaterial, currentMaterial }
})

