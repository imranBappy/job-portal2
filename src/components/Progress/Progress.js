import { Box } from '@mui/material';
import React from 'react';

const Progress = ({ value = '50%' }) => {
    return (
        <Box bgcolor={`#D6DDEB`} sx={{ width: "95%", height: 5, }} >
            <Box sx={{ width: value, height: '100%', bgcolor: '#56CDAD', }} />
        </Box>
    );
};

export default Progress;