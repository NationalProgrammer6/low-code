export default{
    type: 'MyText', // 类型
    title: "Text",  // 组件名字
    name: "Text", // 对应title
    category: '', // 类别
    group: '基本组件', // 分组
    description: '文本', // 描述
    order: 1, // 排序
    keywords: '文本 Text txt', // 关键字
    isContainer: false, // 是否是容器
    props: [
        {
            name: '内容',
            value: 'txt',
            propType: {
                defaultValue: '静态文本',
                inputType: 'Input',
                placeholder: '输入文本'
            }
        },
        {
            name: '文本类型',
            value: 'type',
            propType: {
                inputType: 'Select',
                defaultValue: 'span',
                options: [
                    {lable:'文本',value: 'span'},
                    {lable:'h1',value: 'h1'},
                    {lable:'h2',value: 'h2'},
                    {lable:'h3',value: 'h3'},
                ],
            },

        }
    ]

}
// placeholder