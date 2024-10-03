import { Container, Flex, Text, Image } from '@chakra-ui/react'
import { fontSizing } from '@/styles/style'
import { Params, useNavigate, useParams } from 'react-router-dom'

import ResetInput from '@/components/inputs/ResetInput'
import { ResetDataType } from '@/types/types'
import api from '@/networks/api'
import { useEffect } from 'react'
import useCircleToast from '@/hooks/useCircleToast'

function ResetPassword() {
    const { token }: Readonly<Params<string>> = useParams()

    const navigate = useNavigate()
    const createToast = useCircleToast()

    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [navigate, token])

    async function onReset(data: ResetDataType) {
        const watchedPromise = resetHandler(data)
        createToast(watchedPromise, {
            title: 'Reset Password',
            message: 'Password changed! Please login with your new password.',
        })

        navigate('/')
    }

    async function resetHandler(data: ResetDataType) {
        if (token) {
            await api.RESET_PASSWORD(data, token)
        }
    }

    return (
        <Container height={'100vh'} width={'400px'}>
            <Flex direction={'column'} gap={'1rem'}>
                <Image src={'/circle.png'} width={'35%'} mt={'3rem'} />
                <Text fontSize={fontSizing.bigger} fontWeight={'600'} mt={'-.75rem'}>
                    Reset Password
                </Text>
                <ResetInput onReset={onReset} />
            </Flex>
        </Container>
    )
}

export default ResetPassword
