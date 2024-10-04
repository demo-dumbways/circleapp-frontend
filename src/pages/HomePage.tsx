import { Box, Grid, GridItem } from '@chakra-ui/react'
import { useThreads } from '@/hooks/useThreads'

import MainBar from '@/components/bars/MainBar'
import SideBar from '@/components/bars/SideBar'
import ProfileCard from '@/components/cards/ProfileCard'
import SuggestionCard from '@/components/cards/SuggestionCard'
import DeveloperCard from '@/components/cards/DeveloperCard'
import ThreadList from '@/components/threads/ThreadList'
import NewThread from '@/components/threads/NewThread'
import NavigationHeading from '@/components/navigations/NavigationHeading'
import CircleSpinner from '@/components/utils/CircleSpinner'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux'
import { useEffect, useState } from 'react'
import { ThreadType } from '@/types/types'

function HomePage() {
    const loggedUser = useSelector((states: RootState) => states.loggedUser.value)

    const [threads, onPost] = useThreads()
    const [preparedThreads, setPreparedThreads] = useState<ThreadType[]>([])

    useEffect(() => {
        if (!loggedUser?.filterContent) {
            setPreparedThreads(() => {
                if (threads) {
                    return threads.filter((thread) => !thread.badLabels.length)
                }

                return []
            })
        } else {
            setPreparedThreads(() => {
                if (threads) {
                    return threads
                }

                return []
            })
        }
    }, [threads, loggedUser])

    return (
        <Grid templateColumns={'repeat(19, 1fr)'}>
            <GridItem colSpan={12}>
                <MainBar>
                    <NavigationHeading text={'Home'} disabled />
                    <NewThread
                        placeholder={"What's on your mind?"}
                        imagePreviewId={'atHome'}
                        onPost={onPost}
                    />
                    {preparedThreads.length ? (
                        <ThreadList threads={preparedThreads} />
                    ) : (
                        <Box mt={'3rem'}>
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

export default HomePage
