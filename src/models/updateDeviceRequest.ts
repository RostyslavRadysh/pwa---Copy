import PatchEntityModel from "@/models/patchEntityModel"

export type UpdateDeviceRequest = {
    id: number
    iTaskMenuId: PatchEntityModel
    departmentId: PatchEntityModel
    title: PatchEntityModel
    isPinCode: PatchEntityModel
    pinCode: PatchEntityModel
    lastConnection: PatchEntityModel
}
