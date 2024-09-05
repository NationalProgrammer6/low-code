export default{
    type: 'MyButton', // 类型
    title: "Button",  // 组件名字
    name: "Button", // 对应title
    category: '', // 类别
    group: '基本组件', // 分组
    description: '按钮', // 描述
    order: 1, // 排序
    keywords: '按钮 Button', // 关键字
    isContainer: false, // 是否是容器
    events: {},
    props: [
        {
            name: '内容',
            value: 'txt',
            propType: {
                defaultValue: '按钮',
                inputType: 'Input',
            }
        },
    ]


    // category 如果有多个面板，group是第一分组 category是第二分组
    // priority category中的排序
}