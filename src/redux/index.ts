import { configureStore } from '@reduxjs/toolkit'
import loggedUserReducer from '@/features/auth/authSlice'
import isPreloadedReducer from '@/features/preloaded/preloadedSlice'

const store = configureStore({
    reducer: {
        loggedUser: loggedUserReducer,
        isPreloaded: isPreloadedReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
