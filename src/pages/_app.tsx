import Head from 'next/head'
import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import ToastContextProvider from '@/providers/toastContextProvider'
import '@/styles/globals.css'

function WebApplication({ Component, pageProps }: AppProps) {
    useEffect(() => {
        const requestWakeLock = async () => {
            try {
                await navigator.wakeLock.request('screen')
            } catch (error: unknown) {
                console.log('Unexpected error: ', error)
            }
        }
        requestWakeLock()
    }, [])

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