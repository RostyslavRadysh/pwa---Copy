import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { FunctionComponent, 
    useState,
    useEffect } from 'react'
import { getCookie } from 'cookies-next'
import axios from 'axios'
import FormContextProvider from '@/providers/formContextProvider'
import Input from '@/components/inputs'
import Button from '@/components/buttons'
import { withAuth } from '@/utils/auth'
import type { GetDevicesResponse } from '@/models/getDevicesResponse'
import type { PutDeviceRequest } from '@/models/putDeviceRequest'

const Settings: FunctionComponent = () => {
    const router = useRouter()

    const [devices, setDevices] = useState<GetDevicesResponse>()

    const key = Number(getCookie('key'))
    const device = devices?.entities.find(device => device.id === key)

    const [title, setTitle] = useState<string | undefined>(device?.title)

    useEffect(() => {
        let timer = setTimeout(async () => {
            if ('wakeLock' in navigator) {
                await navigator.wakeLock.request('screen');
            }

            const baseUrl = `${getCookie('baseUrl')}`

            const { data: devices } = await axios.get<GetDevicesResponse>(`${baseUrl}/api/itaskdevices`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })
            
            setDevices(devices)
        }, 1000)
    
        return () => {
            clearTimeout(timer)
        }
    }, [])

    useEffect(() => {
        let timer = setInterval(async () => {
            const baseUrl = `${getCookie('baseUrl')}`

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
            } as PutDeviceRequest, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })

            const { data: devices } = await axios.get<GetDevicesResponse>(`${baseUrl}/api/itaskdevices`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })

            setDevices(devices)
        }, 10000)
    
        return () => {
            clearInterval(timer)
        }
    }, [])

    const updateDevice = async () => {
        const baseUrl = `${getCookie('baseUrl')}`

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
            lastConnection: {
                value: date,
                isChanged: true
            }
        } as PutDeviceRequest, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })

        const { data: devices } = await axios.get<GetDevicesResponse>(`${baseUrl}/api/itaskdevices`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })

        setDevices(devices)

        router.push('/')
    }

    return (
        <div className="bg-gray-200 w-screen h-screen flex justify-center items-center">
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                <FormContextProvider onSubmit={updateDevice}>
                    <Input
                        label="Device name"
                        defaultValue={title}
                        placeholder="Device name"
                        errorMessage="Incorrect Device name"
                        required
                        minLength={1}
                        maxLength={64}
                        onChange={(value: string | undefined) => setTitle(value)} />
                    <div className="flex space-x-2 justify-center">
                        <Button
                            title="Update"
                            type="submit" />
                    </div>
                </FormContextProvider>
            </div>
        </div>
    )
}

export default Settings

export const getServerSideProps: GetServerSideProps = withAuth
