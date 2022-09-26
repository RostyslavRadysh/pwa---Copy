import React, { FunctionComponent } from 'react'
import type { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

export interface ModalProps {
    isOpen: boolean
    backgroundColor: string | undefined
    imageUrl: string | undefined
    onClick: (value: boolean) => void
}

export const Modal: FunctionComponent<PropsWithChildren<ModalProps>> = ({ children, isOpen, backgroundColor, imageUrl, onClick }: PropsWithChildren<ModalProps>) => isOpen ? (
    <>
        {createPortal(<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
            <div className={`${backgroundColor ? '' : 'bg-gray-300'} w-full h-full z-10`}
                style={{ backgroundImage: `url(${imageUrl})`, 
                    backgroundRepeat: 'no-repeat', 
                    backgroundPosition: 'center',   
                    backgroundColor: backgroundColor,
                    backgroundSize: 'contain' }}
                onClick={() => onClick(!isOpen)} />
                    {children}
            </div>,
            document.body
        )}
    </>
) : null

export default Modal
