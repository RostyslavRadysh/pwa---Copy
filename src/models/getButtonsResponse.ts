export type Button = {
    id: number
    iTaskMenuId: number
    taskPresetId: number
    row: number
    column: number
    icon: number
    buttonLabel: string
    feedbackTime: number
    isAllowUndo: number
}

export type GetButtonsResponse = {
    entities: Button[]
}
