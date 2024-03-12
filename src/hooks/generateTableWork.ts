import defaultSettings from '@/config/tableDefaultConfig'
import setupProvides from '@/hooks/provides';
import { computed, reactive, ref, type Ref } from "vue"
import { columnIndexToTitle } from '@/utils/sheetUtils'
import { ElScrollbar } from 'element-plus';
export default function generateTableWork(sheetSettings: SheetSettings, scrollRef: Ref<typeof ElScrollbar | null>, containerWidth: Ref<number>, containerHeight: Ref<number>) {

    const newSheetSettings = reactive({
        ...defaultSettings,
        ...sheetSettings,
    });

    // 行配置数组创建
    const rowConfig: RowConfig[] = reactive(Array.from({ length: newSheetSettings.rows! }, (_, index: number) => ({
        height: newSheetSettings.cellHeight!,
        index: index + 1,
    })));

    // 列配置数组创建
    const colConfig: ColConfig[] = reactive(Array.from({ length: newSheetSettings.cols! }, (_, index: number) => ({
        width: newSheetSettings.cellWidth!,
        title: columnIndexToTitle(index)
    })));

    // 计算列总宽
    const totalColWidth = computed(() => {
        // 使用 reduce 函数迭代 colConfig 数组，累加每一列的宽度
        return colConfig.reduce((totalWidth, col) => totalWidth + col.width, newSheetSettings.rowHeaderWidth);
    });

    //计算行总高
    const totalRowHeight = computed(() => {
        return rowConfig.reduce((totalHeight, row) => totalHeight + row.height, newSheetSettings.colHeaderHeight);
    })

    //对滚动事件的操作

    //控制表格的左右移动
    const scrollX = ref<number>(0)
    const scrollY = ref<number>(0)

    //element滚动条监听
    const listerScroll = (event: ScrollEvent) => {
        scrollX.value = -event.scrollLeft;
        scrollY.value = -event.scrollTop;
    };

    //渲染行配置
    const renderRowConfig = reactive({
        preRenderNum: newSheetSettings.cache,
        currentRenderNum: 0,
        renderStartIndex: 0,
        renderEndIndex: 0,
        startIndex: 0,
        endIndex: 0,
    });

    //配置列配置
    const renderColConfig = reactive({
        preRenderNum: newSheetSettings.cache,
        currentRenderNum: 0,
        renderStartIndex: 0,
        renderEndIndex: 0,
        startIndex: 0,
        endIndex: 0,
    });

    //获取当前可以渲染的行数以及列数
    const getCurrentRenderRows = (viewPortHeight: number) => {
        let accumulatedHeight = 0;
        let startRowIndex = 0;
        if (
            newSheetSettings.colHeaderHeight &&
            newSheetSettings.cellHeight &&
            rowConfig &&
            scrollRef.value
        ) {
            renderRowConfig.currentRenderNum = Math.ceil(
                (viewPortHeight - newSheetSettings.colHeaderHeight) /
                (newSheetSettings.cellHeight)
            );
            // 确定渲染的结束索引，保证不超出行配置数组的长度
            for (let i = 0; i < rowConfig.length; i++) {
                accumulatedHeight += rowConfig[i].height;
                if (accumulatedHeight > -scrollY.value) {
                    startRowIndex = i;
                    break;
                }
            }

            // 更新行配置
            updateRenderConfig(renderRowConfig, startRowIndex, rowConfig.length);
            scrollRef.value.wrapRef.removeEventListener('wheel', onScrollHandler);
            scrollRef.value.wrapRef.removeEventListener('scroll', onScrollHandler);
            // 添加新的事件监听器
            scrollRef.value.wrapRef.addEventListener('wheel', onScrollHandler, { passive: false });
            scrollRef.value.wrapRef.addEventListener('scroll', onScrollHandler);
        }
    };
    //获取渲染的列数
    const getCurrentRenderCols = (viewPortWidth: number) => {
        let accumulatedWidth = 0;
        let startColIndex = 0;
        const scroll = -scrollX.value;
        for (let i = 0; i < colConfig.length; i++) {
            accumulatedWidth += colConfig[i].width;
            if (accumulatedWidth > scroll) {
                startColIndex = i;
                break;
            }
        }
        renderColConfig.currentRenderNum = Math.ceil(
            (viewPortWidth - newSheetSettings.rowHeaderWidth) /
            (newSheetSettings.cellWidth)
        );
        // 确定渲染的结束索引，保证不超出行配置数组的长度
        // 更新列配置
        updateRenderConfig(renderColConfig, startColIndex, colConfig.length);
    };


    // 定义一个变量来存储上一次滚动位置
    let lastScrollTop = 0;
    let lastScrollLeft = 0;
    let scrollRAF: number;
    const onScrollHandler = (event: WheelEvent | Event) => {
        if (!scrollRef.value?.wrapRef) return;
        // 检查事件是否由鼠标滚轮触发
        if (event.type === 'wheel') {
            // 类型断言，将 event 断言为 WheelEvent
            const wheelEvent = event as WheelEvent;
            if (wheelEvent.deltaY !== 0) {
                wheelEvent.preventDefault();
                const verticalScrollAmount = wheelEvent.deltaY * 0.5; // 对垂直滚轮进行减速
                scrollRef.value.wrapRef.scrollBy(0, verticalScrollAmount);
            }

            if (wheelEvent.deltaX !== 0) {
                wheelEvent.preventDefault();
                const horizontalScrollAmount = wheelEvent.deltaX * 0.5; // 对水平滚轮进行减速
                scrollRef.value.wrapRef.scrollBy(horizontalScrollAmount, 0);
            }
        }

        const ScrollT = -scrollY.value;
        const scrollL = -scrollX.value;
        // // 检查滚动位置是否有显著变化
        if (
            Math.abs(lastScrollTop - ScrollT) < newSheetSettings.cellHeight &&
            Math.abs(lastScrollLeft - scrollL) < newSheetSettings.cellWidth
        ) {
            return;
        }
        lastScrollTop = ScrollT; // 更新最后的滚动位置
        lastScrollLeft = scrollL;

        // 增加滚动性能
        if (scrollRAF) {
            //取消动画帧
            cancelAnimationFrame(scrollRAF);
        }
        //开启动画帧
        scrollRAF = requestAnimationFrame(() => {
            // 初始化累加器和索引
            let accumulatedHeight = 0;
            let accumulatedWidth = 0;
            let startRowIndex = 0;
            let startColIndex = 0;
            if (!rowConfig || !colConfig) {
                return;
            }
            // 计算起始行索引
            if (ScrollT > 0) {
                for (let i = 0; i < rowConfig.length; i++) {
                    accumulatedHeight += rowConfig[i].height;
                    if (accumulatedHeight > ScrollT) {
                        startRowIndex = i;
                        break;
                    }
                }
            }
            if (scrollL > 0) {
                for (let i = 0; i < colConfig.length; i++) {
                    accumulatedWidth += colConfig[i].width;
                    if (accumulatedWidth > scrollL) {
                        startColIndex = i;
                        break;
                    }
                }
            }
            // 更新行配置
            updateRenderConfig(renderRowConfig, startRowIndex, rowConfig.length);
            // 更新列配置
            updateRenderConfig(renderColConfig, startColIndex, colConfig.length);

            console.log(renderRowConfig)

        });
    };

    function updateRenderConfig(renderConfig: RenderConfig, startIdx: number, totalLength: number) {
        const { currentRenderNum, preRenderNum } = renderConfig;

        renderConfig.startIndex = startIdx;
        renderConfig.endIndex = startIdx + currentRenderNum - 1;
        renderConfig.renderEndIndex = Math.min(renderConfig.endIndex + preRenderNum, totalLength);
        renderConfig.renderStartIndex = startIdx >= preRenderNum ? startIdx - preRenderNum : 0;
    }

    //渲染行配置数组
    const renderRowArr = computed(() => {
        const { renderStartIndex, renderEndIndex } = renderRowConfig;
        if (!rowConfig) {
            return null;
        }
        return rowConfig.slice(renderStartIndex, renderEndIndex);
    });

    //渲染列配置数组
    const renderColArr = computed(() => {
        const { renderStartIndex, renderEndIndex } = renderColConfig;
        if (!colConfig) {
            return null;
        }
        return colConfig.slice(renderStartIndex, renderEndIndex);
    });

    setupProvides({ scrollX, scrollY, rowConfig, colConfig, settings: newSheetSettings, totalColWidth, totalRowHeight, renderRowConfig, renderColConfig, renderColArr, renderRowArr })

    return {
        settings: newSheetSettings,
        rowConfig,
        colConfig,
        totalColWidth,
        totalRowHeight,
        listerScroll,
        scrollY,
        getCurrentRenderRows,
        getCurrentRenderCols,
    }
}

