import { fontSizing } from '@/styles/style'
import { Flex, Text } from '@chakra-ui/react'

interface EmptyMessageProps {
    header?: string
    body?: string
}

function EmptyMessage({ header, body }: EmptyMessageProps) {
    return (
        <Flex direction={'column'} alignItems={'center'} mt={'3rem'} width={'100%'}>
            {header && (
                <Text fontSize={fontSizing.big} fontWeight={'600'} color={'circle.dark'}>
                    {header}
                </Text>
            )}
            {body && (
                <Text fontSize={fontSizing.normal} color={'circle.dark'}>
                    {body}
                </Text>
            )}
        </Flex>
    )
}

export default EmptyMessage
