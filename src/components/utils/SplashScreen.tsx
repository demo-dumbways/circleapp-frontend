import { Container, Flex, Image, Spinner } from '@chakra-ui/react'

function SplashScreen() {
    return (
        <Container height={'100vh'}>
            <Flex justifyContent={'center'} alignItems={'center'} gap={'.5rem'} height={'100%'}>
                <Image src={'/circle.png'} width={'150px'} />
                <Spinner size={'xs'} color={'circle.accent'} />
            </Flex>
        </Container>
    )
}

export default SplashScreen
