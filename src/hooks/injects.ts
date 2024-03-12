import { inject } from "vue";

export default function setupInjects() {
    // 定义一个标识符表示值未被提供
    const notProvided = Symbol();

    // 直接使用键数组定义依赖项
    const dependencyKeys = [
        'rowConfig',
        'colConfig',
        'settings',
        'scrollX',
        'scrollY',
        'totalColWidth',
        'totalRolHeight',
        'renderRowConfig',
        'renderColConfig',
        'renderRowArr',
        'renderColArr'
        // 添加更多的依赖项键...
    ];

    // 使用 reduce 和 map 创建一个对象，包含所有注入的依赖项，如果未提供则为 null
    const injected = dependencyKeys.reduce((acc: Record<string, any>, key) => {
        const value = inject(key, notProvided);
        acc[key] = value === notProvided ? null : value; // 如果未提供，使用 null 替代
        return acc;
    }, {} as Record<string, any>); // 在初始化累加器时也指定类型


    return injected;
}
