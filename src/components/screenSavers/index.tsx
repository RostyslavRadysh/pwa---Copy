import React, { FunctionComponent } from 'react'
import type { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

export interface ScreenSaverProps {
    isOpen: boolean
    onClick: (value: boolean) => void
}

export const ScreenSaver: FunctionComponent<PropsWithChildren<ScreenSaverProps>> = ({ isOpen, onClick, children }: PropsWithChildren<ScreenSaverProps>) => isOpen ? (
    <>
        {createPortal(<div className="fixed 
                top-0 
                left-0 
                w-full 
                h-full 
                flex 
                items-center 
                justify-center">
            <div className="bg-white 
                    opacity-100 
                    w-full 
                    h-full 
                    z-10" onClick={() => onClick(!isOpen)} />
                <div className="bg-white
                        fixed 
                        w-1/2
                        h-2/6
                        z-20">
                    {children}
                </div>
            </div>,
            document.body
        )}
    </>
) : null

export default ScreenSaver
