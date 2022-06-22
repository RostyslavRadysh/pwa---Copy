import React from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import type { AppProps } from 'next/app'
import store from '@/utils/store'
import '@/styles/globals.css'

function WebApplication({ Component, pageProps }: AppProps) {
    return (<Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
            <Component {...pageProps} />
        </PersistGate>
    </Provider>)
}

export default WebApplication