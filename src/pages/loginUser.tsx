import { useRouter } from 'next/router'
import React, { FunctionComponent, 
    useState } from 'react'
import { setCookie } from 'cookies-next'
import axios from 'axios'
import { useToast } from '@/providers/toastContextProvider'
import FormContextProvider from '@/providers/formContextProvider'
import Input from '@/components/inputs'
import Button from '@/components/buttons'
import type { PostAuthenticationUserRequest } from '@/models/postAuthenticationUserRequest'
import type { PostAuthenticationResponse } from '@/models/postAuthenticationResponse'

const LoginUser: FunctionComponent = () => {
    const router = useRouter()
    const { toast } = useToast()

    const { basePath } = router.query

    const [userName, setUserName] = useState<string | undefined>(undefined)
    const [password, setPassword] = useState<string | undefined>(undefined)
    const [baseUrl, setBaseUrl] = useState<string | undefined>(undefined)

    const onHandleUserLoginClick = async () => {
        try {
            if (userName && password) {
                const { data: jwt, status } = await axios.post<PostAuthenticationResponse>(`${baseUrl}/api/authentication/gettokenbystafflogin`, { 
                    userName: userName,
                    password: password
                } as PostAuthenticationUserRequest, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    }
                })
                
                if(status === 204) {
                    toast('User name or password is incorrect')
                }
                else {
                    setCookie('baseUrl', baseUrl)
                    setCookie('basePath', basePath)
                    setCookie('token', jwt.token)

                    if(basePath) router.push(`${basePath}/loginDetails.html`)
                    else router.push('/loginDetails')
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

    return (
        <div className="bg-gray-200 w-screen h-screen flex justify-center items-center">
            <div className="block p-6 rounded-lg shadow-md bg-white max-w-sm">
                <FormContextProvider onSubmit={onHandleUserLoginClick}>
                    <div className="space-y-4">
                        <Input
                            label="Web Service"
                            placeholder="Web Service"
                            errorMessage="Incorrect Web Service"
                            required
                            minLength={1}
                            maxLength={64}
                            isUrl
                            onChange={(value: string | undefined) => setBaseUrl(value)} />
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
    )
}

export default LoginUser
