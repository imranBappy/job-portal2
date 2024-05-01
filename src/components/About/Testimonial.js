"use client"

import { Box, Typography } from '@mui/material';
import React from 'react';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './About.css';


var $ = require('jquery');
if (typeof window !== 'undefined') {
    window.$ = window.jQuery = require('jquery');
}

import dynamic from 'next/dynamic';
import TestimonialSlide from './TestimonialSlide';

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
    ssr: false,
});


const Testimonial = () => {
    const options = {
        loop: true,
        center: true,
        items: 1,
        margin: 0,
        autoplay: true,
        dots: false,
        nav: true,
        autoplayTimeout: 8500,
        smartSpeed: 450,

    };


    return (
        <Box mt={5}>

            <Box>



                <Typography fontSize={50.67} fontFamily={'Lato'} textAlign={'center'} fontWeight={800}>
                    Testimonial
                </Typography>


                <OwlCarousel id="customer-testimonoals"
                    className="owl-carousel owl-theme"

                    {...options}
                >
                    {[1, 2, 3].map((item, index) => (
                        <TestimonialSlide key={index} item={item} />
                    ))}
                </OwlCarousel>



            </Box>
        </Box>
    );
};

export default Testimonial;