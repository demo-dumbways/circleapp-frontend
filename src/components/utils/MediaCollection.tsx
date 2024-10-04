import { ThreadType } from '@/types/types'
import { Grid, Image, useDisclosure } from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom'

import GhostButton from '@/components/buttons/GhostButton'
import ImageModal from '@/components/modals/ImageModal'
import EmptyMessage from '@/components/utils/EmptyMessage'

interface MediaCollectionProps {
    threads: ThreadType[]
}

function MediaCollection({ threads }: MediaCollectionProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [, setSearchParams] = useSearchParams()

    function onImageClick(id: number): void {
        setSearchParams({ threadId: String(id) })

        onOpen()
    }

    if (threads.length) {
        return (
            <Grid
                templateColumns={'repeat(3, 1fr)'}
                templateRows={'repeat(1, 150px)'}
                autoRows={'150px'}
                gap={'.5rem'}
                padding={'1rem'}
            >
                {threads.map((thread) => {
                    if (thread.image) {
                        return (
                            <GhostButton onClick={() => onImageClick(thread.id)} key={thread.id}>
                                <Image
                                    src={thread.image}
                                    height={'100%'}
                                    width={'100%'}
                                    objectFit={'cover'}
                                />
                                {isOpen && (
                                    <ImageModal
                                        isOpen={isOpen}
                                        onClose={onClose}
                                        threadImage={thread.image}
                                    />
                                )}
                            </GhostButton>
                        )
                    }
                })}
            </Grid>
        )
    }

    return <EmptyMessage header={'No media has been posted at this moment.'} />
}

export default MediaCollection
