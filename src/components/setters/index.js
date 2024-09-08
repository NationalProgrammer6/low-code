const componentNameRegex = /\/material\/([^/]+)\//
/**
 * 遍历setters文件夹中的.vue,注册为全局组件
 * @param {Vue实例} app ue实例
 */
export function initSetters(app){
    const modules = import.meta.glob('./**.vue',{ eager: true });
    for (const path in modules) {
        const module = modules[path].default
        const componentName = module.name ? module.name : path.match(/[^\/]+$/)[0].split('.')[0]
        app.component(componentName, module);
    }
}