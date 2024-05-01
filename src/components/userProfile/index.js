import React, { useState } from 'react';
import { Box } from '@mui/material';
import SidebarContainer from '@/common/SidebarComponents/SidebarContainer';
import DetailsComponent from '@/common/SidebarComponents/DetailsComponent';
import { BiHomeAlt2 } from 'react-icons/bi';
import { BsPerson } from 'react-icons/bs';
import { MdOutlineDescription } from 'react-icons/md';
import { PiBagSimpleBold } from 'react-icons/pi';

import Profile from './Profile';
import ChangePassword from './ChangePassword';
import ShortlistResume from '../companyProfile/ShortlistResume';
import Dashboard from './Dashboard';
import MyResume from './MyResume';
import AppliedJobs from './AppliedJobs';
import JobAlerts from './JobAlerts';

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

const CompanyProfileComponents = () => {
    const [currentSection, setCurrentSection] = useState('dashboard');

    const handleSectionChange = (value) => {
        setCurrentSection(value);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <SidebarContainer
                listData={SIDEBAR_DATA}
                active={currentSection}
                onClick={handleSectionChange}
            />

            <DetailsComponent>
                {currentSection === 'dashboard' ? <Dashboard /> : null}
                {currentSection === 'shortlist_resume' ? (
                    <ShortlistResume />
                ) : null}
                {currentSection === 'profile_details' ? <Profile /> : null}
                {currentSection === 'my_resume' ? <MyResume /> : null}
                {currentSection === 'applied_jobs' ? <AppliedJobs /> : null}
                {
                    currentSection === 'job_alerts' ? <JobAlerts /> : null
                }
                {currentSection === 'change_password' ? (
                    <ChangePassword />
                ) : null}
            </DetailsComponent>
        </Box>
    );
};

export default CompanyProfileComponents;
