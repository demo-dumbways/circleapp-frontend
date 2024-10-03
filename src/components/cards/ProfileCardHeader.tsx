import { UseFormRegister, FieldValues, Path } from 'react-hook-form'
import { Image, Flex, CardHeader, Box, useDisclosure, Input } from '@chakra-ui/react'
import { BiImages } from 'react-icons/bi'
import { fontSizing } from '@/styles/style'
import { useState } from 'react'

import HollowButton from '@/components/buttons/HollowButton'
import BrandModal from '@/components/modals/BrandModal'
import EditProfileModal from '@/components/modals/EditProfileModal'

interface ProfileCardHeaderProps<T extends FieldValues> {
    buttonText?: string
    editable?: boolean
    avatar: string
    banner: string
    isUserProfile?: boolean
    avatarName?: Path<T>
    bannerName?: Path<T>
    register?: UseFormRegister<T>
}

function ProfileCardHeader<T extends FieldValues>(props: ProfileCardHeaderProps<T>) {
    const {
        buttonText,
        editable,
        avatar,
        banner,
        isUserProfile,
        avatarName,
        bannerName,
        register,
    } = props
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [avatarPreview, setAvatarPreview] = useState<string>('')
    const [bannerPreview, setBannerPreview] = useState<string>('')

    function onAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files

        if (files) {
            setAvatarPreview(URL.createObjectURL(files[0]))
        }
    }

    function onBannerChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files

        if (files) {
            setBannerPreview(URL.createObjectURL(files[0]))
        }
    }

    return (
        <CardHeader
            display={'flex'}
            flexDirection={'column'}
            padding={0}
            mt={'1rem'}
            gap={'.5rem'}
            pos={'relative'}
        >
            <Box pos={'relative'}>
                <Image
                    src={bannerPreview ? bannerPreview : banner}
                    objectFit={'cover'}
                    height={editable ? '200px' : '150px'}
                    width={'100%'}
                    borderRadius={'xl'}
                    mb={editable ? '3rem' : 0}
                />
                {editable && bannerName && register && (
                    <Flex
                        boxSize={'100%'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        pos={'absolute'}
                        left={'0'}
                        top={'0'}
                    >
                        <Input
                            pos={'absolute'}
                            type={'file'}
                            height={0}
                            width={0}
                            border={0}
                            id="atBanner"
                            variant={'hollow'}
                            {...register(bannerName)}
                            onChange={(e) => onBannerChange(e)}
                        />
                        <label htmlFor="atBanner">
                            <Box
                                bg={'circle.backdrop'}
                                opacity={'.8'}
                                padding={'1rem'}
                                borderRadius={'full'}
                                mt={'-3rem'}
                                _hover={{ opacity: '.7' }}
                            >
                                <BiImages fontSize={fontSizing.bigger} />
                            </Box>
                        </label>
                    </Flex>
                )}
            </Box>
            {isUserProfile && <Box boxSize={'40px'} />}
            {!editable && !isUserProfile && (
                <Box ml={'auto'} zIndex={1}>
                    <HollowButton onClick={onOpen} text={buttonText} />
                </Box>
            )}
            <Flex pos={'absolute'} left={'5%'} bottom={'0'}>
                <Image
                    src={avatarPreview ? avatarPreview : avatar}
                    objectFit={'cover'}
                    boxSize={'150px'}
                    borderRadius={'full'}
                    border={'4px'}
                    borderColor={'circle.darker'}
                />
            </Flex>
            {editable && avatarName && register && (
                <Flex
                    boxSize={'150px'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    pos={'absolute'}
                    left={'5%'}
                    bottom={'0'}
                >
                    <Input
                        pos={'absolute'}
                        type={'file'}
                        height={0}
                        width={0}
                        border={0}
                        id="atAvatar"
                        variant={'hollow'}
                        {...register(avatarName)}
                        onChange={(e) => onAvatarChange(e)}
                    />
                    <label htmlFor="atAvatar">
                        <Box
                            bg={'circle.backdrop'}
                            opacity={'.8'}
                            padding={'1rem'}
                            borderRadius={'full'}
                            _hover={{ opacity: '.7' }}
                        >
                            <BiImages fontSize={fontSizing.bigger} />
                        </Box>
                    </label>
                </Flex>
            )}
            <BrandModal isOpen={isOpen} onClose={onClose} size={'xl'}>
                <EditProfileModal avatar={avatar} banner={banner} onClose={onClose} />
            </BrandModal>
        </CardHeader>
    )
}

export default ProfileCardHeader
