import { useRouter } from 'next/router'
import React, { FunctionComponent, 
    useState, 
    useEffect
} from 'react'
import { setCookie } from 'cookies-next'
import axios from 'axios'
import { useToast } from '@/providers/toastContextProvider'
import FormContextProvider from '@/providers/formContextProvider'
import Input from '@/components/inputs'
import Button from '@/components/buttons'
import { stripTrailingSlash } from '@/utils/helpers'
import type { PostDeviceRequest } from '@/models/postDeviceRequest'

const Login: FunctionComponent = () => {
    const router = useRouter()
    const { notify } = useToast()

    const [webServiceUrl, setWebServiceUrl] = useState<string | undefined>(undefined)
    const [title, setTitle] = useState<string | undefined>(undefined)

    useEffect(() => {
        let timer = setTimeout(async () => {
            if ('wakeLock' in navigator) {
                await navigator.wakeLock.request('screen');
            }
        }, 1000)
    
        return () => {
            clearTimeout(timer)
        }
    }, [])

    const createDevice = async () => {
        try {
            if (webServiceUrl && title) {
                const baseUrl = stripTrailingSlash(webServiceUrl)

                const { data } = await axios.post<number>(`${baseUrl}/api/itaskdevices`, { 
                    title: title
                } as PostDeviceRequest, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    }
                })

                setCookie('baseUrl', baseUrl)
                setCookie('key', data)
                
                router.push('/')
            }
        } catch (error: unknown) {
            console.log(error)
            if (axios.isAxiosError(error)) {
              notify(error.message)
            } else {
              console.log('Unexpected error: ', error)
            }
        }
    }

    return (
        <div className="bg-gray-200 w-screen h-screen flex justify-center items-center">
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                <FormContextProvider onSubmit={createDevice}>
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
                    <div className="flex space-x-2 justify-center">
                        <Button
                            title="Connect"
                            type="submit" />
                    </div>
                </FormContextProvider>
            </div>
        </div>
    )
}

export default Login
