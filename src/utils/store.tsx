import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import thunk from 'redux-thunk'
import { persistReducer } from 'redux-persist'
import storage from '@/utils/storage'
import deviceApi from '@/slicers/apis/deviceApi'
import iTaskMenuApi from '@/slicers/apis/menuApi'
import iTaskMenuButtonApi from '@/slicers/apis/buttonApi'

const persistConfig = {
    key: 'root',
    storage
}

const reducers = combineReducers({
    [deviceApi.reducerPath]: deviceApi.reducer,
    [iTaskMenuApi.reducerPath]: iTaskMenuApi.reducer,
    [iTaskMenuButtonApi.reducerPath]: iTaskMenuButtonApi.reducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(deviceApi.middleware),
})

setupListeners(store.dispatch)

export default store
