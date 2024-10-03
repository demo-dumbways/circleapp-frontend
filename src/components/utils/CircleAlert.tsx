import { Box, Center, Flex, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

interface CircleAlertProps {
    code?: number
}

function CircleAlert({ code }: CircleAlertProps) {
    if (code) {
        return (
            <Center height={'100vh'}>
                <Flex direction={'column'} gap={'.5rem'} padding={'2rem'}>
                    <Image src={'/circle.png'} boxSize={'115px'} height={'auto'} />
                    <Text>404: Sorry, but there's nothing here.</Text>
                    <Box ml={'auto'} mt={'1rem'}>
                        <Link to={'/'}>
                            <Text color={'circle.accent'}>Go Back</Text>
                        </Link>
                    </Box>
                </Flex>
            </Center>
        )
    }

    return (
        <Center height={'100vh'}>
            <Flex direction={'column'} gap={'.5rem'} padding={'2rem'}>
                <Image src={'/circle.png'} boxSize={'115px'} height={'auto'} />
                <Text>
                    At this moment, the Circle App is only compatible with laptops and desktop
                    computers.
                </Text>
            </Flex>
        </Center>
    )
}

export default CircleAlert
