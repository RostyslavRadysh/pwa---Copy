import PatchEntityModel from '@/models/patchEntityModel'

interface ITaskMenuButton {
    id: number
    iTaskMenuId: number | PatchEntityModel
    taskPresetId: number | PatchEntityModel
    row: number | PatchEntityModel
    column: number | PatchEntityModel
    icon: number | PatchEntityModel
    buttonLabel: string | PatchEntityModel
    feedbackTime: number | PatchEntityModel
    isAllowUndo: number | PatchEntityModel
}

export default ITaskMenuButton
