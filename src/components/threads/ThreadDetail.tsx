import { DetailedThreadType, UserType, ThreadDataType } from '@/types/types'
import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import API from '@/networks/api'
import ThreadList from '@/components/threads/ThreadList'
import ThreadItem from '@/components/threads/ThreadItem'
import NewThread from '@/components/threads/NewThread'
import EmptyMessage from '@/components/utils/EmptyMessage'
import CircleSpinner from '@/components/utils/CircleSpinner'

interface ThreadDetailProps {
    onReply: (data: ThreadDataType) => void
    thread: DetailedThreadType
    noImage?: boolean
}

function ThreadDetail({ thread, onReply, noImage }: ThreadDetailProps) {
    const { replies, ...rest } = thread

    const [users, setUsers] = useState<UserType[]>([])

    useEffect(() => {
        async function getUsers() {
            const users: UserType[] = await API.GET_ALL_USERS()
            setUsers(users)
        }

        getUsers()
    }, [])

    const repliesWithAuthor = replies.map((reply) => {
        return {
            ...reply,
            author: users.find((user) => user.id === reply.authorId),
        }
    })

    if (!replies.length)
        return (
            <Box>
                <ThreadItem thread={rest} noImage={noImage && noImage} repliesTarget />
                <NewThread
                    placeholder={'Post your reply'}
                    onPost={onReply}
                    imagePreviewId={'atDetail'}
                    buttonText={'Reply'}
                />
                <EmptyMessage
                    header={'No replies to this thread so far.'}
                    body={'Share your thoughts first!'}
                />
            </Box>
        )

    return (
        <Box>
            <ThreadItem thread={rest} noImage={noImage && noImage} isReply />
            <NewThread
                placeholder={'Post your reply'}
                onPost={onReply}
                imagePreviewId={'atDetail'}
                buttonText={'Reply'}
            />
            {users.length ? (
                <ThreadList threads={repliesWithAuthor} noLink />
            ) : (
                <Box pt={'3rem'}>
                    <CircleSpinner />
                </Box>
            )}
        </Box>
    )
}

export default ThreadDetail
