import { CardFooter, Center, Flex, Spacer, Tooltip } from '@chakra-ui/react'
import { BiSolidHeart, BiCommentDetail, BiSolidCircle } from 'react-icons/bi'
import { UserType } from '@/types/types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import API from '@/networks/api'
import ThreadItemButton from './ThreadItemButton'

interface ThreadItemFooterProps {
    threadId: number
    totalLike: number
    totalReply: number
    isLiked: boolean
    author: UserType
    isReply?: boolean
    repliesTarget?: boolean
    badLabels: string[]
}

function ThreadItemFooter({
    threadId,
    totalLike,
    totalReply,
    isLiked,
    badLabels,
}: ThreadItemFooterProps) {
    const [isThreadLiked, setThreadLiked] = useState<boolean>(isLiked)
    const [totalThreadLike, setTotalThreadLike] = useState<number>(totalLike)

    const navigate = useNavigate()

    // optimistic updates
    async function onToggleLike() {
        try {
            setThreadLiked((oldState) => !oldState)
            setTotalThreadLike((oldState) => {
                if (!isThreadLiked) {
                    return oldState + 1
                }

                return oldState - 1
            })

            await API.TOGGLE_LIKE(threadId)
        } catch (error) {
            setThreadLiked(isLiked)
            setTotalThreadLike(totalLike)
        }
    }

    return (
        <CardFooter padding={0} mt={'.5rem'}>
            {totalReply !== undefined && totalLike !== undefined && (
                <Flex gap={'1rem'}>
                    <ThreadItemButton
                        icon={<BiSolidHeart />}
                        value={totalThreadLike}
                        color={isThreadLiked ? 'circle.red' : 'circle.dark'}
                        hoverColor={isThreadLiked ? 'circle.dark' : 'circle.red'}
                        onClick={onToggleLike}
                    />
                    <ThreadItemButton
                        icon={<BiCommentDetail />}
                        value={totalReply}
                        color={'circle.dark'}
                        hoverColor={'circle.accent'}
                        onClick={() => navigate(`/thread/${threadId}`)}
                    />
                </Flex>
            )}
            <Spacer />
            <Flex alignItems={'center'}>
                {badLabels.length > 0 ? (
                    <Tooltip
                        label={badLabels.join(', ')}
                        fontSize={'sm'}
                        bg={'circle.error'}
                        placement={'top-end'}
                    >
                        <Center color={'circle.error'} boxSize={'24px'}>
                            <BiSolidCircle size={'.5rem'} />
                        </Center>
                    </Tooltip>
                ) : (
                    <Tooltip
                        label={'positive thread'}
                        fontSize={'sm'}
                        bg={'circle.green'}
                        placement={'top-end'}
                    >
                        <Center color={'circle.green'} boxSize={'24px'}>
                            <BiSolidCircle size={'.5rem'} />
                        </Center>
                    </Tooltip>
                )}
            </Flex>
        </CardFooter>
    )
}

export default ThreadItemFooter
