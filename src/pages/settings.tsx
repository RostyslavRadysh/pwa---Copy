import { useRouter } from 'next/router'
import React, { FunctionComponent, 
    useState,
    useEffect } from 'react'
import { setCookie,
    getCookie,
    deleteCookie } from 'cookies-next'
import axios from 'axios'
import { useToast } from '@/providers/toastContextProvider'
import FormContextProvider from '@/providers/formContextProvider'
import Input from '@/components/inputs'
import Button from '@/components/buttons'
import type { GetDeviceResponse } from '@/models/getDeviceResponse'
import type { UpdateDeviceRequest } from '@/models/updateDeviceRequest'

const Settings: FunctionComponent = () => {
    const router = useRouter()
    const { toast } = useToast()

    const baseUrl = `${getCookie('baseUrl')}`
    const token = `${getCookie('token')}`
    const deviceName = `${getCookie('deviceName')}`
    const deviceId = `${getCookie('deviceId')}`

    const [name, setName] = useState<string | undefined>(undefined)

    useEffect(() => {
        let timer = setInterval(async () => {
            try {
                await axios.get<GetDeviceResponse>(`${baseUrl}/api/itaskdevices/${deviceId}`, {
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
                            deleteCookie('baseUrl')
                            deleteCookie('token')
                            deleteCookie('deviceName')
                            deleteCookie('deviceId')
                            deleteCookie('userName')
                            deleteCookie('password')
                            
                            router.push(`/loginUser/baseUrl=${baseUrl}`)
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
            clearInterval(timer)
        }
    }, [])

    const onHandleUpdateDeviceClick = async () => {
        try {
            const { data: device } = await axios.get<GetDeviceResponse>(`${baseUrl}/api/itaskdevices/${deviceId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if(name && name != device?.name) {
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
                        value: name,
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
        
                setCookie('deviceName', name)

                router.push('/')
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                switch(error.response?.status) {
                    case 404: {
                        deleteCookie('baseUrl')
                        deleteCookie('token')
                        deleteCookie('deviceName')
                        deleteCookie('deviceId')
                        deleteCookie('userName')
                        deleteCookie('password')

                        router.push(`/loginUser/baseUrl=${baseUrl}`)
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
        router.push('/')
    }

    return (
        <div className="bg-gray-200 w-screen h-screen flex justify-center items-center">
            <div className="block p-6 rounded-lg shadow-md bg-white max-w-sm">
                <FormContextProvider onSubmit={onHandleUpdateDeviceClick}>
                    <div className="space-y-4">
                        <Input
                            label="Device name"
                            defaultValue={deviceName}
                            placeholder="Device name"
                            errorMessage="Incorrect Device name"
                            required
                            minLength={1}
                            maxLength={64}
                            onChange={(value: string | undefined) => setName(value)} />
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
    )
}

export default Settings
