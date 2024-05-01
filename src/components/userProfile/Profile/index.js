import { Box } from '@mui/material';
import React from 'react';
import UserHeader from '../UserHeader';
import AdditionalDetails from './AdditionalDetails';
import ProfileCard from './ProfileCard';
import ProfileSocialLinks from './ProfileSocialLinks';
import ProfileSkills from './ProfileSkills';
import ExperiencesCardContainer from './ExperiencesCardContainer';
import ProfileEducationContainer from './ProfileEducationContainer';

const Profile = () => {
    return (
        <Box>
            <UserHeader title="Profile Information" />
            <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'start'}
                mb={2}
                gap={2}
                flexWrap={{
                    xs: 'wrap',
                    md: 'nowrap',
                }}
            >
                <Box
                    flexGrow={1}
                    display={'flex'}
                    flexDirection={'column'}
                    gap={2}
                >
                    <ProfileCard />
                    <Box
                        style={{
                            border: '1px solid #D6DDEB',
                            padding: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                        }}
                    >

                        <ProfileEducationContainer />

                    </Box>
                    <Box
                        style={{
                            border: '1px solid #D6DDEB',
                            padding: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                        }}
                    >

                        <ExperiencesCardContainer />

                    </Box>



                    <Box
                        style={{
                            border: '1px solid #D6DDEB',
                            padding: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                        }}
                    >

                        <ProfileSkills />
                    </Box>
                </Box>
                <Box
                    flexShrink={0}
                    flexBasis={352}
                    display={'flex'}
                    flexDirection={'column'}
                    gap={2}
                >
                    <AdditionalDetails />
                    <ProfileSocialLinks />
                </Box>
            </Box>
        </Box>
    );
};

export default Profile;
