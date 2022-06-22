import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import thunk from 'redux-thunk'
import { persistReducer } from 'redux-persist'
import storage from '@/utils/storage'
import iTaskDeviceApi from '@/slicers/apis/iTaskDeviceApi'
import iTaskMenuApi from '@/slicers/apis/iTaskMenuApi'
import iTaskMenuButtonApi from '@/slicers/apis/iTaskMenuButtonApi'
import configSlice from '@/slicers/configSlice'

const persistConfig = {
    key: 'root',
    storage
}

const reducers = combineReducers({
    config: configSlice,
    [iTaskDeviceApi.reducerPath]: iTaskDeviceApi.reducer,
    [iTaskMenuApi.reducerPath]: iTaskMenuApi.reducer,
    [iTaskMenuButtonApi.reducerPath]: iTaskMenuButtonApi.reducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    middleware: [
        thunk, 
        iTaskDeviceApi.middleware,
        iTaskMenuApi.middleware,
        iTaskMenuButtonApi.middleware
    ]
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
