import { useRouter } from 'next/router'
import React, { FunctionComponent, 
    useEffect, 
    useState } from 'react'
import axios from 'axios'
import { useToast } from '@/providers/toastContextProvider'
import FormContextProvider from '@/providers/formContextProvider'
import Input from '@/components/inputs'
import Button from '@/components/buttons'
import ScreenLoading from '@/components/screenLoading'
import type { PostAuthenticationUserRequest } from '@/models/postAuthenticationUserRequest'
import type { PostAuthenticationResponse } from '@/models/postAuthenticationResponse'
import { stripTrailingSlash } from '@/utils/helpers'

const LoginUser: FunctionComponent = () => {
    const router = useRouter()
    const { toast } = useToast()

    const { basePath, format } = router.query

    const [webServiceUrl, setWebServiceUrl] = useState<string | undefined>(undefined)
    const [userName, setUserName] = useState<string | undefined>(undefined)
    const [password, setPassword] = useState<string | undefined>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const basePath = localStorage.getItem('basePath')
        const format = localStorage.getItem('format')
        const baseUrl = localStorage.getItem('baseUrl')
        const token = localStorage.getItem('token')
        const deviceId = localStorage.getItem('deviceId')

        if(basePath && format && baseUrl && token && deviceId) {
            router.push(`${basePath}/${format ? 'index' : ''}${format}`)
        }
    }, [])

    const onHandleUserLoginClick = async () => {
        try {
            if (webServiceUrl && userName && password) {
                setIsLoading(true)

                const baseUrl = stripTrailingSlash(webServiceUrl)

                const { data: jwt, status } = await axios.post<PostAuthenticationResponse>(`${baseUrl}/api/authentication/gettokenbystafflogin`, { 
                    userName: userName,
                    password: password
                } as PostAuthenticationUserRequest, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    }
                })

                localStorage.setItem('basePath', basePath as string)
                localStorage.setItem('format', format as string)
                localStorage.setItem('baseUrl', baseUrl)
                localStorage.setItem('token', jwt.token)

                setIsLoading(false)

                if(status === 204) {
                    toast('User name or password is incorrect')
                }
                else {
                    router.push(`${basePath}/loginDetails${format}`)
                }
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                switch(error.response?.status) {
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

    return router.isReady ? (
        <>
            <ScreenLoading isLoading={isLoading} />
            <div className="bg-gray-200 w-screen h-screen flex justify-center items-center">
                <div className="block p-6 rounded-lg shadow-md bg-white max-w-sm">
                    <FormContextProvider onSubmit={onHandleUserLoginClick}>
                        <div className="space-y-4">
                            <Input
                                label="Web Service Url"
                                placeholder="Web Service Url"
                                errorMessage="Incorrect Web Service Url"
                                required
                                minLength={1}
                                maxLength={64}
                                isUrl
                                onChange={(value: string | undefined) => setWebServiceUrl(value)} />
                            <Input
                                label="User name"
                                placeholder="User name"
                                errorMessage="Incorrect User name"
                                required
                                minLength={1}
                                maxLength={64}
                                onChange={(value: string | undefined) => setUserName(value)} />
                            <Input
                                type='password'
                                label="Password"
                                placeholder="Password"
                                errorMessage="Incorrect Password"
                                required
                                minLength={1}
                                maxLength={64}
                                onChange={(value: string | undefined) => setPassword(value)} />
                            <div className="flex justify-center items-center">
                                <Button
                                    title="Connect"
                                    type="submit" />
                            </div>
                        </div>
                    </FormContextProvider>
                </div>
            </div>
        </>
    ) : (
        <>
        </>
    )
}

export default LoginUser
