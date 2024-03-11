
interface RowConfig {
    height: number,
    index: number,
}
interface ColConfig {
    width: number,
    title: string
}

interface CellItem {
    value?: string,
}

declare type SheetConfig = {
    rowConfig: RowConfig[],
    colConfig: ColConfig[],
    cellConfig: CellItem[][],
}