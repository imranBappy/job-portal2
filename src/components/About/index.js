import { Box, Container } from '@mui/material';
import React from 'react';
import AboutUs from './AboutUs';
import Work from './Work';
import Testimonial from './Testimonial';
import BtnSection from './BtnSection';

const About = () => {
    return (

        <Box
            py={10}
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            height='100%'
            gap={7}
        >
            <Container maxWidth='xl'>
                <AboutUs />
            </Container>
            <Work />
            <Container maxWidth='xl'>
                <Testimonial />
            </Container>
            <BtnSection />
        </Box>
    );
};

export default About;