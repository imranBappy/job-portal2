import React from 'react';
import { Box, Typography } from '@mui/material';

const ResumeDetailList = ({ icon, label }) => {
    return (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1 }}>
            {icon}
            <Typography
                sx={{ fontSize: 20, color: 'text.darkBlue', fontWeight: 700 }}
            >
                {label}
            </Typography>
        </Box>
    );
};

export default ResumeDetailList;
