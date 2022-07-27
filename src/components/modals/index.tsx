import React, { FunctionComponent } from 'react'
import type { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

export interface ModalProps {
    isOpen: boolean
    onClick: (value: boolean) => void
}

export const Modal: FunctionComponent<PropsWithChildren<ModalProps>> = ({ children, isOpen, onClick }: PropsWithChildren<ModalProps>) => isOpen ? (
    <>
        {createPortal(<div className="fixed 
                top-0 
                left-0 
                w-full 
                h-full 
                flex 
                items-center 
                justify-center">
            <div className="bg-gray-900 
                    opacity-50 
                    w-full 
                    h-full 
                    z-40" onClick={() => onClick(!isOpen)} />
                <div className=" bg-white
                        fixed 
                        w-1/2
                        h-2/6
                        rounded
                        shadow-md
                        z-50">
                    {children}
                </div>
            </div>,
            document.body
        )}
    </>
) : null

export default Modal
