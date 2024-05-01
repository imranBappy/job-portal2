import { Box, Typography } from '@mui/material';
import React from 'react';
import Button from '../Common/UI/Button';

const BtnSection = () => {
    return (
        <Box
            mt={10}
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            width='100%'
            height='100%'

            flexWrap={{
                xs: 'wrap',
                md: 'nowrap'
            }}

        >
            <Box minHeight={330} width={{
                xs: '100%',
                md: '50%'
            }}
                sx={{
                    background: 'linear-gradient(90deg, rgba(69, 99, 255, 0.125) 0%, rgba(248, 83, 221, 0.1) 100%)'
                }}

                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}

            >
                <Typography variant='h2' mb={3} color={"#172935"}>
                    Your Dream Job Waiting
                </Typography>
                <Button
                    href='/jobs'
                    style={{
                        width: '200px',
                        height: '50px',
                        background: '#0079D1',
                        color: '#fff',
                        fontSize: '18px',
                    }}
                >
                    Search Job
                </Button>
            </Box>
            <Box minHeight={330} width={{
                xs: '100%',
                md: '50%'
            }}
                sx={{
                    background: 'linear-gradient(270deg, rgba(248, 83, 221, 0.1) 0%, rgba(69, 99, 255, 0.125) 100%)'
                }}


                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}

            >
                <Typography variant='h2' mb={3} color={"#172935"}>
                    Create a Resume free
                </Typography>
                <Button
                    href='/resume'
                    variant='outlined'
                    style={{
                        width: '200px',
                        height: '50px',
                        color: '#1C3E5E',
                        fontSize: '18px',
                    }}
                >
                    Create Resume
                </Button>

            </Box>
        </Box>
    );
};

export default BtnSection;