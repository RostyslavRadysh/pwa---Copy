import { useRouter } from 'next/router'
import React, { FunctionComponent,
    useState,
    useEffect } from 'react'
import axios from 'axios'
import { useToast } from '@/providers/toastContextProvider'
import FormContextProvider from '@/providers/formContextProvider'
import Hammer from 'react-hammerjs'
import type { GetDeviceResponse } from '@/models/getDeviceResponse'
import type { GetButtonsResponse } from '@/models/getButtonsResponse'
import type { GetMenuResponse } from '@/models/getMenuResponse'
import type { GetConfigResponse } from '@/models/getConfigResponse'
import type { UpdateDeviceRequest } from '@/models/updateDeviceRequest'
import DataGrid from '@/components/dataGrids'
import Modal from '@/components/modals'
import Locker from '@/components/lockers'
import Input from '@/components/inputs'
import Button from '@/components/buttons'
import ScreenLoading from '@/components/screenLoading'
import type { Button as ButtonModel } from '@/models/button'
import type { Config as ConfigModel } from '@/models/config'
import type { Device as DeviceModel } from '@/models/device'
import type { Feedback as FeedbackModel } from '@/models/feedbak'
import type { Menu as MenuModel } from '@/models/menu'
import Icon93 from '@/icons/icon-93.svg'

const Index: FunctionComponent = () => {
    const router = useRouter()
    const { toast } = useToast()

    const [buttons, setButtons] = useState<ButtonModel[] | undefined>(undefined)
    const [device, setDevice] = useState<DeviceModel | undefined>(undefined)
    const [menu, setMenu] = useState<MenuModel | undefined>(undefined)
    const [config, setConfig] = useState<ConfigModel | undefined>()
    const [feedback, setFeedback] = useState<FeedbackModel | undefined>(undefined)

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [isScreenSaverOpen, setIsScreenSaverOpen] = useState<boolean>(false)
    const [isLockerOpen, setIsLockerOpen] = useState<boolean>(false)
    const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false)

    const [pinCode, setPinCode] = useState<string | undefined>(undefined)
    
    const [screenSaverImageUri, setScreenSaverImageUri] = useState<string | undefined>(undefined)
    const [deviceName, setDeviceName] = useState<string | undefined>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if(!router.isReady) return

        const basePath = localStorage.getItem('basePath')
        const baseUrl = localStorage.getItem('baseUrl')
        const token = localStorage.getItem('token')
        const deviceId = localStorage.getItem('deviceId')

        let onHandleRefresh = setInterval(async () => {
            try {
                const { data: deviceResponse } = await axios.get<GetDeviceResponse>(`${baseUrl}/api/itaskdevices/${deviceId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                if(device?.id !== deviceResponse.id ||
                   device?.iTaskMenuId !== deviceResponse.iTaskMenuId ||
                   device?.departmentId !== deviceResponse.departmentId ||
                   device?.name !== deviceResponse.name ||
                   device?.isPinCode !== deviceResponse.isPinCode ||
                   device?.pinCode !== deviceResponse.pinCode ||
                   device?.isSettings !== deviceResponse.isSettings ||
                   device?.lastConnection !== deviceResponse.lastConnection) {
                    setDeviceName(deviceResponse.name)
                    setDevice(deviceResponse)
                }

                if(deviceResponse.iTaskMenuId) {
                    const { data: menuResponse } = await axios.get<GetMenuResponse>(`${baseUrl}/api/itaskmenus/${deviceResponse.iTaskMenuId}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    if(menu?.id !== menuResponse.id ||
                       menu?.title !== menuResponse.title ||
                       menu?.rows !== menuResponse.rows ||
                       menu?.columns !== menuResponse.columns) setMenu(menuResponse)
                }

                if(deviceResponse.iTaskMenuId) {
                    const { data: buttonsResponse } = await axios.get<GetButtonsResponse>(`${baseUrl}/api/itaskmenus/${deviceResponse.iTaskMenuId}/buttons`, {
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    })

                    let isEqual = true
                    if (buttons?.length !== buttonsResponse.entities.length) isEqual = false
                    else {
                        for (var index = 0, length = buttons?.length ?? 0; index < length; index++) { 
                            if (buttons[index]?.id != buttonsResponse.entities[index]?.id ||
                                buttons[index]?.iTaskMenuId != buttonsResponse.entities[index]?.iTaskMenuId ||
                                buttons[index]?.taskPresetId != buttonsResponse.entities[index]?.taskPresetId ||
                                buttons[index]?.row != buttonsResponse.entities[index]?.row ||
                                buttons[index]?.column != buttonsResponse.entities[index]?.column ||
                                buttons[index]?.icon != buttonsResponse.entities[index]?.icon ||
                                buttons[index]?.label != buttonsResponse.entities[index]?.label ||
                                buttons[index]?.backgroundColor != buttonsResponse.entities[index]?.backgroundColor ||
                                buttons[index]?.iconColor != buttonsResponse.entities[index]?.iconColor ||
                                buttons[index]?.feedbackTime != buttonsResponse.entities[index]?.feedbackTime ||
                                buttons[index]?.feedbackText != buttonsResponse.entities[index]?.feedbackText ||
                                buttons[index]?.isAllowUndo != buttonsResponse.entities[index]?.isAllowUndo) isEqual = false        
                        }  
                    }     

                    if(!isEqual) setButtons(buttonsResponse.entities)
                }
                const { data: configResponse } = await axios.get<GetConfigResponse>(`${baseUrl}/api/itasksettings`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                if(config?.applicationBackgroundColor !== configResponse.applicationBackgroundColor ||
                   config?.isScreenSaverImage !== configResponse.isScreenSaverImage ||
                   config?.isScreenSaverText !== configResponse.isScreenSaverText ||
                   config?.screenSaverBackgroundColor !== configResponse.screenSaverBackgroundColor ||
                   config?.screenSaverImageUrl !== configResponse.screenSaverImageUrl ||
                   config?.screenSaverText !== configResponse.screenSaverText ||
                   config?.screenSaverTime !== configResponse.screenSaverTime) { 
                    if (configResponse.isScreenSaverImage) {
                        setScreenSaverImageUri(`${(baseUrl ?? '').replace('/api', '/itransport')}/${config?.screenSaverImageUrl?.replace('~', '')}`)
                    }
                    else {
                        setScreenSaverImageUri(`${basePath}/assets/logo-diractive.png`)
                    }
    
                    setConfig(configResponse)
                }

                const date = (new Date()).toJSON()
                await axios.patch<number>(`${baseUrl}/api/itaskdevices`, {
                    id: deviceResponse?.id,
                    iTaskMenuId: {
                        value: deviceResponse?.iTaskMenuId,
                        isChanged: false
                    },
                    departmentId: {
                        value: deviceResponse?.departmentId,
                        isChanged: false
                    },
                    name: {
                        value: deviceResponse?.name,
                        isChanged: false
                    },
                    isPinCode: {
                        value: deviceResponse?.isPinCode,
                        isChanged: false
                    },
                    pinCode: {
                        value: deviceResponse?.pinCode,
                        isChanged: false
                    },
                    isSettings: {
                        value: deviceResponse?.isSettings,
                        isChanged: false
                    },
                    lastConnectionTime: {
                        value: date,
                        isChanged: true
                    }
                } as UpdateDeviceRequest, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    switch(error.response?.status) {
                        case 404: {
                            const basePath = localStorage.getItem('basePath')
                            const format = localStorage.getItem('format')

                            localStorage.removeItem('basePath')
                            localStorage.removeItem('format')
                            localStorage.removeItem('baseUrl')
                            localStorage.removeItem('token')
                            localStorage.removeItem('deviceId')

                            router.push(`${basePath}/loginUser${format}?basePath=${basePath}&format=${format}`)

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
        }, 60 * 1000)

        return () => {
            clearInterval(onHandleRefresh)
        }
    }, [buttons, device, config, menu, router.isReady])

    let onHandleMouseMoveTimer: NodeJS.Timeout;
    const onHandleMouseMove = () => {        
        if (onHandleMouseMoveTimer) clearTimeout(onHandleMouseMoveTimer)
        onHandleMouseMoveTimer = setTimeout(async () => {
            try {
                if (config?.screenSaverTime) {
                    setIsScreenSaverOpen(true)
                }
                if (device?.isPinCode) {
                    setIsLockerOpen(true)
                }
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    switch(error.response?.status) {
                        case 404: {
                            const basePath = localStorage.getItem('basePath')
                            const format = localStorage.getItem('format')

                            localStorage.removeItem('basePath')
                            localStorage.removeItem('format')
                            localStorage.removeItem('baseUrl')
                            localStorage.removeItem('token')
                            localStorage.removeItem('deviceId')

                            router.push(`${basePath}/loginUser${format}?basePath=${basePath}&format=${format}`)

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
        }, (config?.screenSaverTime ?? 0) * 1000)
    }

    useEffect(() => {
        if(config?.screenSaverTime) {
            window.addEventListener("mousemove", onHandleMouseMove)
        }
        return () => {
            window.removeEventListener("mousemove", onHandleMouseMove)
            if (onHandleMouseMoveTimer) clearTimeout(onHandleMouseMoveTimer)
        }
    }, [device, config])

    const onHandleCreateTask = async (buttonId: number) => {
        setIsLoading(true)

        const baseUrl = localStorage.getItem('baseUrl')
        const token = localStorage.getItem('token')
        const deviceId = localStorage.getItem('deviceId')

        const { data: taskId } = await axios.get<number>(`${baseUrl}/api/tasks?iTaskDeviceId=${deviceId}&iTaskMenuButtonId=${buttonId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (taskId == -1) {
            toast('Failed to create task')
        } else {
            const button = buttons?.find(button => button.id == buttonId)

            if(button?.feedbackTime) {
                setFeedback({ 
                    taskId: taskId,
                    time: button.feedbackTime, 
                    text: button.feedbackText,
                    isAllowUndo: button.isAllowUndo 
                })
                setIsFeedbackOpen(true)
            }
        }
        setIsLoading(false)
    }

    const onHandleUndoCreateTaskClick = async (taskId: number) => {
        setIsLoading(true)

        const baseUrl = localStorage.getItem('baseUrl')
        const token = localStorage.getItem('token')

        await axios.delete<boolean>(`${baseUrl}/api/tasks/${taskId}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        setIsFeedbackOpen(false)

        setIsLoading(false)
    }

    const onHandleOkayClick = () => {
        setIsFeedbackOpen(false)
    }

    const onHandleValidatePinCode = () => {
        if(device?.pinCode === pinCode) {
            setIsLockerOpen(false)
            setIsScreenSaverOpen(false)
        } else {
            toast('Pin code is incorrect')
        }
    }

    const onHandleSettingsClick = () => {
        const basePath = localStorage.getItem('basePath')
        const format = localStorage.getItem('format')

        router.push(`${basePath}/settings${format}`)
    }

    return (
        <>
            <ScreenLoading isLoading={isLoading} />
            <Locker isLocked={isLockerOpen}>
                <div className="w-full h-full flex justify-center items-center">
                    <div className="block p-6 max-w-sm">
                        <FormContextProvider onSubmit={onHandleValidatePinCode}>
                            <div className="space-y-4">
                                <Input
                                    type='password'
                                    label="Pin code"
                                    placeholder="Pin code"
                                    errorMessage="Incorrect Pin code"
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
                backgroundColor={config?.screenSaverBackgroundColor}  
                imageUrl={screenSaverImageUri}  
                onClick={(value) => setIsScreenSaverOpen(value)}>
                {config?.isScreenSaverText && !config?.isScreenSaverImage && (  
                    <div className="fixed z-30"  
                        onClick={() => setIsScreenSaverOpen(false)}>  
                        <div className="w-full h-full flex justify-center items-center">  
                            <h5 className="text-gray-900 text-xl leading-tight font-medium select-none cursor-default">  
                                {config?.screenSaverText}  
                            </h5>  
                        </div>  
                    </div>  
                )}  
            </Modal>
            <Modal isOpen={isMenuOpen}
                onClick={(value) => setIsMenuOpen(value)}
                backgroundColor={undefined}
                imageUrl={undefined}>
                <div className="bg-white fixed w-1/2 h-2/6 rounded shadow-md z-30">
                    <div className="w-full h-full flex justify-center items-center space-x-2">
                        <h5 className="text-gray-900 text-xl leading-tight font-medium">
                            {deviceName}
                        </h5>
                        <span className="cursor-pointer fill-black w-12 shrink-0 select-none" 
                            onClick={onHandleSettingsClick}>
                                <Icon93 />
                        </span>
                    </div>
                </div>
            </Modal>
            <Modal isOpen={isFeedbackOpen}
                onClick={(value) => setIsFeedbackOpen(value)}
                backgroundColor={config?.applicationBackgroundColor}
                imageUrl={undefined}>
                    {feedback?.isAllowUndo ? (
                        <div className="bg-white fixed w-1/2 h-2/6 rounded shadow-md z-30">
                            <div className="w-full h-full flex flex-col justify-center items-center space-y-4">
                                <h5 className="text-gray-900 text-xl leading-tight font-medium">
                                    {feedback?.text}
                                </h5>
                                <div className="flex justify-between items-center">
                                    <Button
                                        title="Okay"
                                        onClick={onHandleOkayClick} />
                                    <Button title="Undo"
                                        color="white"
                                        onClick={() => onHandleUndoCreateTaskClick(feedback?.taskId)} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white fixed w-1/2 h-2/6 rounded shadow-md z-30">
                            <div className="w-full h-full flex flex-col justify-center items-center space-y-4">
                                <h5 className="text-gray-900 text-xl leading-tight font-medium">
                                    {feedback?.text}
                                </h5>
                                <div className="flex justify-between items-center">
                                    <Button
                                        title="Okay"
                                        onClick={onHandleOkayClick} />
                                </div>
                            </div>
                        </div>
                    )}
            </Modal>
            {device?.isSettings && (
                <Hammer direction="DIRECTION_DOWN"
                    onPan={() => { if(!isMenuOpen) setIsMenuOpen(true) }}>
                    <div className="w-screen h-screen" 
                        style={{ backgroundColor: config?.applicationBackgroundColor }}>
                        <DataGrid rows={menu?.rows ?? 0} 
                                columns={menu?.columns ?? 0} 
                                buttons={buttons} 
                                onClick={onHandleCreateTask} />
                    </div>
                </Hammer>
            )}
            {!device?.isSettings && (
                <div className="w-screen h-screen" 
                    style={{ backgroundColor: config?.applicationBackgroundColor }}>
                    <DataGrid rows={menu?.rows ?? 0} 
                            columns={menu?.columns ?? 0} 
                            buttons={buttons} 
                            onClick={onHandleCreateTask} />
                </div>
            )}
        </>
    )
}

export default Index
