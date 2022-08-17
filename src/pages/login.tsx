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

    const [baseUrl, setBaseUrl] = useState<string | undefined>(undefined)
    const [name, setName] = useState<string | undefined>(undefined)

    const createDevice = async () => {
        try {
            if (baseUrl && name) {
                const { data: id } = await axios.post<number>(`${baseUrl}/api/itaskdevices`, { 
                    name: name
                } as CreateDeviceRequest, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    }
                })

                setCookie('baseUrl', baseUrl)
                setCookie('name', name)
                setCookie('id', id)
                
                router.push('/')
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                switch(error.response?.status) {
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
                            onChange={(value: string | undefined) => setBaseUrl(value ? stripTrailingSlash(value).toLowerCase() : undefined)} />
                        <Input
                            label="Device name"
                            placeholder="Device name"
                            errorMessage="Incorrect Device name"
                            required
                            minLength={1}
                            maxLength={64}
                            onChange={(value: string | undefined) => setName(value)} />
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
