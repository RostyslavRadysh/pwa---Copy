import React from 'react'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import type { AppProps } from 'next/app'
import ToastContextProvider from '@/providers/toastContextProvider'
import store from '@/utils/store'
import '@/styles/globals.css'

function WebApplication({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta name='viewport' content='width=device-width, initial-scale=1, viewport-fit=cover' />
                <meta name='mobile-web-app-capable' content='yes' />
                <meta name='apple-mobile-web-app-capable' content='yes' />
                <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
            </Head>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistStore(store)}>
                    <ToastContextProvider>
                        <Component {...pageProps} />
                    </ToastContextProvider>
                </PersistGate>
            </Provider>
        </>
    )
}

export default WebApplication