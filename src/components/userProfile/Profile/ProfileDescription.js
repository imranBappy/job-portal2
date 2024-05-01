import { Box, Typography } from '@mui/material';
import React from 'react';
import ProfileCardHeader from '../ProfileCardHeader';

const ProfileDescription = ({ handleOpen, data }) => {
    return (
        <>
            <Box
                style={{
                    border: '1px solid #D6DDEB',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                }}
            >
                <ProfileCardHeader onClick={handleOpen} hideBtn title="Description" />

                <Typography
                    textAlign={'justify'}
                    variant="body1"
                    color={'text.secondary'}
                >
                    {data}
                </Typography>
            </Box>
        </>
    );
};

export default ProfileDescription;
