import { Box, Typography } from '@mui/material';
import React from 'react';

import Link from 'next/link';
const StepperFooter = ({

    ...rest
}) => {
    return (
        <Box {...rest} sx={{ my: 10 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: "wrap", gap: "40px", mb: 5 }}>
                <Link href="/terms">
                    <Typography variant='subHeader3' color="text.darkBlue">Terms & Conditions</Typography>
                </Link>
                <Link href="/policy">
                    <Typography variant='subHeader3' color="text.darkBlue">Privacy Policy</Typography>
                </Link>
                <Link href="/faq">
                    <Typography variant='subHeader3' color="text.darkBlue">FAQ</Typography>
                </Link>
            </Box>
        </Box>
    );
};

export default StepperFooter;
