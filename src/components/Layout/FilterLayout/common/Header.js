import JobSearch from '@/sections/Home/Header/JobSearch';
import { Box, Container, Typography } from '@mui/material';
import React from 'react';

const Header = (props) => {
    const { title1, title2, subtitle } = props;
    return (
        <Box
            sx={{
                backgroundImage: `url(/images/hero-bg.svg)`,
                width: '100%',
                height: '500px',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
        >
            <Container maxWidth="xl">
                <Box
                    style={{
                        width: '100%',
                        height: 500,
                    }}
                    display={'flex'}
                    flexDirection={'colum'}
                    justifyContent={'space-around'}
                    alignItems={'center'}

                >

                    <Box
                        flexGrow={1}
                        alignSelf={'center'}
                    >
                        <Typography align='center' variant='h2'>
                            {title1} <Typography variant='h2' component={'span'} color={'primary'}>     {title2}</Typography>
                        </Typography>
                        <Typography align='center' component={'p'} variant='subHeader2'>
                            {subtitle}
                        </Typography>
                        <JobSearch />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Header;