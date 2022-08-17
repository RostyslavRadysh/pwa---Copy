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
import Input from '@/components/inputs'
import Button from '@/components/buttons'
import type { Config } from '@/models/config'
import Settings from '@/icons/settings.svg'

interface IndexProps {
    baseUrl: string
    name: string
    id: string
}

const Index: FunctionComponent<IndexProps> = ({ baseUrl, name, id }) => {
    const router = useRouter()
    const { toast } = useToast()
    
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

    const [isScreenSaverOpen, setIsScreenSaverOpen] = useState<boolean>(false)
    const [screenSaverText, setScreenSaverText] = useState<string | undefined>(undefined)

    useEffect(() => {
        let onHandleRefresh = setInterval(async () => {
            try {
                const { data: device } = await axios.get<GetDeviceResponse>(`${baseUrl}/api/itaskdevices/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    }
                })
                let buttons
                if(device.iTaskMenuId) {
                    const { data: buttons1 } = await axios.get<GetButtonsResponse>(`${baseUrl}/api/itaskmenus/${device.iTaskMenuId}/buttons`, {
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json'
                        }
                    })
                    buttons = buttons1
                }
                let menu
                if(device.iTaskMenuId) {
                    const { data: menu1 } = await axios.get<GetMenuResponse>(`${baseUrl}/api/itaskmenus/${device.iTaskMenuId}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json'
                        }
                    })
                    menu = menu1
                }
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
                            deleteCookie('id')
                            
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
                const { data: device } = await axios.get<GetDeviceResponse>(`${baseUrl}/api/itaskdevices/${id}`, {
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
                    setIsScreenSaverOpen(true)
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
                            deleteCookie('id')
                            
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
        const { data: id1 } = await axios.get<number>(`${baseUrl}/api/tasks?iTaskDeviceId=${id}&iTaskMenuButtonId=${buttonId}`)
        const button = config.buttons?.find(button => button.id == buttonId)

        if(button?.feedbackTime) setConfig({ ...config, feedback: { 
            id: id1,
            isOpen: true, 
            time: button.feedbackTime, 
            text: button.feedbackText,
            isAllowUndo: button.isAllowUndo 
        } })
    }

    const onHandleUndoCreateTaskClick = async (taskId: number) => {
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
            setIsScreenSaverOpen(false)
        } else {
            toast('Pin Code is incorrect')
        }
    }

    const onHandleSettingsClick = () => {
        router.push('/settings')
    }

    return (<>
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
        <Modal isOpen={isScreenSaverOpen}
            backgroundColor={config.settings.screenSaverBackgroundColor}
            imageUrl={`http://localhost:1900/${config.settings.screenSaverImageUrl?.replace('~', '')}`}
            onClick={(value) => setIsScreenSaverOpen(value)}>
            {config.settings.isScreenSaverText && !config.settings.isScreenSaverImage && (
                <div className="fixed z-20"
                    onClick={() => setIsScreenSaverOpen(false)}>
                    <div className="w-full h-full flex justify-center items-center">
                        <h5 className="text-gray-900 text-xl leading-tight font-medium select-none cursor-default">
                            {screenSaverText}
                        </h5>
                    </div>
                </div>
            )}
        </Modal>
        <Modal isOpen={isMenuOpen}
            onClick={(value) => setIsMenuOpen(value)}
            backgroundColor={undefined}
            imageUrl={undefined}>
            <div className="bg-white fixed w-1/2 h-2/6 rounded shadow-md z-20">
                <div className="w-full h-full flex justify-center items-center space-x-2">
                    <h5 className="text-gray-900 text-xl leading-tight font-medium">
                        {name}
                    </h5>
                    <span className="cursor-pointer fill-black w-12 shrink-0 select-none" 
                        onClick={onHandleSettingsClick}>
                            <Settings />
                    </span>
                </div>
            </div>
        </Modal>
        <Modal isOpen={config.feedback.isOpen}
            onClick={(value: boolean) => setConfig({ ...config, feedback: { ...config.feedback, isOpen: value } })}
            backgroundColor={undefined}
            imageUrl={undefined}>
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
                                onClick={() => onHandleUndoCreateTaskClick(config.feedback.id)} />
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
