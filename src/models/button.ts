export type Button = {
    id: number
    iTaskMenuId: number
    taskPresetId: number
    row: number
    column: number
    icon: number
    label: string
    backgroundColor: string
    iconColor: string
    feedbackTime: number
    feedbackText: string | undefined
    isAllowUndo: boolean
}
