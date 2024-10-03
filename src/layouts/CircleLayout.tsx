import { Grid, GridItem } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import SideBar from '@/components/bars/SideBar'
import Navigation from '@/components/navigations/Navigation'

function CircleLayout() {
    return (
        <Grid templateColumns={'repeat(24, 1fr)'}>
            <GridItem colSpan={5}>
                <SideBar>
                    <Navigation />
                </SideBar>
            </GridItem>
            <GridItem colSpan={19}>
                <Outlet />
            </GridItem>
        </Grid>
    )
}

export default CircleLayout
