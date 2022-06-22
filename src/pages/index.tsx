import React, { FunctionComponent, useState } from 'react'
import { setCookies, removeCookies } from 'cookies-next'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid'
import MainLayout from '@/layouts/mains'
import FormContextProvider from '@/providers/formContextProvider'
import Input from '@/components/inputs'
import Button from '@/components/buttons'
import ITaskDevice from '@/models/iTaskDevice'
import { useAddITaskDeviceMutation } from '@/slicers/apis/iTaskDeviceApi'

const Index: FunctionComponent = () => {
    return (
        <MainLayout>
            <div className="fixed z-0 bg-gray-600 w-full h-full top-0 left-0">
            </div>
            <div className="fixed flex justify-center items-center flex-col z-10 p-4 bg-white rounded-lg h-5/6 w-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-1/2">
                    <CreateTool />
                </div>
            </div>
        </MainLayout>
    )
}

const CreateTool: FunctionComponent = () => {
    const router = useRouter()

    const [addITaskDevice, { error }] = useAddITaskDeviceMutation()

    const [webServiceUrl, setWebServiceUrl] = useState<string | undefined>(undefined)
    const [title, setTitle] = useState<string | undefined>(undefined)

    const onSubmit = () => {
        if (webServiceUrl && title) {
            setCookies('webServiceUrl', webServiceUrl)

            var key = uuidv4()
            const itaskdevice = {
                title: title,
                key: key
            } as ITaskDevice
            addITaskDevice(itaskdevice)

            if(!error) {
                setCookies('title', title)
                setCookies('key', key)
                router.push('/buttons')
            } 
            else {
                removeCookies('webServiceUrl')
            }
        }
    }

    return (
        <FormContextProvider onSubmit={onSubmit}>
            <Input
                label="Web Service"
                placeholder="Input Web Service"
                errorMessage="Incorrect Web Service"
                required
                minLength={1}
                maxLength={64}
                onChange={(value: string | undefined) => setWebServiceUrl(value)} />
            <Input
                label="Device title"
                placeholder="Input Device title"
                errorMessage="Incorrect Device title"
                required
                minLength={1}
                maxLength={64}
                onChange={(value: string | undefined) => setTitle(value)} />
            <Button
                title="Connect"
                type="submit"
                rounded />
        </FormContextProvider>
    )
}

export default Index