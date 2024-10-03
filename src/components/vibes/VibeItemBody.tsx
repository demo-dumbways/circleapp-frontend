import { CardBody, Text, Image } from '@chakra-ui/react'
import { fontSizing } from '@/styles/style'
import { useSearchParams } from 'react-router-dom'

import GhostButton from '@/components/buttons/GhostButton'

interface VibeItemBodyProps {
    vibeId: number
    vibeContent: string
    vibeImage: string | null
    onOpen: () => void
    noImage?: boolean
}

function VibeItemBody({ vibeContent, vibeId, vibeImage, noImage, onOpen }: VibeItemBodyProps) {
    const [, setSearchParams] = useSearchParams()

    function onImageClick(): void {
        setSearchParams({ vibeId: String(vibeId) })

        onOpen()
    }

    return (
        <CardBody padding={0}>
            <Text fontSize={fontSizing.small}>{vibeContent}</Text>
            {!noImage && vibeImage && (
                <GhostButton onClick={onImageClick}>
                    <Image
                        src={vibeImage}
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

export default VibeItemBody
