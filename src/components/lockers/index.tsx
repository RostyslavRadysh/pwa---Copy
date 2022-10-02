import React, { FunctionComponent,
    useState,
    useEffect } from 'react'
import type { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

export interface LockerProps {
    isLocked: boolean,
}

export const Locker: FunctionComponent<PropsWithChildren<LockerProps>> = ({ children, isLocked }: PropsWithChildren<LockerProps>) => {
    const [isLocker, setIsLocker] = useState<boolean>(false)

    useEffect(() => {
        if(!isLocked) setIsLocker(false)
    }, [isLocked])

    return isLocked ? (
        <>
            {createPortal(<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                <div className={`bg-gray-900 ${isLocker ? 'opacity-50' : 'opacity-0'} w-full h-full z-40`} onClick={() => setIsLocker(true)} />
                    {isLocker && (
                        <div className="bg-white fixed w-1/2 h-2/6 rounded hadow-md z-50">
                            {children}
                        </div>
                    )}
                    
                </div>,
                document.body
            )}
        </>
    ) : null
}

export default Locker
