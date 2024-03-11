import { provide } from "vue"

export default function setupProvides(ProvideParameter: { [s: string]: unknown; } | ArrayLike<unknown>) {
    // 遍历 ProvideParameter 中的每个属性
    Object.entries(ProvideParameter).forEach(([key, value]) => {
        // 如果属性值存在，则调用 provide 函数
        if (value !== undefined) {
            provide(key, value);
        }
    });
}
