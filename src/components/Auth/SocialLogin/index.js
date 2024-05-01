import { Box } from '@mui/material';
import React from 'react';
import Google from './Google';
import Linkedin from './Linkedin';

const SocialLogin = ({ }) => {
    return (
        <Box display={'flex'} gap={2}>
            <Google />
            <Linkedin />
        </Box>
    );
};

export default SocialLogin;
