import Head from 'next/head'
import React from 'react'
import type { AppProps } from 'next/app'
import ToastContextProvider from '@/providers/toastContextProvider'
import '@/styles/globals.css'

function WebApplication({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
            </Head>
            <ToastContextProvider>
                <Component {...pageProps} />
            </ToastContextProvider>
        </>
    )
}

export default WebApplication