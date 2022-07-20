import PatchEntityModel from "@/models/patchEntityModel"

export type PutDeviceRequest = {
    id: number
    iTaskMenuId: PatchEntityModel
    departmentId: PatchEntityModel
    title: PatchEntityModel
    isPinCode: PatchEntityModel
    pinCode: PatchEntityModel
    lastConnection: PatchEntityModel
}
