
const componentNameRegex = /\/material\/([^/]+)\//
/**
 * 遍历material文件夹中的index.vue,注册为全局组件
 * @param {Vue实例} app ue实例
 */
export function initMaterials(app){
    const modules = import.meta.glob('@/material/**/index.vue',{ eager: true });
    for (const path in modules) {
        const module = modules[path].default
        const componentName = module.name ? module.name : path.match(componentNameRegex)
        app.component(componentName, module);
    }
}