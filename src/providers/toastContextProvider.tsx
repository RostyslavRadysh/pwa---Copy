import React, {
    FunctionComponent,
    useState,
    useEffect,
    createContext,
    useContext
} from 'react'
import type { PropsWithChildren } from 'react'
import Portal from '@/components/portals'

type ToastContextType = {
    notify: (message: string) => void
}

const ToastContext = createContext<ToastContextType>({ notify: (message: string) => console.log(message) })

interface ToastContextProviderProps { }

const ToastContextProvider: FunctionComponent<PropsWithChildren<ToastContextProviderProps>> = ({ children }: PropsWithChildren<ToastContextProviderProps>) => {
    const [items, setData] = useState<string[]>([])
    useEffect(() => {
        if (items.length !== 0) {
            const timer = setTimeout(() => {
                items.pop()
                setData([...items])
            }, 3000)
            return () => clearTimeout(timer)
        }
        return
    }, [items])
    const notify = (message: string) => setData([...items, message])

    return (
        <ToastContext.Provider value={{ notify }}>
            <Portal selector="#main">
                <div className="fixed 
                z-40 
                top-4 
                right-4">
                    <div className="flex flex-col 
                    w-56 
                    space-y-2">
                        {items?.map((item, i) => (
                            <div
                                className="inline-block 
                                p-4
                                bg-blue-600 
                                text-white 
                                font-medium 
                                text-sm 
                                leading-tight 
                                rounded 
                                shadow-md"
                                key={i}>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </Portal>
            {children}
        </ToastContext.Provider>
    )
}

export const useToast = () => useContext(ToastContext)

export default ToastContextProvider