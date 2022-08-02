import PatchEntityModel from '@/models/patchEntityModel'

interface Device {
    id: number
    iTaskMenuId: PatchEntityModel
    departmentId: PatchEntityModel
    name: PatchEntityModel
    isPinCode: PatchEntityModel
    pinCode: PatchEntityModel
    lastConnectionTime: PatchEntityModel
}

export default Device
