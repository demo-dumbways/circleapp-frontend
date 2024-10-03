import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { EditedUserType, EditUserDataType, UserType } from '@/types/types'
import { useDispatch } from 'react-redux'
import { setLoggedUser } from '@/features/auth/authSlice'

import API from '@/networks/api'
import useCircleToast from '@/hooks/useCircleToast'

interface useEditUserParams {
    onClose?: () => void
}

function useEditUser(params: useEditUserParams = {}): [(data: EditUserDataType) => void] {
    const createToast = useCircleToast()
    const dispatch = useDispatch()
    const queryClient: QueryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: EDIT_USER,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['editedUser'] })
            dispatchLatestUserData()
        },
    })

    function onEdit(data: EditUserDataType): void {
        const formData: FormData = new FormData()

        formData.append('name', data.name)
        formData.append('username', data.username)
        formData.append('bio', data.bio)
        formData.append('filterContent', JSON.stringify(data.filterContent))
        formData.append('avatar', data.avatar ? data.avatar[0] : null)
        formData.append('banner', data.banner ? data.banner[0] : null)

        mutation.mutate(formData)

        if (params.onClose) params.onClose()
    }

    async function EDIT_USER(data: FormData): Promise<EditedUserType> {
        const editUser: Promise<EditedUserType> = API.EDIT_USER(data)
        createToast(editUser, {
            title: 'Edit Profile',
            message: 'Profile successfully edited!',
        })

        return editUser
    }

    async function dispatchLatestUserData() {
        const loggedUser: UserType = await API.GET_LOGGED_USER()
        dispatch(setLoggedUser(loggedUser))
    }

    return [onEdit]
}

export { useEditUser }
