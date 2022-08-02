import PatchEntityModel from '@/models/patchEntityModel'

interface Button {
    id: number
    iTaskMenuId: PatchEntityModel
    taskPresetId: PatchEntityModel
    row: PatchEntityModel
    column: PatchEntityModel
    icon: PatchEntityModel
    label: PatchEntityModel
    feedbackTime: PatchEntityModel
    isAllowUndo:  PatchEntityModel
}

export default Button
