import React from 'react';
import { Box, Divider } from '@mui/material';
import ProfileDetailHeader from './ProfileDetailHeader';

const WorkingAt = () => {
    return (
        <Box>
            <ProfileDetailHeader title="Working at Nomad" showAdd />
            <Box sx={{ border: 1, height: 600, width: '100%' }}></Box>
            <Divider sx={{ my: 3 }} />
        </Box>
    );
};

export default WorkingAt;
