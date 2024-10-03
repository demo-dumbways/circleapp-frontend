import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux'
import { setPreloaded } from '@/features/preloaded/preloadedSlice'
import { UserType } from '@/types/types'
import { setLoggedUser, unsetLoggedUser } from '@/features/auth/authSlice'

import './assets/base.css'
import API from '@/networks/api'
import CircleLayout from './layouts/CircleLayout'
import HomePage from './pages/HomePage'
import VibeDetailPage from './pages/VibeDetailPage'
import MePage from './pages/MePage'
import SearchPage from '@/pages/SearchPage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import ForgotPasswordPage from '@/pages/ForgotPasswordPage'
import ResetPasswordPage from '@/pages/ResetPasswordPage'
import FollowsPage from '@/pages/FollowsPage'
import SplashScreen from '@/components/utils/SplashScreen'
import CircleAlert from '@/components/utils/CircleAlert'
import ProfilePage from '@/pages/ProfilePage'

function App() {
    const isPreloaded = useSelector((states: RootState) => states.isPreloaded.value)
    const loggedUser = useSelector((states: RootState) => states.loggedUser.value)

    const { pathname } = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
    }, [pathname])

    useEffect(() => {
        async function isUserLogged() {
            try {
                const loggedUser: UserType = await API.GET_LOGGED_USER()

                dispatch(setLoggedUser(loggedUser))
            } catch (error) {
                dispatch(unsetLoggedUser())
            } finally {
                // might be deleted later XD
                setTimeout(() => {
                    dispatch(setPreloaded(false))
                }, 2000)
            }
        }

        isUserLogged()
    }, [dispatch])

    if (window.innerWidth < 1280) {
        return (
            <div className="app">
                <CircleAlert />
            </div>
        )
    }

    if (isPreloaded) {
        return (
            <div className="app">
                <SplashScreen />
            </div>
        )
    }

    if (!loggedUser) {
        return (
            <div className="app">
                <Routes>
                    <Route path="/*" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/help/forgot" element={<ForgotPasswordPage />} />
                    <Route path="/help/reset/:token" element={<ResetPasswordPage />} />
                </Routes>
            </div>
        )
    }

    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<CircleLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/vibe/:id" element={<VibeDetailPage />} />
                    <Route path="/user/:id" element={<ProfilePage />} />
                    <Route path="/me" element={<MePage />} />
                    <Route path="/follows" element={<FollowsPage />} />
                    <Route path="/search" element={<SearchPage />} />
                </Route>
                <Route path="*" element={<CircleAlert code={404} />} />
                <Route element={<CircleAlert code={404} />} />
            </Routes>
        </div>
    )
}

export default App
