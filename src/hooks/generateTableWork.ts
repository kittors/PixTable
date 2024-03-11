import setupInjects from "@/hooks/injects"
import defaultSettings from '@/config/tableDefaultConfig'
import { reactive } from "vue"
import { columnIndexToTitle } from '@/utils/sheetUtils'
export default function generateTableWork() {
    const { sheetSettings } = setupInjects()
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

    //修改列宽
    const updateColConfig = (colIndex: number, value: number) => {
        colConfig[colIndex].width = colConfig[colIndex].width + value
    }
    console.log(colConfig)
    return {
        settings: newSheetSettings,
        rowConfig,
        colConfig,
    }
}

