import React, { FunctionComponent } from 'react'
import type { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

export interface ScreenSaverProps {
    isOpen: boolean
    text: string | undefined
    isText: boolean
    backgroundColor: string
    isImage: boolean
    imageUrl: string
    onClick: (value: boolean) => void
}

export const ScreenSaver: FunctionComponent<PropsWithChildren<ScreenSaverProps>> = ({ isOpen, text, isText, backgroundColor, isImage, imageUrl, onClick }: PropsWithChildren<ScreenSaverProps>) => {
    const hostmane = (new URL(imageUrl)).hostname
    return isOpen ? (
        <>
            {
                (createPortal(
                    <div className="fixed top-0 left-0 w-full h-full">
                        <div className="opacity-100 w-full h-full z-10 flex items-center justify-center"
                        style={{ backgroundImage: `url(${hostmane})`, 
                            backgroundRepeat: 'no-repeat', 
                            backgroundPosition: 'center',   
                            backgroundColor: backgroundColor }} 
                        onClick={() => onClick(!isOpen)}>
                            {!isImage && isText && (
                                <h5 className="text-gray-900 text-xl leading-tight font-medium">
                                    {text}
                                </h5>
                            )}
                        </div>
                    </div>,
                    document.body
                ))  
            }
        </>
    ) : null
}

export default ScreenSaver
