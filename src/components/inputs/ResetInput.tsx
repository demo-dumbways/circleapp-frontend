import { Box, FormControl, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { ResetDataType } from '@/types/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResetSchema } from '@/validators/validator'

import SolidButton from '@/components/buttons/SolidButton'
import ValidatedInput from '@/components/inputs/ValidatedInput'

interface ResetInputProps {
    onReset: (data: ResetDataType) => void
}

function ResetInput(props: ResetInputProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetDataType>({
        resolver: zodResolver(ResetSchema),
    })

    return (
        <FormControl display={'flex'} flexDirection={'column'} gap={'.5rem'}>
            <ValidatedInput<ResetDataType>
                autoFocus
                type={'password'}
                placeholder={'New Password'}
                name={'newPassword'}
                register={register}
                error={errors.newPassword}
            />
            <ValidatedInput<ResetDataType>
                type={'password'}
                placeholder={'Confirm Password'}
                name={'confirmedPassword'}
                register={register}
                error={errors.confirmedPassword}
            />
            <Text mt={'.5rem'} color={'circle.error'}>
                {errors.general?.message}
            </Text>

            <Box mt={'.5rem'}>
                <SolidButton
                    text={'Send Instruction'}
                    onClick={handleSubmit((data) => {
                        props.onReset(data)
                    })}
                />
            </Box>
        </FormControl>
    )
}

export default ResetInput
