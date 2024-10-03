import { Box, Grid, GridItem } from '@chakra-ui/react'
import { Link, Params, useParams } from 'react-router-dom'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { useReplies } from '@/hooks/useReplies'

import MainBar from '@/components/bars/MainBar'
import SideBar from '@/components/bars/SideBar'
import ProfileCard from '@/components/cards/ProfileCard'
import SuggestionCard from '@/components/cards/SuggestionCard'
import DeveloperCard from '@/components/cards/DeveloperCard'
import NavigationHeading from '@/components/navigations/NavigationHeading'
import VibeDetail from '@/components/vibes/VibeDetail'
import CircleSpinner from '@/components/utils/CircleSpinner'

function VibeDetailPage() {
    const { id }: Readonly<Params<string>> = useParams()
    const targetId = id ? +id : NaN

    const [vibe, onReply] = useReplies(targetId)

    return (
        <Grid templateColumns={'repeat(19, 1fr)'}>
            <GridItem colSpan={12}>
                <MainBar>
                    <Link to={'/'}>
                        <NavigationHeading icon={<BiLeftArrowAlt />} text={'Vibe'} sticky />
                    </Link>
                    {vibe ? (
                        <VibeDetail vibe={vibe} onReply={onReply} />
                    ) : (
                        <Box pt={'3rem'} borderTop={'1px'} borderColor={'circle.darker'}>
                            <CircleSpinner />
                        </Box>
                    )}
                </MainBar>
            </GridItem>
            <GridItem colSpan={7}>
                <SideBar>
                    <ProfileCard />
                    <SuggestionCard />
                    <DeveloperCard />
                </SideBar>
            </GridItem>
        </Grid>
    )
}

export default VibeDetailPage
