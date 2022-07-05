import React, { FunctionComponent, useState } from 'react'
import { setCookies, getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import MainLayout from '@/layouts/mains'
import FormContextProvider from '@/providers/formContextProvider'
import Input from '@/components/inputs'
import Button from '@/components/buttons'
import ITaskDevice from '@/models/iTaskDevice'
import { 
    useGetITaskDevicesQuery,
    useUpdateITaskDeviceMutation 
} from '@/slicers/apis/iTaskDeviceApi'

const Settings: FunctionComponent = () => {
    return (
        <MainLayout>
            <div className="fixed z-0 bg-gray-600 w-full h-full top-0 left-0">
            </div>
            <div className="fixed flex justify-center items-center flex-col z-10 p-4 bg-white rounded-lg h-5/6 w-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-1/2">
                    <UpdateTool />
                </div>
            </div>
        </MainLayout>
    )
}

const UpdateTool: FunctionComponent = () => {
    const router = useRouter()

    const { data: iTaskDevices } = useGetITaskDevicesQuery()
    const [updateITaskDevice, { error }] = useUpdateITaskDeviceMutation()

    const [title, setTitle] = useState<string | undefined>(`${getCookie('title')}`)

    const onSubmit = () => {
        if (title) {
            const iTaskDevice = {
                id: iTaskDevices?.entities.find(iTaskDevice => iTaskDevice.title === "1234")?.id,
                iTaskMenuId: {
                    isChanged: false
                },
                departmentId: {
                    isChanged: false
                },
                title: {
                    value: title,
                    isChanged: true
                },
                isPinCode: {
                    isChanged: false
                },
                pinCode: {
                    isChanged: false
                },
                lastConnection: {
                    isChanged: false
                }
            } as ITaskDevice
            updateITaskDevice(iTaskDevice)

            if(!error) {
                setCookies('title', title)
                router.push('/buttons')
            } 
        }
    }

    return (
        <FormContextProvider onSubmit={onSubmit}>
            <Input
                label="Device title"
                defaultValue={title}
                placeholder="Input Device title"
                errorMessage="Incorrect Device title"
                required
                minLength={1}
                maxLength={64}
                onChange={(value: string | undefined) => setTitle(value)} />
            <Button
                title="Update"
                type="submit"
                rounded />
        </FormContextProvider>
    )
}

export default Settings