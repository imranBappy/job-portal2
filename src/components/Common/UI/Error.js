import { Box, Typography } from '@mui/material';
import React from 'react';

const Error = () => {
    return (
        <Box
            sx={{
                width: '100%',
                textAlign: 'center',
                justifyContent: 'center',
                p: 5,
            }}
        >
            <Typography variant="h6" sx={{
                width: '100%',
                textAlign: 'center',
                color: 'error.main',
                mt: 5

            }}>There is an error </Typography>
        </Box>
    );
};

export default Error;