import { Flex, Box, Image } from '@chakra-ui/react'
import { BiExitFullscreen, BiSolidArrowFromLeft, BiSolidArrowFromRight } from 'react-icons/bi'
import { fontSizing } from '@/styles/style'
import { useState } from 'react'
import { useReplies } from '@/hooks/useReplies'
import { useSearchParams } from 'react-router-dom'

import BrandModal from '@/components/modals/BrandModal'
import GhostButton from '@/components/buttons/GhostButton'
import ThreadDetail from '@/components/threads/ThreadDetail'

interface ImageModalProps {
    onClose: () => void
    isOpen: boolean
    threadImage: string | null
}

function ImageModal({ isOpen, onClose, threadImage }: ImageModalProps) {
    const [searchParams, setSearchParams] = useSearchParams()

    const id: string | null = searchParams.get('threadId')
    const targetId: number = id ? +id : NaN

    const [thread, onReply] = useReplies(targetId)
    const [hideList, setHideList] = useState<boolean>(true)

    function onCloseModal(): void {
        setSearchParams({})

        onClose()
    }

    function onHideThread(): void {
        setHideList((oldState) => !oldState)
    }

    if (thread) {
        return (
            <BrandModal isOpen={isOpen} onClose={onClose} size={'full'}>
                <Flex height={'100vh'}>
                    <Flex
                        pos={'relative'}
                        padding={'1rem'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        flex={2}
                    >
                        <Image
                            src={threadImage ? threadImage : undefined}
                            width={'auto'}
                            height={'auto'}
                            maxWidth={'100%'}
                            maxHeight={'100%'}
                            objectFit={'cover'}
                        />
                        <Flex
                            pos={'absolute'}
                            left={0}
                            top={0}
                            padding={'1rem'}
                            width={'100%'}
                            justifyContent={'space-between'}
                        >
                            <GhostButton onClick={onCloseModal}>
                                <Box color={'circle.font'} fontSize={fontSizing.bigger}>
                                    <BiExitFullscreen />
                                </Box>
                            </GhostButton>
                            <GhostButton onClick={onHideThread}>
                                <Box color={'circle.font'} fontSize={fontSizing.bigger}>
                                    {hideList ? (
                                        <BiSolidArrowFromLeft />
                                    ) : (
                                        <BiSolidArrowFromRight />
                                    )}
                                </Box>
                            </GhostButton>
                        </Flex>
                    </Flex>
                    {hideList && (
                        <Box
                            py={'1rem'}
                            border={'1px'}
                            borderColor={'circle.darker'}
                            overflow={'scroll'}
                            flex={1}
                        >
                            <ThreadDetail thread={thread} onReply={onReply} noImage />
                        </Box>
                    )}
                </Flex>
            </BrandModal>
        )
    }
}

export default ImageModal
