'use client';
import Toaster from '@/common/Toaster';
import CircularLoader from '@/components/Loader/CircularLoader';
import { GET_ALL_BASE_TEMPLATE_LIST } from '@/components/ResumeSection/graphql/query';
import { useLazyQuery } from '@apollo/client';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { EffectCoverflow, Navigation, Pagination } from 'swiper';
import CarouselTemplate from './CarouselTemplate';
import Button from '@/components/Common/UI/Button';
import CustomContainer from '@/common/CustomContainer';
import ResumeTemplatesModal from '@/components/ResumeTemplates/ResumeTemplatesModal';



const breakpoints = {
    100: {
        slidesPerView: 1.1,
        spaceBetween: 30,
    },
    400: {
        slidesPerView: 1.2,
        spaceBetween: 30,
    },
    700: {
        slidesPerView: 1.5,
        spaceBetween: 30,
    },
    800: {
        slidesPerView: 2,
        spaceBetween: 30,
    },
    900: {
        slidesPerView: 2.2,
        spaceBetween: 30,
    },
    1140: {
        slidesPerView: 2.5,
        spaceBetween: 30,
    },
    1200: {
        slidesPerView: 3,
        spaceBetween: 30,
    },
    1300: {
        slidesPerView: 3.5,
        spaceBetween: 30,
    },
    1450: {
        slidesPerView: 4,
        spaceBetween: 30,
    },
};



const ResumeCarousel = () => {
    const swiperRef = useRef();
    const router = useRouter()
    const [openTemplateModal, setOpenTemplateModal] = useState(false);



    const [templateList, setTemplateList] = useState([]);

    const onTemplateSelect = () => {
        router.push("/login")
    }

    const onClose = () => {
        setOpenTemplateModal(false)
    }

    const [getResume, { loading: templateLoading }] = useLazyQuery(GET_ALL_BASE_TEMPLATE_LIST, {
        fetchPolicy: 'network-only',
        onError: (error) => {
            Toaster({
                type: 'error',
                message: error.message
            })
        },
        onCompleted: (res) => {
            let temp = res?.baseTemplateList?.edges?.map((item) => item.node)
            setTemplateList(temp)
        }
    })


    useEffect(() => {
        getResume({
            variables: {
                orderBy: "id",
            }
        })
    }, [])


    return (
        < >
            <Typography color="text.primary" textAlign={'center'} mt={20} variant="h2">
                Our Wildest Range of Resume Templete
            </Typography>
            <Typography
                color={'text.primary'}
                variant="subHeader2"
                component={'p'}
                textAlign={'center'}
                mt={2}
                mb={5}
            >
                Browse jobs by clicking on the category below.
            </Typography>


            {templateLoading ?
                <Box
                    sx={{ height: "70vh" }}
                >
                    <CircularLoader />
                </Box> :
                <Box sx={{ position: "relative" }}>
                    <Box
                        onClick={() => {
                            swiperRef.current?.slideNext()

                        }}
                        sx={{ zIndex: 99, cursor: 'pointer', borderRadius: "50%", height: 48, width: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#00000033', position: 'absolute', right: "20%", top: "40%", }}
                    >
                        <ArrowForwardIos />
                    </Box>
                    <Box
                        onClick={() => swiperRef.current?.slidePrev()}
                        sx={{ zIndex: 99, cursor: 'pointer', borderRadius: "50%", height: 48, width: 48, bgcolor: '#00000033', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', left: "20%", top: "40%" }}
                    >
                        <ArrowBackIos sx={{ ml: 0.9, }} />
                    </Box>

                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        breakpoints={breakpoints}
                        loop={true}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                        }}
                        pagination={{ clickable: true }}
                        modules={[EffectCoverflow, Pagination, Navigation]}
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                    >
                        {templateList.map((item) => {
                            return (
                                <SwiperSlide key={`template_${item.id}`} >
                                    <CarouselTemplate
                                        data={item}
                                        currentTemplate={''}
                                    />
                                </SwiperSlide>
                            )
                        })}

                    </Swiper>
                </Box>
            }

            <CustomContainer>
                <Box
                    display={'flex'}
                    justifyContent={{
                        xs: 'center',
                        md: 'flex-end',
                    }}
                    marginTop={{
                        xs: 5,
                        md: -5,
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"

                        onClick={() => setOpenTemplateModal(true)}
                        style={{
                            zIndex: 900
                        }}
                    >
                        View All Templates
                    </Button>
                </Box>
            </CustomContainer>
            <ResumeTemplatesModal
                open={openTemplateModal}
                onClose={onClose}
            />
        </>
    );
};

export default ResumeCarousel;
