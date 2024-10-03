import { Text, Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { fontSizing } from '@/styles/style'

import GhostButton from '@/components/buttons/GhostButton'

interface NavigationItemProps {
    onLogout?: () => void
    icon: ReactNode
    text: string
}

function NavigationItem({ icon, text, onLogout }: NavigationItemProps) {
    return (
        <GhostButton onClick={onLogout}>
            <Flex
                gap={'1rem'}
                alignItems={'center'}
                fontSize={fontSizing.bigger}
                color={'circle.font'}
            >
                {icon}
                <Text
                    as={'h1'}
                    fontSize={fontSizing.big}
                    fontWeight={'600'}
                    display={'flex'}
                    alignItems={'center'}
                    gap={'1rem'}
                    color={'circle.font'}
                >
                    {text}
                </Text>
            </Flex>
        </GhostButton>
    )
}

export default NavigationItem
