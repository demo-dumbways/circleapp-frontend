import { Box, FormControl } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { RegisterDataType } from '@/types/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema } from '@/validators/validator'

import SolidButton from '@/components/buttons/SolidButton'
import ValidatedInput from '@/components/inputs/ValidatedInput'

interface RegisterInputProps {
    onRegister: (data: RegisterDataType) => void
}

function RegisterInput(props: RegisterInputProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterDataType>({
        resolver: zodResolver(RegisterSchema),
    })

    return (
        <FormControl display={'flex'} flexDirection={'column'} gap={'.5rem'}>
            <ValidatedInput<RegisterDataType>
                autoFocus
                type={'text'}
                placeholder={'Username'}
                name={'username'}
                register={register}
                error={errors.username}
            />
            <ValidatedInput<RegisterDataType>
                type={'text'}
                placeholder={'Name'}
                name={'name'}
                register={register}
                error={errors.name}
            />
            <ValidatedInput<RegisterDataType>
                type={'email'}
                placeholder={'Email'}
                name={'email'}
                register={register}
                error={errors.email}
            />
            <ValidatedInput<RegisterDataType>
                type={'password'}
                placeholder={'Password'}
                name={'password'}
                register={register}
                error={errors.password}
            />

            <Box mt={'.5rem'}>
                <SolidButton
                    text={'Create'}
                    onClick={handleSubmit((data) => {
                        props.onRegister(data)
                    })}
                />
            </Box>
        </FormControl>
    )
}

export default RegisterInput
