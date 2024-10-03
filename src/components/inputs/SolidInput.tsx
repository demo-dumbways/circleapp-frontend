import { UseFormRegister, FieldError, FieldValues, Path } from 'react-hook-form'
import { fontSizing, solidInputHover } from '@/styles/style'
import { Box, Collapse, Input, Text } from '@chakra-ui/react'

interface SolidInputProps<T extends FieldValues> {
    type: string
    placeholder: string
    value?: string
    name: Path<T>
    register: UseFormRegister<T>
    error: FieldError | undefined
}

function SolidInput<T extends FieldValues>(props: SolidInputProps<T>) {
    const { type, placeholder, value, name, error, register } = props
    const isCollapsed = error ? true : false

    return (
        <Box>
            <Input
                type={type}
                variant={'filled'}
                px={'1rem'}
                bg={'circle.darker'}
                borderRadius={'lg'}
                placeholder={placeholder}
                value={value}
                fontSize={fontSizing.small}
                color={'circle.font'}
                _active={solidInputHover}
                _focus={solidInputHover}
                _hover={solidInputHover}
                _placeholder={{ color: 'circle.dark' }}
                {...register(name)}
            />
            <Collapse in={isCollapsed} transition={{ enter: { duration: 0.5 } }}>
                <Text mt={'.5rem'} color={'circle.error'}>
                    {error && error.message}
                </Text>
            </Collapse>
        </Box>
    )
}

export default SolidInput
