import PatchEntityModel from "@/models/patchEntityModel"

export type UpdateDeviceRequest = {
    id: number
    iTaskMenuId: PatchEntityModel
    departmentId: PatchEntityModel
    name: PatchEntityModel
    isPinCode: PatchEntityModel
    pinCode: PatchEntityModel
    isSettings: PatchEntityModel
    lastConnectionTime: PatchEntityModel
}
