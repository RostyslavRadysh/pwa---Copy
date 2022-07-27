import type { Button } from "@/models/button"
import type { Device } from "@/models/device"
import type { Menu } from "@/models/menu"

export type Config = {
    device: Device | undefined
    menu: Menu | undefined
    buttons: Button[] | undefined
    feedback: {
        id: number
        isOpen: boolean
        time: number
        isAllowUndo: boolean
    }
}
