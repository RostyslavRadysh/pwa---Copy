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
import type { GetDeviceResponse } from '@/models/getDeviceResponse'
import type { GetButtonsResponse } from '@/models/getButtonsResponse'
import type { GetMenuResponse } from '@/models/getMenuResponse'
import type { GetSettingsResponse } from '@/models/getSettingsResponse'
import type { UpdateDeviceRequest } from '@/models/updateDeviceRequest'
import DataGrid from '@/components/dataGrids'
import Modal from '@/components/modals'
import Locker from '@/components/lockers'
import ScreenSaver from '@/components/screenSavers'
import Input from '@/components/inputs'
import Button from '@/components/buttons'
import type { Config } from '@/models/config'
import Settings from '@/icons/settings.svg'

const Index: FunctionComponent = () => {
    const router = useRouter()
    const { toast } = useToast()

    const baseUrl = `${getCookie('baseUrl')}`
    const name = `${getCookie('name')}`
    const key = Number(getCookie('key'))

    const [config, setConfig] = useState<Config>({
        settings: {
            applicationBackgroundColor: '#ffffff',
            screenSaverBackgroundColor: '#ffffff',
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
            text: undefined,
            isAllowUndo: false
        }
    })
    const [pinCode, setPinCode] = useState<string | undefined>(undefined)
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    
    const [isLocker, setIsLocker] = useState<boolean>(false)
    const [lockerCode, setLockerCode] = useState<string | undefined>(undefined)

    const [isScreenSaver, setIsScreenSaver] = useState<boolean>(false)
    const [screenSaverText, setScreenSaverText] = useState<string | undefined>(undefined)

    useEffect(() => {
        let onHandleRefresh = setInterval(async () => {
            try {
                const { data: device } = await axios.get<GetDeviceResponse>(`${baseUrl}/api/itaskdevices/${key}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    }
                })
                const { data: buttons } = await axios.get<GetButtonsResponse>(`${baseUrl}/api/itaskmenus/${device.iTaskMenuId}/buttons`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    }
                })
                const { data: menu } = await axios.get<GetMenuResponse>(`${baseUrl}/api/itaskmenus/${device.iTaskMenuId}`, {
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
                        text: undefined,
                        isAllowUndo: false
                    }
                })
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    switch(error.response?.status) {
                        case 404: {
                            deleteCookie('baseUrl')
                            deleteCookie('name')
                            deleteCookie('key')
                            
                            router.push('/login')
                            break
                        }
                        default: {
                            toast('Connection failed')
                            console.log('Unexpected error: ', error)
                            break
                        }
                    }
                } else {
                    console.log('Unexpected error: ', error)
                }
            }
        }, 5 * 1000)

        return () => {
            clearInterval(onHandleRefresh)
        }
    }, [])

    let onHandleMouseMoveTimer: NodeJS.Timeout;
    const onHandleMouseMove = () => {
        if (onHandleMouseMoveTimer) clearTimeout(onHandleMouseMoveTimer)
        onHandleMouseMoveTimer = setTimeout(async () => {
            try {
                const { data: device } = await axios.get<GetDeviceResponse>(`${baseUrl}/api/itaskdevices/${key}`, {
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

                if (settings.isScreenSaverText || settings.isScreenSaverImage) {
                    setIsScreenSaver(true)
                    setScreenSaverText(settings.screenSaverText)
                }
                if (device?.isPinCode) {
                    setIsLocker(true)
                    setLockerCode(device.pinCode)
                }
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    switch(error.response?.status) {
                        case 404: {
                            deleteCookie('baseUrl')
                            deleteCookie('name')
                            deleteCookie('key')
                            
                            router.push('/login')
                            break
                        }
                        default: {
                            toast('Connection failed')
                            console.log('Unexpected error: ', error)
                            break
                        }
                    }
                } else {
                    console.log('Unexpected error: ', error)
                }
            }
        }, 10 * 1000)
    }
    useEffect(() => {
        window.addEventListener("mousemove", onHandleMouseMove)
        return () => {
            window.removeEventListener("mousemove", onHandleMouseMove)
            if (onHandleMouseMoveTimer) clearTimeout(onHandleMouseMoveTimer)
        }
    }, [])

    const onHandleCreateTask = async (buttonId: number) => {
        const { data: id } = await axios.get<number>(`${baseUrl}/api/tasks?iTaskDeviceId=${key}&iTaskMenuButtonId=${buttonId}`)
        const button = config.buttons?.find(button => button.id == buttonId)

        if(button?.feedbackTime) setConfig({ ...config, feedback: { 
            id: id,
            isOpen: true, 
            time: button.feedbackTime, 
            text: button.feedbackText,
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

    const onHandleCheckPinCode = () => {
        if(lockerCode === pinCode) {
            setIsLocker(false)
            setIsScreenSaver(false)
        } else {
            toast('Pin Code is incorrect')
        }
    }

    return (<>
        <ScreenSaver isOpen={isScreenSaver} 
            text={screenSaverText}
            isText={config.settings.isScreenSaverText}
            backgroundColor={config.settings.screenSaverBackgroundColor}
            isImage={config.settings.isScreenSaverImage}
            imageUrl={`${baseUrl}${config.settings.screenSaverImageUrl?.replace('~', '')}`}
            onClick={(value: boolean) => setIsScreenSaver(value)} />
        <Locker isLocked={isLocker}>
            <div className="w-full h-full flex justify-center items-center">
                <div className="block p-6 max-w-sm">
                    <FormContextProvider onSubmit={onHandleCheckPinCode}>
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
                <span className="cursor-pointer fill-black w-12" 
                    onClick={() => router.push('/settings')}>
                        <Settings />
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
                            {config.feedback.text}
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
                        {config.feedback.text}
                    </h5>
                )}
            </div>
        </Modal>
        <Hammer direction="DIRECTION_DOWN"
            onPan={() => { if(!isMenuOpen) setIsMenuOpen(true) }}>
            <div className="w-screen h-screen" 
                style={{ backgroundColor: config.settings.applicationBackgroundColor }}>
                <DataGrid rows={config.menu?.rows ?? 0} 
                        columns={config.menu?.columns ?? 0} 
                        buttons={config.buttons} 
                        onClick={onHandleCreateTask} />
            </div>
        </Hammer>
    </>)
}

export default Index

export const getServerSideProps: GetServerSideProps = withAuth
