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
import type { GetDeviceResponse } from '@/models/getDeviceResponse'
import type { UpdateDeviceRequest } from '@/models/updateDeviceRequest'

const Settings: FunctionComponent = () => {
    const router = useRouter()

    const [title, setTitle] = useState<string>()

    const updateDevice = async () => {
        const key = Number(getCookie('key'))
        const baseUrl = `${getCookie('baseUrl')}`

        const { data: device } = await axios.get<GetDeviceResponse>(`${baseUrl}/api/itaskdevices/${key}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })

        if(title && title != device?.entity.title) {
            const date = (new Date()).toJSON()
            await axios.patch<number>(`${baseUrl}/api/itaskdevices`, {
                id: device?.entity.id,
                iTaskMenuId: {
                    value: device?.entity.iTaskMenuId,
                    isChanged: false
                },
                departmentId: {
                    value: device?.entity.departmentId,
                    isChanged: false
                },
                title: {
                    value: title,
                    isChanged: true
                },
                isPinCode: {
                    value: device?.entity.isPinCode,
                    isChanged: false
                },
                pinCode: {
                    value: device?.entity.pinCode,
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
    
            router.push('/')
        }
    }

    const onHandleCancelClick = () => {
        router.push('/')
    }

    return (
        <div className="bg-gray-200 w-screen h-screen flex justify-center items-center">
            <div className="block p-6 rounded-lg shadow-md bg-white max-w-sm">
                <FormContextProvider onSubmit={updateDevice}>
                    <div className="space-y-4">
                        <Input
                            label="Device name"
                            defaultValue={title}
                            placeholder="Device name"
                            errorMessage="Incorrect Device name"
                            required
                            minLength={1}
                            maxLength={64}
                            onChange={(value: string | undefined) => setTitle(value)} />
                        <div className="flex justify-between items-center">
                            <Button
                                title="Connect"
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
