import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType } from '@/types/types'

interface AuthState {
    value?: UserType
}

const initialState: AuthState = {
    value: undefined,
}

export const loggedUserSlice = createSlice({
    name: 'loggedUser',
    initialState,
    reducers: {
        setLoggedUser: (state, action: PayloadAction<UserType>) => {
            state.value = action.payload
        },
        unsetLoggedUser: (state) => {
            state.value = undefined
        },
    },
})

export const { setLoggedUser, unsetLoggedUser } = loggedUserSlice.actions

export default loggedUserSlice.reducer
