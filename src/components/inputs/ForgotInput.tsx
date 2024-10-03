import { Box, FormControl } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { ForgotDataType } from '@/types/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { ForgotSchema } from '@/validators/validator'

import SolidButton from '@/components/buttons/SolidButton'
import ValidatedInput from '@/components/inputs/ValidatedInput'

interface ForgotInputProps {
    onForgot: (data: ForgotDataType) => void
}

function ForgotInput(props: ForgotInputProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotDataType>({
        resolver: zodResolver(ForgotSchema),
    })

    return (
        <FormControl display={'flex'} flexDirection={'column'} gap={'.5rem'}>
            <ValidatedInput<ForgotDataType>
                autoFocus
                type={'email'}
                placeholder={'Email'}
                name={'email'}
                register={register}
                error={errors.email}
            />

            <Box mt={'.5rem'}>
                <SolidButton
                    text={'Send Instruction'}
                    onClick={handleSubmit((data) => {
                        props.onForgot(data)
                    })}
                />
            </Box>
        </FormControl>
    )
}

export default ForgotInput
