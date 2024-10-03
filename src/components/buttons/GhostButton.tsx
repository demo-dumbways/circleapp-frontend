import { Button } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { transparentHover } from '@/styles/style'

interface GhostButtonProps {
    children: ReactNode
    color?: string
    fontSize?: string
    onTop?: boolean
    onClick?: () => void
}

function GhostButton({ children, color, fontSize, onTop, onClick }: GhostButtonProps) {
    function onClickHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        if (onClick) {
            e.stopPropagation()
            e.preventDefault()

            onClick()
        }
    }

    return (
        <Button
            pos={'relative'}
            onClick={(e) => onClickHandler(e)}
            padding={0}
            height={'auto'}
            width={'auto'}
            variant={'ghost'}
            display={'flex'}
            alignItems={onTop ? 'start' : 'center'}
            justifyContent={'start'}
            minWidth={'none'}
            minHeight={'none'}
            color={color ? color : undefined}
            fontSize={fontSize ? fontSize : undefined}
            _hover={transparentHover}
        >
            {children}
        </Button>
    )
}

export default GhostButton
