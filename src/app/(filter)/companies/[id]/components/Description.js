import Button from '@/components/Common/UI/Button';
import NotFound from '@/components/Common/UI/NotFound';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const Description = ({
    data = ''
}) => {
    return (
        <Box>

            <Typography variant="h3" mb={2} component="h3">
                Company Profile
            </Typography>

            <Typography
                color="text.secondary"
                variant="body1" component="p"
            >
                {data || <NotFound />}
            </Typography>
        </Box>
    );
};

export default Description;