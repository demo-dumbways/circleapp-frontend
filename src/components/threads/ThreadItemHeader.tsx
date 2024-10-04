import { CardHeader, Menu, MenuButton, MenuItem, MenuList, Spacer, Text } from '@chakra-ui/react'
import { fontSizing } from '@/styles/style'
import { dateFormatter } from '@/utils/dateFormatter'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux'
import { UserType } from '@/types/types'
import { useThreads } from '@/hooks/useThreads'
import { useReplies } from '@/hooks/useReplies'
import { useNavigate } from 'react-router-dom'

import ThreadItemButton from '@/components/threads/ThreadItemButton'
import GhostButton from '@/components/buttons/GhostButton'

interface ThreadItemHeaderProps {
    name: string
    username: string
    date: string
    author: UserType
    threadId: number
    isReply?: boolean
    repliesTarget?: boolean
    authorId: number
}

function ThreadItemHeader({
    name,
    username,
    date,
    author,
    threadId,
    isReply,
    repliesTarget,
    authorId,
}: ThreadItemHeaderProps) {
    const loggedUser = useSelector((states: RootState) => states.loggedUser.value)

    const navigate = useNavigate()
    const [, , onDelete] = useThreads()
    const [, , onDeleteReply] = useReplies()

    function onProfileClick() {
        navigate(`/user/${authorId}`)
    }

    return (
        <CardHeader display={'flex'} gap={'.5rem'} alignItems={'center'} padding={0}>
            <GhostButton onClick={onProfileClick}>
                <Text
                    fontSize={fontSizing.small}
                    color={'circle.font'}
                    mr={'.5rem'}
                    fontWeight={'700'}
                >
                    {name}
                </Text>
                <Text fontSize={fontSizing.small} color={'circle.dark'}>
                    {username}
                </Text>
            </GhostButton>
            <Text fontSize={fontSizing.small} color={'circle.dark'}>
                &#8226; {dateFormatter(date)}
            </Text>
            <Spacer />
            {loggedUser && loggedUser.id === author.id && (
                <Menu>
                    <MenuButton
                        as={ThreadItemButton}
                        color={'circle.dark'}
                        icon={<BiDotsVerticalRounded fontSize={'1.5rem'} />}
                        hoverColor={'circle.accent'}
                        ml={'.5rem'}
                        atLeft
                    ></MenuButton>
                    <MenuList bg={'circle.darker'} border={0}>
                        <MenuItem
                            bg={'circle.darker'}
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                if (repliesTarget) {
                                    navigate('/')
                                    return onDelete(threadId)
                                }
                                if (isReply) {
                                    return onDeleteReply(threadId)
                                }
                                return onDelete(threadId)
                            }}
                        >
                            Delete
                        </MenuItem>
                    </MenuList>
                </Menu>
            )}
        </CardHeader>
    )
}

export default ThreadItemHeader
