import { setLoggedUser } from '@/features/auth/authSlice'
import { UserType } from '@/types/types'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import API from '@/networks/api'

function useFollows(isFollowed: boolean | undefined) {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [isUserFollowed, setUserFollowed] = useState<boolean | undefined>(isFollowed)

    const dispatch = useDispatch()

    async function onFollows(id: number) {
        try {
            setLoading(true)

            if (!isFollowed) {
                setUserFollowed(true)
                return await API.FOLLOW_USER(id)
            }

            setUserFollowed(false)
            return await API.UNFOLLOW_USER(id)
        } catch (error) {
            setUserFollowed(isFollowed)
        } finally {
            dispatchLatestUserData()
            setLoading(false)
        }
    }

    async function dispatchLatestUserData() {
        const loggedUser: UserType = await API.GET_LOGGED_USER()
        dispatch(setLoggedUser(loggedUser))
    }

    return [isLoading, isUserFollowed, onFollows]
}

export default useFollows
