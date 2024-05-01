import Button from '@/components/Common/UI/Button';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const Description = ({
    data = ''
}) => {
    return (
        <Box >

            <Typography variant="h3" mb={2} component="h3">
                Job Description
            </Typography>

            <Typography
                color="text.secondary"
                variant="body1" component="p"
            >
                {data}
            </Typography>
        </Box>
    );
};

export default Description;