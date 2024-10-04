import { Link } from 'react-router-dom'
import { Grid, GridItem, Card } from '@chakra-ui/react'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux'

import MainBar from '@/components/bars/MainBar'
import SideBar from '@/components/bars/SideBar'
import SuggestionCard from '@/components/cards/SuggestionCard'
import DeveloperCard from '@/components/cards/DeveloperCard'
import ProfileCardHeader from '@/components/cards/ProfileCardHeader'
import ProfileCardBody from '@/components/cards/ProfileCardBody'
import ProfileCardFooter from '@/components/cards/ProfileCardFooter'
import NavigationHeading from '@/components/navigations/NavigationHeading'
import BrandTabs from '@/components/utils/BrandTabs'
import ThreadList from '@/components/threads/ThreadList'
import MediaCollection from '@/components/utils/MediaCollection'
import CircleSpinner from '@/components/utils/CircleSpinner'

function MePage() {
    const loggedUser = useSelector((states: RootState) => states.loggedUser.value)

    if (loggedUser) {
        const { username, name, bio, avatar, banner, totalFollower, totalFollowing, threads } =
            loggedUser

        return (
            <Grid templateColumns={'repeat(19, 1fr)'}>
                <GridItem colSpan={12}>
                    <MainBar>
                        <Link to={'/'}>
                            <NavigationHeading icon={<BiLeftArrowAlt />} text={name} sticky />
                        </Link>
                        <Card
                            bg={'circle.backdrop'}
                            px={'1rem'}
                            color={'circle.font'}
                            mb={'1.5rem'}
                        >
                            <ProfileCardHeader
                                buttonText={'Edit Profile'}
                                avatar={avatar}
                                banner={banner}
                            />
                            <ProfileCardBody
                                py={'1rem'}
                                username={username}
                                name={name}
                                bio={bio}
                            />
                            <ProfileCardFooter
                                totalFollower={totalFollower}
                                totalFollowing={totalFollowing}
                            />
                        </Card>
                        <BrandTabs
                            leftTitle={'Threads'}
                            leftContent={<ThreadList threads={threads} />}
                            rightTitle={'Media'}
                            rightContent={<MediaCollection threads={threads} />}
                        />
                    </MainBar>
                </GridItem>
                <GridItem colSpan={7}>
                    <SideBar>
                        <SuggestionCard />
                        <DeveloperCard />
                    </SideBar>
                </GridItem>
            </Grid>
        )
    }

    return (
        <Grid templateColumns={'repeat(19, 1fr)'} height={'100vh'}>
            <GridItem colSpan={19}>
                <CircleSpinner />
            </GridItem>
        </Grid>
    )
}

export default MePage
