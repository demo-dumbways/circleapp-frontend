import { Link as ReactLink } from 'react-router-dom'
import { Container, Flex, Text, Image, Link as CircleLink } from '@chakra-ui/react'
import { fontSizing } from '@/styles/style'
import { ForgotDataType } from '@/types/types'

import API from '@/networks/api'
import ForgotInput from '@/components/inputs/ForgotInput'
import useCircleToast from '@/hooks/useCircleToast'

function ForgotPasswordPage() {
    const createToast = useCircleToast()

    async function onForgot(data: ForgotDataType) {
        const watchedPromise = forgotHandler(data)
        createToast(watchedPromise, {
            title: 'Forgot Password',
            message: 'A verification email has sent to your email.',
        })
    }

    async function forgotHandler(data: ForgotDataType) {
        await API.FORGOT_PASSWORD(data)
    }

    return (
        <Container height={'100vh'} width={'400px'}>
            <Flex direction={'column'} gap={'1rem'}>
                <Image src={'/circle.png'} width={'35%'} mt={'3rem'} />
                <Text fontSize={fontSizing.bigger} fontWeight={'600'} mt={'-.75rem'}>
                    Forgot Password
                </Text>
                <ForgotInput onForgot={onForgot} />
                <Text>
                    Suddenly remember it?
                    <CircleLink as={ReactLink} to={'/login'} color={'circle.accent'} ml={'.25rem'}>
                        Login.
                    </CircleLink>
                </Text>
            </Flex>
        </Container>
    )
}

export default ForgotPasswordPage
