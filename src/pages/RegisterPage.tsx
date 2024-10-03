import { Link as ReactLink, useNavigate } from 'react-router-dom'
import { Container, Flex, Text, Image, Link as CircleLink } from '@chakra-ui/react'
import { fontSizing } from '@/styles/style'
import { RegisterDataType } from '@/types/types'

import useCircleToast from '@/hooks/useCircleToast'
import RegisterInput from '@/components/inputs/RegisterInput'
import API from '@/networks/api'

function RegisterPage() {
    const navigate = useNavigate()
    const createToast = useCircleToast()

    async function onRegister(data: RegisterDataType): Promise<void> {
        const watchedPromise = registerHandler(data)
        createToast(watchedPromise, {
            title: 'Register',
            message: 'Account created!',
        })
    }

    async function registerHandler(data: RegisterDataType): Promise<unknown> {
        await API.REGISTER(data)
        return navigate('/login')
    }

    return (
        <Container height={'100vh'} width={'400px'}>
            <Flex direction={'column'} gap={'1rem'}>
                <Image src={'/circle.png'} width={'35%'} mt={'3rem'} />
                <Text fontSize={fontSizing.bigger} fontWeight={'600'} mt={'-.75rem'}>
                    Create new account
                </Text>
                <RegisterInput onRegister={onRegister} />
                <Text>
                    Already have account?
                    <CircleLink as={ReactLink} to={'/login'} color={'circle.accent'} ml={'.25rem'}>
                        Login.
                    </CircleLink>
                </Text>
            </Flex>
        </Container>
    )
}

export default RegisterPage
