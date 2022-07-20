import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { persistReducer } from 'redux-persist'
import storage from '@/utils/storage'
import configSlice from '@/slicers/configSlice'

const persistConfig = {
    key: 'root',
    storage
}

const reducers = combineReducers({
    config: configSlice
})

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
