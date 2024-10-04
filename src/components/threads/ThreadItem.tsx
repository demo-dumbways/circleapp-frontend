import { Card, Flex, Avatar, Box, Divider, useDisclosure } from '@chakra-ui/react'
import { ThreadType } from '@/types/types'
import { threadHover } from '@/styles/style'

import ThreadItemHeader from '@/components/threads/ThreadItemHeader'
import ThreadItemBody from '@/components/threads/ThreadItemBody'
import ThreadItemFooter from '@/components/threads/ThreadItemFooter'
import ImageModal from '@/components/modals/ImageModal'
import { useNavigate } from 'react-router-dom'
import GhostButton from '@/components/buttons/GhostButton'

interface ThreadItemProps {
    thread: ThreadType
    noImage?: boolean
    repliesTarget?: boolean
    isReply?: boolean
}

function ThreadItem({ thread, noImage, repliesTarget, isReply }: ThreadItemProps) {
    const { id, content, image, createdAt, totalLikes, totalReplies, isLiked, badLabels, author } =
        thread

    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()

    function onAvatarClick() {
        if (author) {
            navigate(`/user/${author.id}`)
        }
    }

    if (author) {
        return (
            <Box>
                <Card
                    bg={'circle.backdrop'}
                    color={'circle.font'}
                    p={'1rem'}
                    _hover={!isReply ? threadHover : {}}
                >
                    <Flex gap={'1rem'}>
                        <GhostButton onClick={onAvatarClick} onTop>
                            <Avatar src={author.avatar} />
                        </GhostButton>
                        <Flex direction={'column'} width={'100%'}>
                            <ThreadItemHeader
                                threadId={id}
                                authorId={author.id}
                                name={author.name}
                                username={`@${author.username}`}
                                date={createdAt}
                                author={author}
                                isReply={isReply && isReply}
                                repliesTarget={repliesTarget && repliesTarget}
                            />
                            <ThreadItemBody
                                threadId={id}
                                threadContent={content}
                                threadImage={image}
                                noImage={noImage && noImage}
                                onOpen={onOpen}
                            />
                            <ThreadItemFooter
                                threadId={id}
                                totalLike={totalLikes}
                                totalReply={totalReplies}
                                isLiked={isLiked}
                                author={author}
                                isReply={isReply && isReply}
                                badLabels={badLabels}
                                repliesTarget={repliesTarget && repliesTarget}
                            />
                        </Flex>
                    </Flex>
                </Card>
                <Divider border={'1px'} borderColor={'circle.darker'} />
                {isOpen && <ImageModal isOpen={isOpen} onClose={onClose} threadImage={image} />}
            </Box>
        )
    }
}

export default ThreadItem
