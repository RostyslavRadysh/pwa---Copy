import { useRouter } from 'next/router'
import React, { FunctionComponent, 
    useState,
    useEffect } from 'react'
import axios from 'axios'
import { useToast } from '@/providers/toastContextProvider'
import FormContextProvider from '@/providers/formContextProvider'
import Input from '@/components/inputs'
import Button from '@/components/buttons'
import ScreenLoading from '@/components/screenLoading'
import type { GetDeviceResponse } from '@/models/getDeviceResponse'
import type { UpdateDeviceRequest } from '@/models/updateDeviceRequest'

const Settings: FunctionComponent = () => {
    const router = useRouter()
    const { toast } = useToast()

    const [deviceName, setDeviceName] = useState<string | undefined>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if(!router.isReady) return

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
    }, [router.isReady])

    const onHandleUpdateDeviceClick = async () => {
        try {
            setIsLoading(true)

            const basePath = localStorage.getItem('basePath')
            const format = localStorage.getItem('format')
            const baseUrl = localStorage.getItem('baseUrl')
            const token = localStorage.getItem('token')
            const deviceId = localStorage.getItem('deviceId')

            const { data: device } = await axios.get<GetDeviceResponse>(`${baseUrl}/api/itaskdevices/${deviceId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if(deviceName != device?.name) {
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
                        value: deviceName,
                        isChanged: true
                    },
                    isPinCode: {
                        value: device?.isPinCode,
                        isChanged: false
                    },
                    pinCode: {
                        value: device?.pinCode,
                        isChanged: false
                    },
                    isSettings: {
                        value: device?.isSettings,
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

                setIsLoading(false)
        
                router.push(`${basePath}/index${format}`)
            }

            setIsLoading(false)
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
                    case 409: {
                        toast('The device name already exists')
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
    }

    const onHandleCancelClick = async () => {
        const basePath = localStorage.getItem('basePath')
        const format = localStorage.getItem('format')

        router.push(`${basePath}/${format ? 'index' : ''}${format}`)
    }

    return (
        <>
            <ScreenLoading isLoading={isLoading} />
            <div className="bg-gray-200 w-screen h-screen flex justify-center items-center">
                <div className="block p-6 rounded-lg shadow-md bg-white max-w-sm">
                    <FormContextProvider onSubmit={onHandleUpdateDeviceClick}>
                        <div className="space-y-4">
                            <Input
                                label="Device name"
                                placeholder="Device name"
                                errorMessage="Incorrect Device name"
                                required
                                minLength={1}
                                maxLength={64}
                                onChange={(value: string | undefined) => setDeviceName(value)} />
                            <div className="flex justify-between items-center">
                                <Button
                                    title="Update"
                                    type="submit" />
                                <Button
                                    title="Cancel"
                                    color="purple"
                                    onClick={onHandleCancelClick} />
                            </div>
                        </div>
                    </FormContextProvider>
                </div>
            </div>
        </>
    )
}

export default Settings
