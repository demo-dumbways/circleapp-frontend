import { useSelector } from 'react-redux'
import { RootState } from '@/redux'
import { UserType } from '@/types/types'
import { Collapse, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { BiSolidChevronDown, BiSolidChevronUp } from 'react-icons/bi'

import BrandCard from './BrandCard'
import ProfileCardHeader from './ProfileCardHeader'
import ProfileCardBody from './ProfileCardBody'
import ProfileCardFooter from './ProfileCardFooter'
import BrandHeading from '@/components/utils/BrandHeading'
import CircleSpinner from '@/components/utils/CircleSpinner'
import GhostButton from '@/components/buttons/GhostButton'

function ProfileCard() {
    const [hideProfile, setHideProfile] = useState(false)
    const loggedUser: UserType | undefined = useSelector(
        (states: RootState) => states.loggedUser.value
    )

    function onToggle() {
        setHideProfile((oldState) => !oldState)
    }

    if (loggedUser) {
        const { avatar, banner, bio, username, name, totalFollower, totalFollowing } = loggedUser

        return (
            <BrandCard>
                <GhostButton onClick={onToggle}>
                    <Flex
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        color={'circle.font'}
                        w={'100%'}
                    >
                        <BrandHeading text={name} mb={0} />
                        {hideProfile ? (
                            <BiSolidChevronUp fill={'#ffffff'} size={'1.5rem'} />
                        ) : (
                            <BiSolidChevronDown fill={'#ffffff'} size={'1.5rem'} />
                        )}
                    </Flex>
                </GhostButton>
                <Collapse in={hideProfile} transition={{ enter: { duration: 0.5 } }}>
                    <ProfileCardHeader
                        buttonText={'Edit Profile'}
                        avatar={avatar}
                        banner={banner}
                    />
                    <ProfileCardBody username={username} name={name} bio={bio} />
                    <ProfileCardFooter
                        totalFollower={totalFollower}
                        totalFollowing={totalFollowing}
                    />
                </Collapse>
            </BrandCard>
        )
    }

    return (
        <BrandCard>
            <BrandHeading text={'My Profile'} />
            <CircleSpinner />
        </BrandCard>
    )
}

export default ProfileCard
