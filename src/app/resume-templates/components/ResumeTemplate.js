import React from 'react';
import Button from '@/components/Common/UI/Button';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
const ResumeTemplate = () => {
    return (
        <Box maxWidth={380}>
            <Box
                sx={{
                    position: 'relative',
                    '&:hover': {
                        '& button': {
                            display: 'block',
                        },
                    },
                }}
            >
                <Image
                    src={'/fakeImage/resume.svg'}
                    alt="Resume Templates"
                    width={380}
                    height={538}
                />
                <Button
                    sx={{
                        position: 'absolute',
                        bottom: 80,
                        right: 40,
                        display: 'none',
                        width: '297px',
                        height: '54px',
                        fontFamily: 'Nunito',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                    variant="contained"
                    color="primary"
                >
                    Use this template
                </Button>
            </Box>
            <Box my={3}>
                <Typography color="text.primary" variant="h5">
                    Aesthetic
                </Typography>
                <Typography mt={2} variant="body1" color="text.secondary">
                    Brown Cream Aesthetic Minimalist Graphic Designer Resumed
                    graphs.
                </Typography>
            </Box>
        </Box>
    );
};

export default ResumeTemplate;
