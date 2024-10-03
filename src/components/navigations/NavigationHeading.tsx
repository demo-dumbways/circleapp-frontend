import { Box, Heading } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { fontSizing } from '@/styles/style'

import GhostButton from '@/components/buttons/GhostButton'

interface NavigationHeadingProps {
    icon?: ReactNode
    text: string
    disabled?: boolean
    sticky?: boolean
}

function NavigationHeading({ icon, text, disabled, sticky }: NavigationHeadingProps) {
    if (disabled) {
        return (
            <Box px={'1rem'} pt={'2rem'} pb={'1rem'}>
                <Heading fontSize={fontSizing.bigger}>{text}</Heading>
            </Box>
        )
    }

    if (sticky) {
        return (
            <Box
                px={'1rem'}
                pt={'2rem'}
                pb={'1rem'}
                pos={'sticky'}
                top={0}
                left={0}
                zIndex={'2'}
                bg={'circle.backdrop'}
                width={'100%'}
            >
                <GhostButton color="circle.font" fontSize={'2rem'}>
                    {icon}
                    <Heading fontSize={fontSizing.bigger}>{text}</Heading>
                </GhostButton>
            </Box>
        )
    }

    return (
        <Box px={'1rem'} pt={'2rem'} pb={'1rem'}>
            <GhostButton color="circle.font" fontSize={'2rem'}>
                {icon}
                <Heading fontSize={fontSizing.bigger}>{text}</Heading>
            </GhostButton>
        </Box>
    )
}

export default NavigationHeading
