import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const NotFound = () => {
    return (
        <Box
            sx={{
                width: '100%',
                textAlign: 'center',
                justifyContent: 'center',
                p: 5,
            }}
        >
            <Image src={'/images/NotFound.svg'} width={200} height={200} alt="empty" />

            <Typography variant="h6" component="h6" sx={{ mt: 5 }}>
                Not Found
            </Typography>

        </Box>
    );
};

export default NotFound;