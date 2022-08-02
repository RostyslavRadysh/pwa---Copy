import React, { FunctionComponent,
    useState } from 'react'
import type { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

export interface ModalProps {
    isOpen: boolean
}

export const Locker: FunctionComponent<PropsWithChildren<ModalProps>> = ({ children, isOpen }: PropsWithChildren<ModalProps>) => {
    const [isModal, setIsModal] = useState<boolean>(false)

    return isOpen ? (
        <>
            {createPortal(<div className="fixed 
                    top-0 
                    left-0 
                    w-full 
                    h-full 
                    flex 
                    items-center 
                    justify-center">
                <div className={`bg-gray-900 
                        ${isModal ? 'opacity-50' : 'opacity-0'}
                        w-full 
                        h-full 
                        z-40`} onClick={() => setIsModal(true)} />
                    {isModal && (
                        <div className="bg-white
                            fixed 
                            w-1/2
                            h-2/6
                            rounded
                            shadow-md
                            z-50">
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
