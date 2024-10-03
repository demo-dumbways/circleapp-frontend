import GhostButton from '@/components/buttons/GhostButton'
import { Box, Collapse, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { FieldError, UseFormRegister, FieldValues, Path } from 'react-hook-form'

interface ValidatedInputProps<T extends FieldValues> {
    autoFocus?: boolean
    type: string
    placeholder: string
    name: Path<T>
    register: UseFormRegister<T>
    error: FieldError | undefined
}

function ValidatedInput<T extends FieldValues>(props: ValidatedInputProps<T>) {
    const { type, placeholder, name, error, register } = props
    const isCollapsed = error ? true : false

    const [showPassword, setShowPassword] = useState(false)
    const togglePassword = () => setShowPassword(!showPassword)

    return (
        <Box>
            <InputGroup>
                <Input
                    autoFocus={props.autoFocus && true}
                    id={name}
                    type={type !== 'password' ? type : showPassword ? 'text' : type}
                    variant={'hollow'}
                    placeholder={placeholder}
                    {...register(name)}
                />
                {type === 'password' && (
                    <InputRightElement width="4.5rem">
                        <GhostButton color={'circle.dark'} onClick={togglePassword}>
                            {showPassword ? 'Hide' : 'Show'}
                        </GhostButton>
                    </InputRightElement>
                )}
            </InputGroup>

            <Collapse in={isCollapsed} transition={{ enter: { duration: 0.5 } }}>
                <Text mt={'.5rem'} color={'circle.error'}>
                    {error && error.message}
                </Text>
            </Collapse>
        </Box>
    )
}

export default ValidatedInput
