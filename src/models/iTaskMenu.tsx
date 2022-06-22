import PatchEntityModel from '@/models/patchEntityModel'

interface ITaskMenu {
    id: number
    title: string | PatchEntityModel
    rows: number | PatchEntityModel
    columns: number | PatchEntityModel
}

export default ITaskMenu
