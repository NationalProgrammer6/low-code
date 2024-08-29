<script setup>
import TheDrapLocation from './components/TheDrapLocation.vue';
import Render from '@/material/Render.vue';
import { debounce } from 'lodash-es'
import { onMounted, provide, ref } from 'vue'
import Material from '@/utils/material'
import { schemaJson, schemaMap, currentMaterial, currentSchema } from '@/stores/globalData.js'
let currentSelect = null

const drapLocationRef = ref(null)
const hoverRef = ref(null)

const containerRef = ref(null)
let containerSize = null


const hoverStyle = ref({})
const selectStyle = ref({})

// 放下
function drop(event) {
    // 节流-按一秒24帧的间隔
    if (!drop.flag) {
        drop.flag = true
        setTimeout(() => {
            drop.flag = false
            moveOrDddNode(event)
        }, 41)
    }
}

/**
 * 移动或者新增节点
 * @param event {事件对象}
 */
function moveOrDddNode(event) {
    // 1、获取对应的schema
    let id = findNodeId(event.target)
    let schema = schemaMap.get(id)
    // 2、找到参考元素
    let insertIndex = 0
    let { nearestElement, index } = FindReferenceNode(schema, event, true)
    // 3、判断位于参考元素前后
    if (nearestElement) {
        let { left, right, bottom } = nearestElement.getBoundingClientRect()
        let leftDistance = Math.abs(event.x - left)
        let rightDistance = Math.abs(event.x - right)
        if (schema.type === "page") {
            if (event.y > bottom) {
                insertIndex = index + 1
            }
        } else {
            insertIndex = leftDistance < rightDistance ? index : index + 1
        }
    }
    // 4、插入或者移动
    if (currentMaterial.action === 'ADD') {
        const newNode = new Material(currentMaterial.type)
        if (schema.display === 'block') {
            schema.children.splice(insertIndex, 0, newNode)
        } else {
            schema.parent.children.splice(insertIndex, 0, newNode)
        }
    } else {

    }
}

/**
 * 找到离事件对象最近的DOM
 * @param elementList {DOM集合}
 * @param event {事件对象}
 */
function getNearestElement(elementList, event) {
    const { clientX, clientY } = event;
    // 最小距离
    let minDistance = Infinity;
    // 最近元素
    let nearestElement = null;
    let minDist = Infinity
    let index = 0
    for (let key = 0; key < elementList.length; key++) {
        let child = elementList[key]
        const { left, right, top, bottom } = child.getBoundingClientRect();
        if (clientX < left) {
            if (clientY < top) {
                minDist = calculateDiagonal(left - clientX, top - clientY)
            } else if (clientY > bottom) {
                minDist = calculateDiagonal(left - clientX, clientY - bottom)
            } else {
                minDist = left - clientX
            }
        } else if (clientX > right) {
            if (clientY < top) {
                minDist = calculateDiagonal(clientX - right, top - clientY)
            } else if (clientY > bottom) {
                minDist = calculateDiagonal(clientX - right, bottom - clientY)
            } else {
                minDist = clientX - right
            }
        } else {
            if (clientY < top) {
                minDist = top - clientY
            } else if (clientY > bottom) {
                minDist = clientY - bottom
            } else {
                minDist = 0
            }
        }
        if (minDist <= minDistance) {
            index = key
            minDistance = minDist;
            nearestElement = child;
        }
    }

    return { nearestElement, index }
}


/**
 * 寻找最近有id的祖先元素
 * @param element DOM元素
 */
function findNodeId(element) {
    if (!element) return null;
    let id = element.getAttribute('id')
    if (!id) {
        id = findNodeId(element.parentNode)
    }
    return id
}

// 鼠标在组件上移动时触发
function moveHandle(event) {
    if (event && event.target) {
        if (event.target === containerRef.value) {
            return hoverStyle.value = {
                display: 'none'
            }
        }
        const rect = event.target.getBoundingClientRect()
        hoverStyle.value = {
            width: rect.width + 'px',
            height: rect.height + 'px',
            left: rect.x - containerSize.x + 'px',
            top: rect.y - containerSize.y + 'px',
        }
    }
}
// 鼠标离开
function moveLeave() {
    hoverStyle.value = {
        display: 'none'
    }
}


function calculateDiagonal(width, height) {
    let value = Math.sqrt(height ** 2 + width ** 2);
    return value
}
// 在page上移动
function movePage(element, event) {
    const rect = element.getBoundingClientRect()
    let top = 1, width = rect.width - 2;
    let { nearestElement } = getNearestElement(element.children, event)
    if (nearestElement) {
        const { clientX, clientY } = event;
        const childRect = nearestElement.getBoundingClientRect();
        if (clientY > childRect.top + childRect.height / 2) {
            top = childRect.top + childRect.height + 1 - containerSize.y
        } else {
            top = childRect.top - 2 - containerSize.y
        }
    }
    drapLocationRef.value.show({
        width,
        top,
        left: 1,
        height: 2
    })
}



/**
 * 获取参考元素
 * @param schema {节点类型}
 * @param event {事件对象}
 * @returns {{nearestElement: DOM元素, index: 下标}}
 */
function FindReferenceNode(schema, event, flag) {
    let nearestElement = document.getElementById(schema.id)
    // 如果是行内节点、直接找到他并返回
    if (schema.display === 'inline-block') {
        return { nearestElement, index: schema.index }
    }
    return getNearestElement(nearestElement.children, event, flag)
}

// 寻找提示落点
function findPromptLocation(event) {
    let id = findNodeId(event.target)
    // if(!id) return ;
    let element = document.getElementById(id)
    let { x, y } = event
    // 获取对应的schema
    let schema = schemaMap.get(id)
    // 如果是页面
    if (schema.type === 'page') {
        return movePage(element, event)
    } else if (schema.display === 'inline-block') {
        // 如果是行内快元素
        const rect = element.getBoundingClientRect()
        let isRight = ((event.x - rect.left) / rect.width) > 0.5 ? true : false
        drapLocationRef.value.show({
            width: 2,
            top: rect.y - containerSize.y,
            left: isRight ? rect.right - 2 - containerSize.x : rect.left - containerSize.x,
            height: rect.height
        })
    } else if (schema.display === 'block') {
        if (schema.children.length === 0) {
            let rect = element.getBoundingClientRect()
            drapLocationRef.value.show({
                width: rect.width,
                height: rect.height,
                left: rect.left - containerSize.x,
                top: rect.top - containerSize.y,
                opacity: 0.2,
            })
        } else {
            // 找到离鼠标位置最近的元素
            let { nearestElement } = getNearestElement(element.children, event)
            if (nearestElement) {
                let rect = nearestElement.getBoundingClientRect()
                let leftDistance = Math.abs(x - rect.left)
                let rightDistance = Math.abs(x - rect.right)
                let isRight = leftDistance < rightDistance ? false : true
                drapLocationRef.value.show({
                    width: 2,
                    height: rect.height,
                    left: isRight ? rect.right - 2 - containerSize.x : rect.left - containerSize.x,
                    top: rect.y - containerSize.y,
                })
                // showTargetLocation(nearestElement, rect, direction)
            }
        }

    }
}

// 拖拽-鼠标移动
function dragover(event) {
    // 节流-按一秒24帧的间隔
    if (!dragover.flag) {
        dragover.flag = true
        setTimeout(() => {
            dragover.flag = false
            findPromptLocation(event)
        }, 41)
    }
}
// 点击选中
function clickHandle(event) {
    if (event && event.target) {
        const id = findNodeId(event.target)
        let schema = schemaMap.get(id)
        currentSchema.value = schema
        const rect = event.target.getBoundingClientRect()
        currentSelect = event
        selectStyle.value = {
            width: rect.width + 'px',
            height: rect.height + 'px',
            left: rect.x - containerSize.x + 'px',
            top: rect.y - containerSize.y + 'px',
        }
    }
}
// 画布大小发生改变
function handleResize() {
    containerSize = containerRef.value.getBoundingClientRect()
    if (currentSelect) {
        clickHandle(currentSelect)
    }
}
onMounted(() => {
    if (containerRef.value) {
        // 获取画布大小
        containerSize = containerRef.value.getBoundingClientRect()
        // 画布大小变化重新调用选择方法
        const resizeObserver = new ResizeObserver(debounce(handleResize, 200));
        resizeObserver.observe(containerRef.value)
    }
})

provide('mouseEvent', {
    move: moveHandle,
    click: clickHandle,
    drop
})

</script>

<template>
    <div class="layout-content">
        <div class="container-wrap">
            <div class="container" ref="containerRef" @dragover.prevent="dragover" @click="clickHandle"
                @mousemove="moveHandle" @mouseleave="moveLeave" @drop="drop" :id="schemaJson.id">
                <template v-for="com in schemaJson.children" :key="com.id">
                    <Render :schema="com" />
                </template>
            </div>
            <!-- 鼠标悬浮提示 -->
            <div class="hover-wrap" ref="hoverRef" :style="hoverStyle"></div>
            <!-- 选择提示 -->
            <div class="select-wrap" :style="selectStyle"></div>
            <!-- 拖拽落点提示 -->
            <TheDrapLocation ref="drapLocationRef"></TheDrapLocation>
        </div>
    </div>
</template>

<style lang="scss">
.layout-content {
    flex: 1;
    padding: 10px;
    background-color: #edeff3;
    overflow-y: auto;

    .container-wrap {
        min-height: 100%;
        height: 100%;
        position: relative;
    }

    .container {
        border: 1px solid transparent;
        box-sizing: border-box;
        width: 100%;
        position: relative;
        min-height: 100%;
        height: auto;
        background-color: #fff;
    }

    .hover-wrap {
        width: 0;
        position: absolute;
        border: 1px dashed #197aff;
        pointer-events: none;
        // transition: all .2s;
    }

    .select-wrap {
        height: 0;
        position: absolute;
        border: 1px solid #197aff;
        pointer-events: none;
        // transition: all .2s;
    }
}
</style>