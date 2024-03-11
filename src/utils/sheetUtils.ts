// 将列序号转成字母标题 1=>A 2=>B
function columnIndexToTitle(index: number): string {
    let title = '';
    index++; // 调整计数开始于 1
    while (index > 0) {
        index--; // 调整为 0-based 索引
        title = String.fromCharCode('A'.charCodeAt(0) + (index % 26)) + title;
        index = Math.floor(index / 26);
    }
    return title;
}

function calculateWidthsOrHeightsUpToIndex(config: ColConfig[] | RowConfig[], index: number): number {
    if (index <= 0 || index > config.length) {
        // 如果索引超出范围，则返回0
        return 0;
    }
    // 使用slice和reduce计算总宽度
    return config.slice(0, index).reduce((acc, item) => {
        // 这里我们使用了类型守卫来检查item是否具有width属性
        if ('width' in item) {
            return acc + item.width;
        }
        // 如果item没有width属性，我们假设它有height属性
        return acc + item.height;
    }, 0);
}

export { calculateWidthsOrHeightsUpToIndex, columnIndexToTitle }