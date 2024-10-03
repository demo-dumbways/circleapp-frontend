import { Avatar, Flex, Spacer, Box, Divider, Input, FormControl } from '@chakra-ui/react'
import { BiImageAdd } from 'react-icons/bi'
import { useForm } from 'react-hook-form'
import { VibeDataType } from '@/types/types'
import { VibeSchema } from '@/validators/validator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import ImagePreview from '@/components/utils/ImagePreview'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux'

import SolidButton from '@/components/buttons/SolidButton'
import VibeInput from '@/components/inputs/VibeInput'

interface NewVibeProps {
    onPost: (data: VibeDataType) => Promise<void> | void
    placeholder: string
    buttonText?: string
    imagePreviewId: string
}

function NewVibe(props: NewVibeProps) {
    const { placeholder, buttonText, imagePreviewId } = props
    const [imagePreview, setImagePreview] = useState<string>('')
    const loggedUser = useSelector((states: RootState) => states.loggedUser.value)

    const {
        register,
        handleSubmit,
        formState: { errors },
        resetField,
    } = useForm<VibeDataType>({
        resolver: zodResolver(VibeSchema),
    })

    function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files

        if (files?.length) {
            setImagePreview(URL.createObjectURL(files[0]))
        }
    }

    return (
        <Box>
            <Flex direction={'column'} justifyContent={'center'} gap={'1rem'}>
                <Flex alignItems={'start'} gap={'1rem'} mx={'1rem'} mt={'1rem'}>
                    <Avatar src={loggedUser?.avatar} />
                    <VibeInput
                        placeholder={placeholder}
                        name={'content'}
                        register={register}
                        error={errors.content}
                    />
                </Flex>
                <ImagePreview imagePreview={imagePreview} onClose={() => setImagePreview('')} />
                <Divider borderColor={'circle.darker'} />
                <Flex
                    alignItems={'center'}
                    gap={'1rem'}
                    color={'circle.accent'}
                    mb={'1rem'}
                    mr={'1rem'}
                >
                    <Spacer />
                    <FormControl display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
                        <Input
                            type={'file'}
                            height={0}
                            width={0}
                            border={0}
                            id={imagePreviewId}
                            variant={'hollow'}
                            placeholder={placeholder}
                            {...register('image')}
                            onChange={(e) => onImageChange(e)}
                        />
                        <label htmlFor={imagePreviewId}>
                            <BiImageAdd fontSize={'2rem'} />
                        </label>
                    </FormControl>
                    <Box width={'15%'}>
                        <SolidButton
                            text={buttonText ? buttonText : 'Post'}
                            onClick={handleSubmit(async (data) => {
                                await props.onPost(data)

                                resetField('content')
                                resetField('image')
                                setImagePreview('')
                            })}
                        />
                    </Box>
                </Flex>
            </Flex>
            <Divider border={'1px'} borderColor={'circle.darker'} />
        </Box>
    )
}

export default NewVibe
