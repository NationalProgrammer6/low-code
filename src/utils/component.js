// 获取组件
import {defineAsyncComponent} from 'vue'
const Flex = defineAsyncComponent (()=>import('@/components/MyFlex.vue'))
const Div = defineAsyncComponent (()=>import('@/components/MyDiv.vue'))
const Text = defineAsyncComponent (()=>import('@/components/MyText.vue'))
const Button = defineAsyncComponent (()=>import('@/components/MyButton/index.vue'))

const componentlMap = new Map()
componentlMap.set('Flex',Flex)
componentlMap.set('Div',Div)
componentlMap.set('Text',Text)
componentlMap.set('Button',Button)
export default {
    get(key){
        return componentlMap.get(key)
    }
}