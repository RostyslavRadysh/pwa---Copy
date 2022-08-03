import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { FunctionComponent,
    useState,
    useEffect } from 'react'
import { deleteCookie, getCookie } from 'cookies-next'
import axios from 'axios'
import { useToast } from '@/providers/toastContextProvider'
import FormContextProvider from '@/providers/formContextProvider'
import Hammer from 'react-hammerjs'
import { withAuth } from '@/utils/auth'
import type { GetDevicesResponse } from '@/models/getDevicesResponse'
import type { GetButtonsResponse } from '@/models/getButtonsResponse'
import type { GetMenusResponse } from '@/models/getMenusResponse'
import type { GetSettingsResponse } from '@/models/getSettingsResponse'
import type { UpdateDeviceRequest } from '@/models/updateDeviceRequest'
import DataGrid from '@/components/dataGrids'
import Modal from '@/components/modals'
import Locker from '@/components/lockers'
import ScreenSaver from '@/components/screenSavers'
import Input from '@/components/inputs'
import Button from '@/components/buttons'
import type { Config } from '@/models/config'

const Index: FunctionComponent = () => {
    const router = useRouter()
    const { toast } = useToast()

    const name = `${getCookie('name')}`

    const [config, setConfig] = useState<Config>({
        settings: {
            applicationBackgroundColor: 'ffffffff',
            screenSaverBackgroundColor: 'ffffffff',
            isScreenSaverImage: false,
            screenSaverImageUrl: undefined,
            isScreenSaverText: false,
            screenSaverText: undefined
        },
        device: undefined,
        menu: undefined,
        buttons: undefined,
        feedback: {
            id: 0,
            isOpen: false,
            time: 0,
            isAllowUndo: false
        }
    })
    const [pinCode, setPinCode] = useState<string | undefined>(undefined)
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [isLocker, setIsLocker] = useState<boolean>(false)
    const [isScreenSaver, setIsScreenSaver] = useState<boolean>(false)
    const [screenSaverText, setScreenSaverText] = useState<string | undefined>(undefined)

    useEffect(() => {
        let timer = setInterval(async () => {
            try {
                const baseUrl = `${getCookie('baseUrl')}`
                const key = Number(getCookie('key'))

                const { data: devices } = await axios.get<GetDevicesResponse>(`${baseUrl}/api/itaskdevices`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    }
                })
                const { data: buttons } = await axios.get<GetButtonsResponse>(`${baseUrl}/api/itaskmenubuttons`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    }
                })
                const { data: menus } = await axios.get<GetMenusResponse>(`${baseUrl}/api/itaskmenus`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    }
                })
                const { data: settings } = await axios.get<GetSettingsResponse>(`${baseUrl}/api/itasksettings`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    }
                })

                const device = devices?.entities.find(entity => entity.id === key)
                const menu = menus?.entities.find(entity => entity.id === device?.iTaskMenuId)

                const date = (new Date()).toJSON()
                await axios.patch<number>(`${baseUrl}/api/itaskdevices`, {
                    id: device?.id,
                    iTaskMenuId: {
                        value: device?.iTaskMenuId,
                        isChanged: false
                    },
                    departmentId: {
                        value: device?.departmentId,
                        isChanged: false
                    },
                    name: {
                        value: device?.title,
                        isChanged: false
                    },
                    isPinCode: {
                        value: device?.isPinCode,
                        isChanged: false
                    },
                    pinCode: {
                        value: device?.pinCode,
                        isChanged: false
                    },
                    lastConnectionTime: {
                        value: date,
                        isChanged: true
                    }
                } as UpdateDeviceRequest, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    }
                })
            
                setConfig({
                    settings: {
                        applicationBackgroundColor: settings.applicationBackgroundColor,
                        screenSaverBackgroundColor: settings.screenSaverBackgroundColor,
                        isScreenSaverImage: settings.isScreenSaverImage,
                        screenSaverImageUrl: settings.screenSaverImageUrl,
                        isScreenSaverText: settings.isScreenSaverText,
                        screenSaverText: settings.screenSaverText
                    },
                    device: device,
                    menu: menu,
                    buttons: buttons?.entities,
                    feedback: {
                        id: 0,
                        isOpen: false,
                        time: 0,
                        isAllowUndo: false
                    }
                })
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 404) {
                        deleteCookie('baseUrl')
                        deleteCookie('name')
                        deleteCookie('key')
                        
                        router.push('/login')
                    }
                    toast(error.message)
                } else {
                    console.log('Unexpected error: ', error)
                }
            }
        }, 15 * 1000)

        return () => {
            clearInterval(timer)
        }
    }, [])

    let timer: NodeJS.Timeout;
    const handleMouseMove = () => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(async () => {
            const baseUrl = `${getCookie('baseUrl')}`
            const key = Number(getCookie('key'))

            const { data: devices } = await axios.get<GetDevicesResponse>(`${baseUrl}/api/itaskdevices`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })
            const { data: settings } = await axios.get<GetSettingsResponse>(`${baseUrl}/api/itasksettings`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })

            const device = devices?.entities.find(entity => entity.id === key)

            if (settings.isScreenSaverText) {
                setIsScreenSaver(true)
                setScreenSaverText(settings.screenSaverText)
            }
            if (device?.isPinCode) {
                setIsLocker(true)
            }
        }, 5 * 1000)
    }
    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove)
        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            if (timer) clearTimeout(timer)
        }
    }, [])

    const createTask = async (buttonId: number) => {
        const key = Number(getCookie('key'))
        const baseUrl = `${getCookie('baseUrl')}`

        const { data: id } = await axios.get<number>(`${baseUrl}/api/tasks?iTaskDeviceId=${key}&iTaskMenuButtonId=${buttonId}`)

        const button = config.buttons?.find(button => button.id == buttonId)

        if(button?.feedbackTime) setConfig({ ...config, feedback: { 
            id: id,
            isOpen: true, 
            time: button.feedbackTime, 
            isAllowUndo: button.isAllowUndo 
        } })
    }

    const onHandleCancelTaskClick = async (taskId: number) => {
        const baseUrl = `${getCookie('baseUrl')}`

        await axios.delete<boolean>(`${baseUrl}/api/tasks/${taskId}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
    }

    const checkPinCode = () => {
        if(config.device?.pinCode === pinCode) {
            setIsLocker(false)
            setIsScreenSaver(false)
        } else {
            toast('Pin Code is incorrect')
        }
    }
    const baseUrl = `${getCookie('baseUrl')}`

    return (<>
        <ScreenSaver isOpen={isScreenSaver} 
            color={config.settings.applicationBackgroundColor}
            isImage={config.settings.isScreenSaverImage}
            imageUrl={`${baseUrl}${config.settings.screenSaverImageUrl?.replace('~', '')}`}
            onClick={(value: boolean) => setIsScreenSaver(value)}>
            <div className="w-full
                h-full
                flex 
                justify-center
                items-center
                space-x-4">
                    <h5 className="text-gray-900 
                        text-xl 
                        leading-tight 
                        font-medium">
                        {screenSaverText}
                    </h5>
            </div>
        </ScreenSaver>
        <Locker isOpen={isLocker}>
            <div className="w-full
                    h-full
                    flex 
                    justify-center
                    items-center">
                <div className="block p-6 max-w-sm">
                    <FormContextProvider onSubmit={checkPinCode}>
                        <div className="space-y-4">
                            <Input
                                label="Pin Code"
                                placeholder="Pin Code"
                                errorMessage="Incorrect Pin Code"
                                required
                                minLength={1}
                                maxLength={64}
                                onChange={(value: string | undefined) => setPinCode(value)} />
                            <div className="flex justify-center items-center">
                                <Button
                                    title="Validate"
                                    type="submit" />
                            </div>
                        </div>
                    </FormContextProvider>
                </div>
            </div>
        </Locker>
        <Modal isOpen={isMenuOpen}
            onClick={(value: boolean) => setIsMenuOpen(value)}>
            <div className="w-full
                h-full
                flex 
                justify-center
                items-center
                space-x-4">
                <h5 className="text-gray-900 
                    text-xl 
                    leading-tight 
                    font-medium">
                    {name}
                </h5>
                <span className="cursor-pointer" 
                    onClick={() => router.push('/settings')}>
                        SETTINGS
                </span>
            </div>
        </Modal>
        <Modal isOpen={config.feedback.isOpen}
            onClick={(value: boolean) => setConfig({ ...config, feedback: { ...config.feedback, isOpen: value } })}>
            <div className="w-full
                h-full
                flex 
                justify-center
                items-center
                space-x-4">
                {config.feedback.isAllowUndo ? (
                    <div className="space-y-4">
                        <h5 className="text-gray-900 
                            text-xl 
                            leading-tight 
                            font-medium">
                            Your task has been created successfully
                        </h5>
                        <div className="flex justify-center items-center">
                            <Button
                                title="Undo"
                                onClick={() => onHandleCancelTaskClick(config.feedback.id)} />
                        </div>
                    </div>
                ) : (
                    <h5 className="text-gray-900 
                        text-xl 
                        leading-tight 
                        font-medium">
                        Your task has been created successfully
                    </h5>
                )}
            </div>
        </Modal>
        <Hammer direction="DIRECTION_DOWN"
            onPan={() => { if(!isMenuOpen) setIsMenuOpen(true) }}>
            <div className={`w-screen 
                h-screen
                bg-[#${config.settings.applicationBackgroundColor}`}>
                <DataGrid rows={config.menu?.rows ?? 0} 
                        columns={config.menu?.columns ?? 0} 
                        buttons={config.buttons} 
                        onClick={createTask} />
            </div>
        </Hammer>
    </>)
}

export default Index

export const getServerSideProps: GetServerSideProps = withAuth
