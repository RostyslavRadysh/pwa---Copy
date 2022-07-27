import React, { FunctionComponent,
    useState,
    useEffect,
    createContext,
    useContext
} from 'react'
import type { PropsWithChildren } from 'react'

type ToastContextType = {
    toast: (message: string) => void
}

const ToastContext = createContext<ToastContextType>({ toast: (message: string) => console.log(`ToastContext: ${message}`) })

interface ToastContextProviderProps { }

const ToastContextProvider: FunctionComponent<PropsWithChildren<ToastContextProviderProps>> = ({ children }: PropsWithChildren<ToastContextProviderProps>) => {
    const [messages, setMessages] = useState<string[]>([])
    useEffect(() => {
        if (messages.length !== 0) {
            const timer = setTimeout(() => {
                messages.pop()
                setMessages([...messages])
            }, 3000)
            return () => clearTimeout(timer)
        }
        return
    }, [messages])

    const toast = (message: string) => setMessages([...messages, message])

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <div className="absolute top-0 right-0 z-50">
                <div className="max-w-sm">
                    {messages?.map((message, index) => (
                        <div className="bg-blue-600 rounded shadow-md p-4 m-3" 
                            key={index}>
                            <p className="text-white font-medium text-sm leading-tight">
                                {message}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </ToastContext.Provider>
    )
}

export const useToast = () => useContext(ToastContext)

export default ToastContextProvider
