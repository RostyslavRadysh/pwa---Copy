import PatchEntityModel from '@/models/patchEntityModel'

interface ITaskDevice {
    id: number
    iTaskMenuId: number | PatchEntityModel
    departmentId: number | PatchEntityModel
    title: string | PatchEntityModel
    isPinCode: boolean | PatchEntityModel
    pinCode: string | PatchEntityModel
    lastConnection: string | PatchEntityModel
}

export default ITaskDevice
