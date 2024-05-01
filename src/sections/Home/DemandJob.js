"use client"

import JobCard from '@/components/Common/card/Job/DemandJobCard';
import { DEMAND_JOB_QUERY } from '@/graphql/demandJob/demandJobQuery';
import { useQuery } from '@apollo/client';
import { Typography } from '@mui/material';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from 'swiper';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Box } from '@mui/system';

import '../../styles/DemandJob.css'

import 'swiper/css';
import 'swiper/css/navigation';
import CustomContainer from '@/common/CustomContainer';







const DemandJob = () => {


    const swiperRef = useRef();
    const { data, loading, error } = useQuery(DEMAND_JOB_QUERY, {
        // variables: {
        //     // first: 5
        // }
    });


    if (loading) return <p style={{ width: "100%", textAlign: 'center', margin: 50 }}>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const jobs = data?.demandingJobs?.edges.map((edge) => edge.node);


    return (
        <CustomContainer>
            <Typography color="text.primary" textAlign={'center'} mt={10} variant='h2'>
                Most Demand Job
            </Typography>
            <Typography mb={3} color="text.lightBlue" variant='subHeader2' component={'p'} textAlign={'center'} mt={2} >
                Browse jobs by clicking on the category below.
            </Typography>

            {/* <Grid display={'flex'} flexWrap={'wrap'} justifyContent={'center'} mt={10} gap={2} >
                    {
                        jobs?.map(item => (<JobCard key={item.id} item={item} />))
                    }
                </Grid> */}
            <Box sx={{
                position: "relative",

                borderWidth: 1,
                borderColor: 'primary.main',
            }}

            >
                <Box
                    onClick={() => {
                        swiperRef.current?.slideNext()
                    }}
                    sx={{ zIndex: 99, cursor: 'pointer', borderRadius: "50%", height: 48, width: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#00000033', position: 'absolute', right: "20%", top: "34%", }}
                >

                    <ArrowForwardIos />
                </Box>
                <Box
                    onClick={() => swiperRef.current?.slidePrev()}
                    sx={{ zIndex: 99, cursor: 'pointer', borderRadius: "50%", height: 48, width: 48, bgcolor: '#00000033', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', left: "20%", top: "34%" }}
                >
                    <ArrowBackIos sx={{ ml: 0.9, }} />
                </Box>
                <Swiper watchSlidesProgress={true} slidesPerView={5} className="mySwiper"
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 20
                        },
                        480: {
                            slidesPerView: 1,
                            spaceBetween: 30
                        },
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                        1280: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                        },
                    }}
                    loop={true}
                >
                    {
                        jobs?.map(item => (<SwiperSlide key={item.id}><JobCard item={item} /> </SwiperSlide>))
                    }
                </Swiper>
            </Box>

        </CustomContainer>

    );
};

export default DemandJob;