import { CardBody, Text, Image } from '@chakra-ui/react'
import { fontSizing } from '@/styles/style'
import { useSearchParams } from 'react-router-dom'

import GhostButton from '@/components/buttons/GhostButton'

interface ThreadItemBodyProps {
    threadId: number
    threadContent: string
    threadImage: string | null
    onOpen: () => void
    noImage?: boolean
}

function ThreadItemBody({ threadContent, threadId, threadImage, noImage, onOpen }: ThreadItemBodyProps) {
    const [, setSearchParams] = useSearchParams()

    function onImageClick(): void {
        setSearchParams({ threadId: String(threadId) })

        onOpen()
    }

    return (
        <CardBody padding={0}>
            <Text fontSize={fontSizing.small}>{threadContent}</Text>
            {!noImage && threadImage && (
                <GhostButton onClick={onImageClick}>
                    <Image
                        src={threadImage}
                        objectFit={'cover'}
                        maxWidth={'100%'}
                        width={'auto'}
                        height={'auto'}
                        borderRadius={'lg'}
                        mt={'.25rem'}
                    />
                </GhostButton>
            )}
        </CardBody>
    )
}

export default ThreadItemBody
