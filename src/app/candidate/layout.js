"use client"

import DetailsComponent from '@/common/SidebarComponents/DetailsComponent';
import SidebarContainer from '@/common/SidebarComponents/SidebarContainer';
import LayoutProvider from '@/components/Layout/LayoutProvider';
import Navbar from '@/components/Layout/Navbar';
import { Box, Drawer, Hidden, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BiHomeAlt2 } from 'react-icons/bi';
import { BsPerson } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineDescription } from 'react-icons/md';
import { PiBagSimpleBold } from 'react-icons/pi';

const SIDEBAR_DATA = [
    {
        display: 'Dashboard',
        value: 'dashboard',
        icon: BiHomeAlt2,
    },
    {
        display: 'My Profile',
        value: 'profile_details',
        icon: BsPerson,
    },
    {
        display: 'My Resume',
        value: 'my_resume',
        icon: MdOutlineDescription,
    },
    {
        display: 'Applied Jobs',
        value: 'applied_jobs',
        icon: PiBagSimpleBold,
    },
    {
        display: 'Job Alerts',
        value: 'job_alerts',
        icon: BsPerson,
    },
];

const Layout = ({ children }) => {
    const router = useRouter()
    const [openSidebar, setOpenSidebar] = useState(false)


    const handleSectionChange = (value) => {
        router.push(value === "dashboard" ? "/candidate" : `/candidate/${value}`)
        setOpenSidebar(false)
    };



    return (
        <LayoutProvider>
            <Box>
                <Navbar />
                <Box sx={{ display: 'flex' }}>


                    <Hidden mdDown>

                        {!openSidebar ? <SidebarContainer
                            listData={SIDEBAR_DATA}
                            onClick={handleSectionChange}
                        /> : null}
                    </Hidden>

                    <Hidden mdUp>
                        <Drawer
                            anchor={'left'}
                            open={openSidebar}
                            onClose={() => setOpenSidebar(false)}

                        >
                            <SidebarContainer
                                listData={SIDEBAR_DATA}
                                onClick={handleSectionChange}
                            />
                        </Drawer>
                    </Hidden>

                    <DetailsComponent isSidebarOpen={openSidebar}>
                        <Box sx={{ height: 50, display: 'flex', alignItems: 'center', borderBottom: 1, borderColor: "rgba(0,0,0,0.1)", px: 3, }}>
                            <IconButton onClick={() => setOpenSidebar(!openSidebar)}>
                                <GiHamburgerMenu fontSize={25} />
                            </IconButton>
                        </Box>
                        <Box sx={{
                            px: 4,
                            py: 2,
                        }}>

                            {children}
                        </Box>
                    </DetailsComponent>
                </Box>
            </Box>
        </LayoutProvider>
    )
}

export default Layout