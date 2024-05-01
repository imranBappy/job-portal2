"use client"

import DetailsComponent from '@/common/SidebarComponents/DetailsComponent';
import SidebarContainer from '@/common/SidebarComponents/SidebarContainer';
import Navbar from '@/components/Layout/Navbar';
import { Box, Drawer, Hidden, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { BiHomeAlt2 } from 'react-icons/bi';
import { BsPerson } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { LiaBookSolid } from 'react-icons/lia';
import { MdOutlineDescription } from 'react-icons/md';

const SIDEBAR_DATA = [
    {
        display: 'Dashboard',
        value: 'dashboard',
        icon: BiHomeAlt2,
    },
    {
        display: 'Company Profile',
        value: 'company_profile',
        icon: BsPerson,
    },
    // {
    //     display: 'Post A Job',
    //     value: 'post_a_job',
    //     icon: BsPerson,
    // },
    {
        display: 'Job List',
        value: 'job_list',
        icon: AiOutlineUnorderedList,
    },
    {
        display: 'Shortlist Resume',
        value: 'shortlist_resume',
        icon: MdOutlineDescription,
    },
    {
        display: 'All Applicants',
        value: 'all_applicants',
        icon: LiaBookSolid,
    },
];

const Layout = ({ children }) => {
    const router = useRouter()



    const [openSidebar, setOpenSidebar] = useState(false)

    const handleSectionChange = (value) => {
        router.push(value === "dashboard" ? "/recruiter" : `/recruiter/${value}`)
        setOpenSidebar(false)
    };




    return (
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
    )
}

export default Layout