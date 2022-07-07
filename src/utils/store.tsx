import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { persistReducer } from 'redux-persist'
import storage from '@/utils/storage'
import deviceApi from '@/slicers/apis/deviceApi'
import iTaskMenuApi from '@/slicers/apis/iTaskMenuApi'
import iTaskMenuButtonApi from '@/slicers/apis/iTaskMenuButtonApi'
import configSlice from '@/slicers/configSlice'

const persistConfig = {
    key: 'root',
    storage
}

const reducers = combineReducers({
    config: configSlice,
    [deviceApi.reducerPath]: deviceApi.reducer,
    [iTaskMenuApi.reducerPath]: iTaskMenuApi.reducer,
    [iTaskMenuButtonApi.reducerPath]: iTaskMenuButtonApi.reducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
        .concat(deviceApi.middleware)
        .concat(iTaskMenuApi.middleware)
        .concat(iTaskMenuButtonApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
