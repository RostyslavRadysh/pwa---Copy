import { useRouter } from 'next/router'
import React, { FunctionComponent, 
    useState } from 'react'
import { getCookie,
    setCookie,
    deleteCookie } from 'cookies-next'
import axios from 'axios'
import { useToast } from '@/providers/toastContextProvider'
import FormContextProvider from '@/providers/formContextProvider'
import Input from '@/components/inputs'
import Button from '@/components/buttons'
import type { CreateDeviceRequest } from '@/models/createDeviceRequest'
import type { PostAuthenticationDeviceRequest } from '@/models/postAuthenticationDeviceRequest'
import type { PostAuthenticationResponse } from '@/models/postAuthenticationResponse'

const LoginDetails: FunctionComponent = () => {
    const router = useRouter()
    const { toast } = useToast()

    const baseUrl = `${getCookie('baseUrl')}`
    const basePath = `${getCookie('basePath')}`
    const token = `${getCookie('token')}`

    const [name, setName] = useState<string | undefined>(undefined)

    const onHandleCreateDeviceClick = async () => {
        try {
            if (name) {            
                var chars = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ'
                var passwordLength = 20
                var password = ''
                for (var i = 0; i <= passwordLength; i++) {
                    var randomNumber = Math.floor(Math.random() * chars.length)
                    password += chars.substring(randomNumber, randomNumber + 1)
                }

                const { data: deviceId } = await axios.post<number>(`${baseUrl}/api/itaskdevices`, { 
                    name: name,
                    password: password
                } as CreateDeviceRequest, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })

                const { data: jwt } = await axios.post<PostAuthenticationResponse>(`${baseUrl}/api/authentication/gettokenbyitaskdevice`, { 
                    id: deviceId,
                    password: password
                } as PostAuthenticationDeviceRequest, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    }
                })

                setCookie('token', jwt.token)
                setCookie('deviceName', name)
                setCookie('deviceId', deviceId)
                
                if(basePath) router.push(`${basePath}/index.html`)
                else router.push('/')
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

                deleteCookie('baseUrl')
                deleteCookie('basePath')
                deleteCookie('token')

                if(basePath) router.push(`${basePath}/loginUser.html?basePath=${basePath}`)
                else router.push('/loginUser?basePath=')
            }
        }
    }

    return (
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
