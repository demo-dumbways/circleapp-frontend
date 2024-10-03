import { Link as ReactLink, useNavigate } from 'react-router-dom'
import { Container, Flex, Text, Image, Link as CircleLink } from '@chakra-ui/react'
import { fontSizing } from '@/styles/style'
import { LoginDataType, UserType } from '@/types/types'
import { setLoggedUser } from '@/features/auth/authSlice'
import { useDispatch } from 'react-redux'

import useCircleToast from '@/hooks/useCircleToast'
import LoginInput from '@/components/inputs/LoginInput'
import API from '@/networks/api'

function LoginPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const createToast = useCircleToast()

    async function onLogin(data: LoginDataType): Promise<void> {
        const watchedPromise = loginHandler(data)
        createToast(watchedPromise, {
            title: 'Login',
            message: 'Welcome back!',
        })
    }

    async function loginHandler(data: LoginDataType) {
        const token: string | undefined = await API.LOGIN(data)

        if (token) {
            const loggedUser: UserType = await API.GET_LOGGED_USER()
            dispatch(setLoggedUser(loggedUser))

            navigate('/')
        }
    }

    return (
        <Container height={'100vh'} width={'400px'}>
            <Flex direction={'column'} gap={'1rem'}>
                <Image src={'/circle.png'} width={'35%'} mt={'3rem'} />
                <Text fontSize={fontSizing.bigger} fontWeight={'600'} mt={'-.75rem'}>
                    Login to circle
                </Text>
                <LoginInput onLogin={onLogin} />
                <Text>
                    Don't have an account?
                    <CircleLink
                        as={ReactLink}
                        to={'/register'}
                        color={'circle.accent'}
                        ml={'.25rem'}
                    >
                        Create one.
                    </CircleLink>
                </Text>
            </Flex>
        </Container>
    )
}

export default LoginPage
