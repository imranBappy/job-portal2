'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import SidebarContainer from '@/common/SidebarComponents/SidebarContainer';
import DetailsComponent from '@/common/SidebarComponents/DetailsComponent';
import { BiHomeAlt2 } from 'react-icons/bi';
import { BsPerson } from 'react-icons/bs';
import { MdOutlineDescription } from 'react-icons/md';
import { LiaBookSolid } from 'react-icons/lia';
import Dashboard from './Dashboard';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import PostAJob from './PostAJob';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import AllApplicants from './AllApplicants';
import ChangePassword from './ChangePassword';
import JobList from './JobList';
import ShortlistResume from './ShortlistResume';
import JobPostDetail from './JobPostDetail';

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
    //     display: 'Profile Details',
    //     value: 'profile_details',
    //     icon: BsPerson,
    // },
    {
        display: 'Post A Job',
        value: 'post_a_job',
        icon: BsPerson,
    },
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

const CompanyProfileComponents = () => {
    const [currentSection, setCurrentSection] = useState('dashboard');
    const [jobDetailId, setJobDetailId] = useState(null);

    const handleSectionChange = (value, id) => {
        setCurrentSection(value);
        setJobDetailId(id);
    };
    const handleRedirectToPostAJob = () => {
        setCurrentSection('post_a_job');
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {/* <SidebarContainer
                listData={SIDEBAR_DATA}
                active={currentSection}
                onClick={handleSectionChange}
            />

            <DetailsComponent>
                {currentSection === 'dashboard' ? (
                    <Dashboard
                        handleRedirectToPostAJob={handleRedirectToPostAJob}
                    />
                ) : null}
                {currentSection === 'company_profile' ? (
                    <ProfileDetails
                        handleRedirectToPostAJob={handleRedirectToPostAJob}
                    />
                ) : null}

                {currentSection === 'shortlist_resume' ? (
                    <ShortlistResume />
                ) : null}

                {currentSection === 'post_a_job' ? (
                    <PostAJob
                        updateId={jobDetailId}
                        handleRedirectToJobDetail={handleSectionChange}
                    />
                ) : null}
                {currentSection === 'job_list' ? (
                    <JobList
                        handleRedirectToJobDetail={handleSectionChange}
                        handleRedirectToPostAJob={handleRedirectToPostAJob}
                    />
                ) : null}
                {currentSection === 'all_applicants' ? <AllApplicants /> : null}
                {currentSection === 'change_password' ? (
                    <ChangePassword />
                ) : null}
                {currentSection === 'job_detail' ? (
                    <JobPostDetail
                        id={jobDetailId}
                        handleRedirectToUpdateJob={handleSectionChange}
                    />
                ) : null}
            </DetailsComponent> */}
        </Box>
    );
};

export default CompanyProfileComponents;
