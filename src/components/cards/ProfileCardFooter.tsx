import { Text, CardFooter } from '@chakra-ui/react'

import GhostButton from '@/components/buttons/GhostButton'

interface ProfileCardFooterProps {
    totalFollower: number
    totalFollowing: number
}

function ProfileCardFooter({ totalFollower, totalFollowing }: ProfileCardFooterProps) {
    return (
        <CardFooter display={'flex'} gap={'1rem'} padding={0}>
            <GhostButton>
                <Text color={'circle.font'}>{totalFollowing}</Text>
                <Text color={'circle.dark'} ml={'.25rem'}>
                    Following
                </Text>
            </GhostButton>
            <GhostButton>
                <Text color={'circle.font'}>{totalFollower}</Text>
                <Text color={'circle.dark'} ml={'.25rem'}>
                    Followers
                </Text>
            </GhostButton>
        </CardFooter>
    )
}

export default ProfileCardFooter
