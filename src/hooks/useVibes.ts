import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { VibeDataType, VibeType } from '@/types/types'

import API from '@/networks/api'
import useCircleToast from '@/hooks/useCircleToast'

interface useVibesParams {
    onClose?: () => void
}

function useVibes(
    params: useVibesParams = {}
): [VibeType[] | undefined, (data: VibeDataType) => Promise<void>, (targetId: number) => void] {
    const createToast = useCircleToast()
    const queryClient: QueryClient = useQueryClient()

    const { data: vibes } = useQuery<VibeType[]>({
        queryKey: ['vibes'],
        queryFn: API.GET_ALL_VIBES,
    })

    const postVibe = useMutation({
        mutationFn: POST_VIBE,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['vibes'] })
        },
    })

    const deleteVibe = useMutation({
        mutationFn: DELETE_VIBE,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['vibes'] })
        },
    })

    async function onPost(data: VibeDataType): Promise<void> {
        const badLabels = await API.DETECT_SENTIMENT(data.content)

        const formData: FormData = new FormData()

        formData.append('content', data.content)
        formData.append('image', data.image ? data.image[0] : null)
        formData.append('badLabels', JSON.stringify(badLabels))

        postVibe.mutate(formData)

        if (params.onClose) {
            params.onClose()
        }
    }

    function onDelete(targetId: number): void {
        deleteVibe.mutate(targetId)
    }

    async function POST_VIBE(data: FormData): Promise<string> {
        const postVIbe: Promise<string> = API.POST_VIBE(data)
        createToast(postVIbe, {
            title: 'Post Vibe',
            message: 'Vibe successfully posted!',
        })

        return postVIbe
    }

    async function DELETE_VIBE(targetId: number): Promise<VibeType> {
        const deleteVibe: Promise<VibeType> = API.DELETE_VIBE(targetId)
        createToast(deleteVibe, {
            title: 'Delete Vibe',
            message: 'Vibe successfully deleted!',
        })

        return deleteVibe
    }

    return [vibes, onPost, onDelete]
}

export { useVibes }
