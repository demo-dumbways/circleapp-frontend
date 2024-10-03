import { CardHeader, Menu, MenuButton, MenuItem, MenuList, Spacer, Text } from '@chakra-ui/react'
import { fontSizing } from '@/styles/style'
import { dateFormatter } from '@/utils/dateFormatter'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux'
import { UserType } from '@/types/types'
import { useVibes } from '@/hooks/useVibes'
import { useReplies } from '@/hooks/useReplies'
import { useNavigate } from 'react-router-dom'

import VibeItemButton from '@/components/vibes/VibeItemButton'
import GhostButton from '@/components/buttons/GhostButton'

interface VibeItemHeaderProps {
    name: string
    username: string
    date: string
    author: UserType
    vibeId: number
    isReply?: boolean
    repliesTarget?: boolean
    authorId: number
}

function VibeItemHeader({
    name,
    username,
    date,
    author,
    vibeId,
    isReply,
    repliesTarget,
    authorId,
}: VibeItemHeaderProps) {
    const loggedUser = useSelector((states: RootState) => states.loggedUser.value)

    const navigate = useNavigate()
    const [, , onDelete] = useVibes()
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
                        as={VibeItemButton}
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
                                    return onDelete(vibeId)
                                }
                                if (isReply) {
                                    return onDeleteReply(vibeId)
                                }
                                return onDelete(vibeId)
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

export default VibeItemHeader
