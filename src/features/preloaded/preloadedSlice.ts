import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface isProloadedState {
    value: boolean
}

const initialState: isProloadedState = {
    value: true,
}

export const isPreloadedSlice = createSlice({
    name: 'isPreloaded',
    initialState,
    reducers: {
        setPreloaded: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload
        },
    },
})

export const { setPreloaded } = isPreloadedSlice.actions

export default isPreloadedSlice.reducer
