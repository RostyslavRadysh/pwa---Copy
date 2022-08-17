import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { FunctionComponent, 
    useState,
    useEffect } from 'react'
import { setCookie,
    deleteCookie } from 'cookies-next'
import axios from 'axios'
import { useToast } from '@/providers/toastContextProvider'
import FormContextProvider from '@/providers/formContextProvider'
import Input from '@/components/inputs'
import Button from '@/components/buttons'
import { withAuth } from '@/utils/auth'
import type { GetDeviceResponse } from '@/models/getDeviceResponse'
import type { UpdateDeviceRequest } from '@/models/updateDeviceRequest'

interface SettingsProps {
    baseUrl: string
    name: string
    id: string
}

const Settings: FunctionComponent<SettingsProps> = ({ baseUrl, name, id }) => {
    const router = useRouter()
    const { toast } = useToast()
console.log(baseUrl, name, id)
    const [title, setTitle] = useState<string>()

    useEffect(() => {
        let timer = setInterval(async () => {
            try {
                await axios.get<GetDeviceResponse>(`${baseUrl}/api/itaskdevices/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
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
        }, 60 * 1000)

        return () => {
            clearInterval(timer)
        }
    }, [])

    const onHandleUpdateDeviceClick = async () => {
        try {
            const { data: device } = await axios.get<GetDeviceResponse>(`${baseUrl}/api/itaskdevices/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })

            if(title && title != device?.title) {
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
                        value: title,
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
        
                setCookie('name', title)
                console.log(title)
                router.push('/')
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
        try {
            await axios.get<GetDeviceResponse>(`${baseUrl}/api/itaskdevices/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })

            router.push('/')
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
    }

    return (
        <div className="bg-gray-200 w-screen h-screen flex justify-center items-center">
            <div className="block p-6 rounded-lg shadow-md bg-white max-w-sm">
                <FormContextProvider onSubmit={onHandleUpdateDeviceClick}>
                    <div className="space-y-4">
                        <Input
                            label="Device name"
                            defaultValue={name}
                            placeholder="Device name"
                            errorMessage="Incorrect Device name"
                            required
                            minLength={1}
                            maxLength={64}
                            onChange={(value: string | undefined) => setTitle(value)} />
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

export const getServerSideProps: GetServerSideProps = withAuth
