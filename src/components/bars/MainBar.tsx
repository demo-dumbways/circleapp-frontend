import { Box } from '@chakra-ui/react'

import { ReactNode } from 'react'

interface MainBarProps {
    children: ReactNode
}

function MainBar({ children }: MainBarProps) {
    return (
        <Box as={'section'} border={'1px'} borderColor={'circle.darker'} minHeight={'100vh'}>
            {children}
        </Box>
    )
}

export default MainBar
