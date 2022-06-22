import React, { FunctionComponent } from 'react'
import type { PropsWithChildren } from 'react'

interface MainLayoutProps { }

const MainLayout: FunctionComponent<PropsWithChildren<MainLayoutProps>> = ({ children }: PropsWithChildren<MainLayoutProps>) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default MainLayout