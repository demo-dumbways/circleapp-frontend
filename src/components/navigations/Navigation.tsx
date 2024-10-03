import { Link, useNavigate } from 'react-router-dom'
import { Flex, Spacer, Image, Box, useDisclosure } from '@chakra-ui/react'
import { BiSolidHome, BiSearchAlt, BiHeart, BiUser, BiLogOut } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { unsetLoggedUser } from '@/features/auth/authSlice'
import API from '@/networks/api'

import NavigationItem from './NavigationItem'
import SolidButton from '@/components/buttons/SolidButton'
import BrandModal from '@/components/modals/BrandModal'
import NewVibe from '@/components/vibes/NewVibe'
import { useVibes } from '@/hooks/useVibes'

function Navigation() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [, onPost] = useVibes({ onClose })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function onLogout() {
        API.SET_TOKEN('')
        dispatch(unsetLoggedUser())

        navigate('/')
    }

    return (
        <Flex
            as={'nav'}
            direction={'column'}
            pr={'2rem'}
            gap={'2rem'}
            height={'90vh'}
            pos={'fixed'}
            w={'266px'}
        >
            <Image src={'/circle.png'} objectFit={'cover'} width={'60%'} mb={'1rem'} />
            <Link to={'/'}>
                <NavigationItem icon={<BiSolidHome />} text={'Home'} />
            </Link>
            <Link to={'/search'}>
                <NavigationItem icon={<BiSearchAlt />} text={'Search'} />
            </Link>
            <Link to={'/follows'}>
                <NavigationItem icon={<BiHeart />} text={'Follows'} />
            </Link>
            <Link to={'/me'}>
                <NavigationItem icon={<BiUser />} text={'Profile'} />
            </Link>
            <SolidButton onClick={onOpen} text={'Create Vibe'} py={'1.5rem'} />
            <Spacer />

            <NavigationItem icon={<BiLogOut />} text={'Logout'} onLogout={onLogout} />
            <BrandModal isOpen={isOpen} onClose={onClose} size={'xl'}>
                <Box pt={'.5rem'}>
                    <NewVibe
                        placeholder={"What's on your mind?"}
                        imagePreviewId={'atModal'}
                        onPost={onPost}
                    />
                </Box>
            </BrandModal>
        </Flex>
    )
}

export default Navigation
