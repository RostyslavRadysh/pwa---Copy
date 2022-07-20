export type Menu = {
    id: number
    title: string
    rows: number
    columns: number
}

export type GetMenusResponse = {
    entities: Menu[]
}
