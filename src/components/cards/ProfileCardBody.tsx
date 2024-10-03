import { Text, CardBody } from '@chakra-ui/react'
import { fontSizing } from '@/styles/style'

interface ProfileCardBodyProps {
    username: string
    name: string
    bio: string | null
    py?: string
}

function ProfileCardBody({ username, name, bio, py = '.5rem' }: ProfileCardBodyProps) {
    return (
        <CardBody padding={0} py={py}>
            <Text fontSize={fontSizing.big} fontWeight={'700'}>
                {name}
            </Text>
            <Text color={'circle.dark'} fontSize={fontSizing.small} mb={'.5rem'}>
                @{username}
            </Text>
            {bio && <Text fontSize={fontSizing.small}>{bio}</Text>}
        </CardBody>
    )
}

export default ProfileCardBody
