import { useRouter } from 'next/router'
import React, { FunctionComponent, 
    useState } from 'react'
import { setCookie } from 'cookies-next'
import axios from 'axios'
import { useToast } from '@/providers/toastContextProvider'
import FormContextProvider from '@/providers/formContextProvider'
import Input from '@/components/inputs'
import Button from '@/components/buttons'
import { stripTrailingSlash } from '@/utils/helpers'
import type { CreateDeviceRequest } from '@/models/createDeviceRequest'

const Login: FunctionComponent = () => {
    const router = useRouter()
    const { toast } = useToast()

    const [webServiceUrl, setWebServiceUrl] = useState<string | undefined>(undefined)
    const [title, setTitle] = useState<string | undefined>(undefined)

    const createDevice = async () => {
        try {
            if (webServiceUrl && title) {
                const baseUrl = stripTrailingSlash(webServiceUrl)

                const { data: key } = await axios.post<number>(`${baseUrl}/api/itaskdevices`, { 
                    title: title
                } as CreateDeviceRequest, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    }
                })

                setCookie('baseUrl', baseUrl)
                setCookie('key', key)
                
                router.push('/')
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast(error.message)
            } else {
                console.log('Unexpected error: ', error)
            }
        }
    }

    return (
        <div className="bg-gray-200 w-screen h-screen flex justify-center items-center">
            <div className="block p-6 rounded-lg shadow-md bg-white max-w-sm">
                <FormContextProvider onSubmit={createDevice}>
                    <div className="space-y-4">
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
                    </div>
                </FormContextProvider>
            </div>
        </div>
    )
}

export default Login
