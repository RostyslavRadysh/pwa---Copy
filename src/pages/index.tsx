import React, { FunctionComponent, useState } from 'react'
import { useRouter } from 'next/router'
import { setCookies, removeCookies } from 'cookies-next'
import { connector } from '@/utils/propsRedux'
import { useToast } from '@/providers/toastContextProvider'
import FormContextProvider from '@/providers/formContextProvider'
import Input from '@/components/inputs'
import Button from '@/components/buttons'
import { useAddITaskDeviceMutation } from '@/slicers/apis/iTaskDeviceApi'

const Index: FunctionComponent = () => {
    const { notify } = useToast()
    const router = useRouter()

    const [addITaskDevice] = useAddITaskDeviceMutation()

    const [webServiceUrl, setWebServiceUrl] = useState<string | undefined>(undefined)
    const [title, setTitle] = useState<string | undefined>(undefined)

    const onHandleCreateDevice = async () => {
        if (webServiceUrl && title) {
            setCookies('webServiceUrl', webServiceUrl)
            setCookies('title', title)

            const result = await addITaskDevice({
                title: title
            })

            if ('error' in result) {
                removeCookies('webServiceUrl')
                removeCookies('title')
                notify('Something bad happened')
            } else {
                router.push('/buttons')
            }
        }
    }

    return (
        <div className="bg-gray-200 w-screen h-screen flex justify-center items-center">
            <div className="w-full max-w-xs">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <FormContextProvider onSubmit={onHandleCreateDevice}>
                        <Input
                            label="Web Service"
                            placeholder="Web Service"
                            errorMessage="Incorrect Web Service"
                            required
                            minLength={1}
                            maxLength={64}
                            isUrl
                            onChange={(value: string | undefined) => setWebServiceUrl(value)} />
                        <Input
                            label="Device name"
                            placeholder="Device name"
                            errorMessage="Incorrect Device name"
                            required
                            minLength={1}
                            maxLength={64}
                            onChange={(value: string | undefined) => setTitle(value)} />
                        <div className="flex justify-center items-center">
                            <Button
                                title="Connect"
                                type="submit" />
                        </div>
                    </FormContextProvider>
                </div>
                <p className="text-center text-gray-500 text-xs">
                    Copyright &copy; 2001-2022 dir/Active. All rights reserved.
                </p>
            </div>
        </div>
    )
}

export default connector(Index)
