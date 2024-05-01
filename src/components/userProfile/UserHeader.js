import { Box, Typography } from '@mui/material';
import React from 'react';

const UserHeader = ({ title = 'Hello, James', subtitle }) => {
    return (
        <Box mb={2}>
            <Typography variant="h2" color={'text.primary'}>
                {title}
            </Typography>
            {subtitle && (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {subtitle}
                </Typography>
            )}
        </Box>
    );
};

export default UserHeader;
