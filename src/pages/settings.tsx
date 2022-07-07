import React, { FunctionComponent, useState } from 'react'
import { setCookies, getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import FormContextProvider from '@/providers/formContextProvider'
import Input from '@/components/inputs'
import Button from '@/components/buttons'
import Device from '@/models/device'
import { 
    useGetDevicesQuery,
    useUpdateDeviceMutation 
} from '@/slicers/apis/deviceApi'

const Settings: FunctionComponent = () => {
    return (
        <div>
            <UpdateTool />
        </div>
    )
}

const UpdateTool: FunctionComponent = () => {
    const router = useRouter()

    const { data: iTaskDevices } = useGetDevicesQuery()
    const [updateDevice, { error }] = useUpdateDeviceMutation()

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
            } as Device
            updateDevice(iTaskDevice)

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
                type="submit" />
        </FormContextProvider>
    )
}

export default Settings