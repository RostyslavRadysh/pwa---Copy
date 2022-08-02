import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ConfigState {
    mainTitle: string
}

const initialState: ConfigState = {
    mainTitle: ''
}

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setMainTitle(state, action: PayloadAction<string>) {
            state.mainTitle = action.payload
        }
    }
})

export const { setMainTitle } = configSlice.actions

export default configSlice.reducer
