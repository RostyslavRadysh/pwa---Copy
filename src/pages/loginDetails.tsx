import { useRouter } from 'next/router'
import React, { FunctionComponent, 
    useState } from 'react'
import axios from 'axios'
import { useToast } from '@/providers/toastContextProvider'
import FormContextProvider from '@/providers/formContextProvider'
import Input from '@/components/inputs'
import Button from '@/components/buttons'
import ScreenLoading from '@/components/screenLoading'
import type { CreateDeviceRequest } from '@/models/createDeviceRequest'
import type { PostAuthenticationDeviceRequest } from '@/models/postAuthenticationDeviceRequest'
import type { PostAuthenticationResponse } from '@/models/postAuthenticationResponse'

const LoginDetails: FunctionComponent = () => {
    const router = useRouter()
    const { toast } = useToast()

    const [deviceName, setDeviceName] = useState<string | undefined>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onHandleCreateDeviceClick = async () => {
        try {
            if (deviceName) {            
                setIsLoading(true)

                const basePath = localStorage.getItem('basePath')
                const format = localStorage.getItem('format')
                const baseUrl = localStorage.getItem('baseUrl')
                const token = localStorage.getItem('token')

                var chars = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ'
                var passwordLength = 20
                var devicePassword = ''
                for (var i = 0; i <= passwordLength; i++) {
                    var randomNumber = Math.floor(Math.random() * chars.length)
                    devicePassword += chars.substring(randomNumber, randomNumber + 1)
                }

                const { data: deviceId } = await axios.post<number>(`${baseUrl}/api/itaskdevices`, { 
                    name: deviceName,
                    password: devicePassword
                } as CreateDeviceRequest, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })

                localStorage.setItem('deviceId', deviceId as unknown as string)

                const { data: jwt } = await axios.post<PostAuthenticationResponse>(`${baseUrl}/api/authentication/gettokenbyitaskdevice`, { 
                    id: deviceId,
                    password: devicePassword
                } as PostAuthenticationDeviceRequest, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    }
                })

                localStorage.setItem('token', jwt.token)

                setIsLoading(false)

                router.push(`${basePath}/${format ? 'index' : ''}${format}`)
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
        <>
            <ScreenLoading isLoading={isLoading} />
            <div className="bg-gray-200 w-screen h-screen flex justify-center items-center">
                <div className="block p-6 rounded-lg shadow-md bg-white max-w-sm">
                    <FormContextProvider onSubmit={onHandleCreateDeviceClick}>
                        <div className="space-y-4">
                            <Input
                                label="Device name"
                                placeholder="Device name"
                                errorMessage="Incorrect Device name"
                                required
                                minLength={1}
                                maxLength={64}
                                onChange={(value: string | undefined) => setDeviceName(value)} />
                            <div className="flex justify-center items-center">
                                <Button
                                    title="Create"
                                    type="submit" />
                            </div>
                        </div>
                    </FormContextProvider>
                </div>
            </div>
        </>
    )
}

export default LoginDetails
