import type { Button } from "@/models/button"
import type { Device } from "@/models/device"
import type { Menu } from "@/models/menu"

export type Config = {
    settings: {
        applicationBackgroundColor: string
        screenSaverBackgroundColor: string
        isScreenSaverImage: boolean
        screenSaverImageUrl: string | undefined
        isScreenSaverText: boolean
        screenSaverText: string | undefined
    }
    device: Device | undefined
    menu: Menu | undefined
    buttons: Button[] | undefined
    feedback: {
        id: number
        isOpen: boolean
        time: number
        isAllowUndo: boolean
        text: string | undefined
    }
}
