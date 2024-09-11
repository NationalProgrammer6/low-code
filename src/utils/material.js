// 物料
import { nanoid } from 'nanoid'
import { materialMap, setProps } from '@/stores/globalData'
export default class Material{
    constructor(type){
        const material = materialMap.get(type)
        this.id = nanoid(10)
        this.title = material.title
        this.label = '组件描述' + nanoid(5)
        this.isContainer =  material.isContainer
        this.componentName = type,
        this.type = type
        this.rect = null
        this.val = ""
        this.style = {}
        this.children = []
        this.initProps(material.props)
    }
    initProps(props){
        this.props = setProps(props)
    }
    getClientRect(){
        return this.rect
    }
}