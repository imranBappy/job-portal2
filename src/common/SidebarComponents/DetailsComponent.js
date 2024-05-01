import { Box, useMediaQuery } from '@mui/material';
import React from 'react';

const DetailsComponent = ({ children, isSidebarOpen }) => {
    const matches = useMediaQuery('(max-width:900px)');

    return (
        <Box
            sx={{
                width: isSidebarOpen || matches ? "100%" : 'calc(100% - 280px)',
                marginLeft: isSidebarOpen || matches ? 0 : '280px',
                transition: "all 0.2s"

            }}
        >
            {children}
        </Box>
    );
};

export default DetailsComponent;
