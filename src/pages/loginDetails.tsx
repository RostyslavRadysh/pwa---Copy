import { useRouter } from 'next/router'
import React, { FunctionComponent, 
    useState } from 'react'
import { getCookie,
    setCookie } from 'cookies-next'
import axios from 'axios'
import { useToast } from '@/providers/toastContextProvider'
import FormContextProvider from '@/providers/formContextProvider'
import Input from '@/components/inputs'
import Button from '@/components/buttons'
import type { CreateDeviceRequest } from '@/models/createDeviceRequest'

const LoginDetails: FunctionComponent = () => {
    const router = useRouter()
    const { toast } = useToast()

    const baseUrl = `${getCookie('baseUrl')}`
    const token = `${getCookie('token')}`

    const [name, setName] = useState<string | undefined>(undefined)

    const createDevice = async () => {
        try {
            if (name) {
                const { data: deviceId } = await axios.post<number>(`${baseUrl}/api/itaskdevices`, { 
                    name: name
                } as CreateDeviceRequest, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })

                setCookie('deviceName', name)
                setCookie('deviceId', deviceId)
                
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

export default LoginDetails
