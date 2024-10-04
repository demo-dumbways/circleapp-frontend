import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ThreadDataType, ThreadType } from '@/types/types'

import API from '@/networks/api'
import useCircleToast from '@/hooks/useCircleToast'

interface useThreadsParams {
    onClose?: () => void
}

function useThreads(
    params: useThreadsParams = {}
): [ThreadType[] | undefined, (data: ThreadDataType) => Promise<void>, (targetId: number) => void] {
    const createToast = useCircleToast()
    const queryClient: QueryClient = useQueryClient()

    const { data: threads } = useQuery<ThreadType[]>({
        queryKey: ['threads'],
        queryFn: API.GET_ALL_VIBES,
    })

    const postThread = useMutation({
        mutationFn: POST_VIBE,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['threads'] })
        },
    })

    const deleteThread = useMutation({
        mutationFn: DELETE_VIBE,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['threads'] })
        },
    })

    async function onPost(data: ThreadDataType): Promise<void> {
        const badLabels = await API.DETECT_SENTIMENT(data.content)

        const formData: FormData = new FormData()

        formData.append('content', data.content)
        formData.append('image', data.image ? data.image[0] : null)
        formData.append('badLabels', JSON.stringify(badLabels))

        postThread.mutate(formData)

        if (params.onClose) {
            params.onClose()
        }
    }

    function onDelete(targetId: number): void {
        deleteThread.mutate(targetId)
    }

    async function POST_VIBE(data: FormData): Promise<string> {
        const postVIbe: Promise<string> = API.POST_VIBE(data)
        createToast(postVIbe, {
            title: 'Post Thread',
            message: 'Thread successfully posted!',
        })

        return postVIbe
    }

    async function DELETE_VIBE(targetId: number): Promise<ThreadType> {
        const deleteThread: Promise<ThreadType> = API.DELETE_VIBE(targetId)
        createToast(deleteThread, {
            title: 'Delete Thread',
            message: 'Thread successfully deleted!',
        })

        return deleteThread
    }

    return [threads, onPost, onDelete]
}

export { useThreads }
