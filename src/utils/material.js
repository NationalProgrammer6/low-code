// 物料
import { nanoid } from 'nanoid'
export default class Material{
    constructor(type){
        this.id = nanoid(10)
        this.label = '组件描述' + nanoid(5)
        this.display =  type === 'Text' ||  type === 'Button'? 'inline-block' : 'block'
        this.componentName = type,
        this.type = type
        this.rect = null,
        this.children = [],
        this.val = ""
    }
    setClientRect(rect){
        this.rect = rect
    }
    getClientRect(){
        return this.rect
    }
}