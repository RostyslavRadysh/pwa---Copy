import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { FunctionComponent,
    useState,
    useEffect } from 'react'
import { getCookie } from 'cookies-next'
import axios from 'axios'
import Hammer from 'react-hammerjs'
import { withAuth } from '@/utils/auth'
import type { GetDevicesResponse } from '@/models/getDevicesResponse'
import type { GetButtonsResponse } from '@/models/getButtonsResponse'
import type { GetMenusResponse } from '@/models/getMenusResponse'
import type { UpdateDeviceRequest } from '@/models/updateDeviceRequest'
import DataGrid from '@/components/dataGrids'
import Modal from '@/components/modals'
import Button from '@/components/buttons'
import type { Config } from '@/models/config'

const Index: FunctionComponent = () => {
    const router = useRouter()

    const [config, setConfig] = useState<Config>({
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

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

    useEffect(() => {
        let timer = setInterval(async () => {
            const key = Number(getCookie('key'))
            const baseUrl = `${getCookie('baseUrl')}`

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
                title: {
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
                lastConnection: {
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
        }, 10 * 1000)
    
        return () => {
            clearInterval(timer)
        }
    }, [])

    let timer: NodeJS.Timeout;
    const handleMouseMove = () => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            console.log('Show the screensaver')
        }, 3000)
    }
    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove)
        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            if (timer) clearTimeout(timer)
        }
    },[])

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
        console.log(taskId)
        await axios.delete<boolean>(`${baseUrl}/api/tasks/${taskId}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
    }

    return (<>
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
                    {config.device?.title ?? "The title is loading.."}
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
            <div className="w-screen 
                h-screen">
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
