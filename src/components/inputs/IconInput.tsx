import { iconInputHover } from '@/styles/style'
import { Box, Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react'
import { UseFormRegister, FieldValues, Path } from 'react-hook-form'
import { ReactNode } from 'react'

interface IconInputProps<T extends FieldValues> {
    icon: ReactNode
    type: string
    placeholder: string
    name: Path<T>
    register: UseFormRegister<T>
}

function IconInput<T extends FieldValues>(props: IconInputProps<T>) {
    const { icon, type, placeholder, name, register } = props

    return (
        <Box px={'1rem'}>
            <Stack spacing={4}>
                <InputGroup color={'circle-dark'}>
                    <InputLeftElement pointerEvents={'none'} color={'circle.dark'}>
                        <Box ml={'1rem'}>{icon}</Box>
                    </InputLeftElement>
                    <Input
                        autoFocus
                        type={type}
                        pl={'2.75rem'}
                        placeholder={placeholder}
                        border={'3px solid'}
                        borderColor={'circle.backdrop'}
                        borderRadius={'2xl'}
                        bg={'circle.darker'}
                        color={'circle.font'}
                        _active={iconInputHover}
                        _focus={iconInputHover}
                        _hover={iconInputHover}
                        _placeholder={{ color: 'circle.dark' }}
                        {...register(name)}
                    />
                </InputGroup>
            </Stack>
        </Box>
    )
}

export default IconInput
