export type Device = {
    id: number
    iTaskMenuId: number | undefined
    departmentId: number | undefined
    title: string
    isPinCode: boolean
    pinCode: string
    lastConnection: string
}

export type GetDevicesResponse = {
    entities: Device[]
}
