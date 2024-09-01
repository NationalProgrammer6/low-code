// 物料
import { nanoid } from 'nanoid'
import { materialList } from '@/stores/globalData'
export default class Material{
    constructor(type){
        const material = materialList.find(item =>item.type === type)
        this.id = nanoid(10)
        this.label = '组件描述' + nanoid(5)
        this.isContainer =  material.isContainer
        this.componentName = type,
        this.type = type
        this.rect = null
        this.val = ""
        this.props = {}
        this.style = {}
        this.children = []
    }
    setClientRect(rect){
        this.rect = rect
    }
    getClientRect(){
        return this.rect
    }
}