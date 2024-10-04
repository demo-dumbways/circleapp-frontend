import { Link } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import { ThreadType } from '@/types/types'

import ThreadItem from './ThreadItem'
import EmptyMessage from '@/components/utils/EmptyMessage'

interface ThreadListProps {
    threads: ThreadType[]
    noLink?: boolean
}

function ThreadList({ threads, noLink }: ThreadListProps) {
    if (threads.length) {
        return (
            <Box>
                {threads.map((thread) => {
                    if (noLink) {
                        return <ThreadItem thread={thread} key={thread.id} isReply />
                    }

                    return (
                        <Link to={`/thread/${thread.id}`} key={thread.id}>
                            <ThreadItem thread={thread} />
                        </Link>
                    )
                })}
            </Box>
        )
    }

    return <EmptyMessage header={'No thread has been posted at this moment.'} />
}

export default ThreadList
