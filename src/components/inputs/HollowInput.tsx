import { fontSizing, hollowInputHover } from '@/styles/style'
import { Input } from '@chakra-ui/react'

interface HollowInputProps {
    type: string
    placeholder: string
    value?: string
}

function HollowInput({ type, placeholder, value }: HollowInputProps) {
    return (
        <Input
            type={type}
            variant={'flushed'}
            px={'1rem'}
            border={'1px'}
            borderColor={'circle.dark'}
            borderRadius={'lg'}
            placeholder={placeholder}
            value={value}
            fontSize={fontSizing.small}
            color={'circle.font'}
            _active={hollowInputHover}
            _focus={hollowInputHover}
            _hover={hollowInputHover}
            _placeholder={{ color: 'circle.dark' }}
        />
    )
}

export default HollowInput
