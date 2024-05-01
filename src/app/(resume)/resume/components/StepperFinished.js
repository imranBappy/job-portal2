import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const StepperFinished = ({ error, handleReset }) => {
    return (
        <>
            <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                }}
            >
                <Image
                    width={1000}
                    height={500}
                    src={error ? '/images/error.jpg' : '/images/success.jpg'}
                    alt="placeholder"
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
            </Box>
        </>
    );
};

export default StepperFinished;
