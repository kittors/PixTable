import { inject } from "vue";

export default function setupInjects() {
    // 定义一个标识符表示值未被提供
    const notProvided = Symbol();

    // 将依赖项及其键作为数组项定义
    const dependencies = [
        { key: 'sheetSettings', default: notProvided },
        { key: 'rowConfig', default: notProvided },
        { key: 'colConfig', default: notProvided },
        { key: 'settings', default: notProvided },
        // 添加更多的依赖项...
    ];

    // 使用 map 创建一个对象，包含所有注入的依赖项，如果未提供则为 null
    const injected = dependencies.reduce((acc: any, { key, default: defaultValue }) => {
        const value = inject(key, defaultValue);
        acc[key] = value === notProvided ? null : value; // 如果未提供，使用 null 替代
        return acc;
    }, {});

    // 检查是否有任何依赖项未被提供
    const allProvided = !Object.values(injected).includes(null);
    if (!allProvided) {
        console.warn('One or more dependencies were not provided.');
    }

    return injected;
}
