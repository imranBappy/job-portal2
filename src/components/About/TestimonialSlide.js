import CustomContainer from '@/common/CustomContainer';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const TestimonialSlide = () => {
    return (
        <CustomContainer >
            <Box mt={2}>
                <Box
                    width={'100%'}
                    height={'100%'}
                    position={'relative'}
                >
                    <Box
                        sx={{
                            width: '29.2px',
                            height: '29.2px',
                            bgcolor: "#FF8701",
                            borderRadius: '50%',

                            position: 'absolute',
                            top: '0',
                            left: '0',
                        }}
                    />
                    <Box
                        sx={{
                            width: '12.7px',
                            height: '12.7px',
                            bgcolor: "#189877",
                            borderRadius: '50%',
                            position: 'absolute',
                            top: '300px',
                            left: '-50px',
                        }}
                    />

                    <Box
                        sx={{
                            width: '8.89px',
                            height: '8.89px',
                            bgcolor: "#32A7E2",
                            borderRadius: '50%',


                            position: 'absolute',
                            top: '500px',
                            left: '150px',
                        }}
                    />

                    <Box
                        sx={{
                            width: '8.89px',
                            height: '8.89px',
                            bgcolor: " #00D0D0",
                            borderRadius: '50%',

                            position: 'absolute',
                            top: '550px',
                            left: '350px',
                        }}
                    />

                    <Box
                        sx={{
                            width: '20.31px',
                            height: '20.31px',
                            bgcolor: " #FF5A3C",
                            borderRadius: '50%',

                            position: 'absolute',
                            top: '0px',
                            right: '0px',
                        }}
                    />


                    <Box
                        sx={{
                            width: '20.31px',
                            height: '20.31px',
                            bgcolor: " #FFBF47",
                            borderRadius: '50%',

                            position: 'absolute',
                            top: '300px',
                            right: '-50px',
                        }}
                    />


                    <Box
                        sx={{
                            width: '8.89px',
                            height: '8.89px',
                            bgcolor: "#FFBF47",
                            borderRadius: '50%',


                            position: 'absolute',
                            top: '500px',
                            right: '150px',
                        }}
                    />

                    <Box
                        sx={{
                            width: '19.04px',
                            height: '19.04px',
                            bgcolor: " #FF5A3C",
                            borderRadius: '50%',

                            position: 'absolute',
                            top: '550px',
                            right: '350px',
                        }}
                    />




                </Box>

                <Box >
                    <Box
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                    >
                        <Image style={{
                            borderRadius: '50%',
                        }} src={'/images/Testimonial-user.svg'} width={179} height={175} alt='Imran - Frontend Developer at W3kernel' />
                    </Box>
                    <Typography mt={2} textAlign={'center'} fontSize={25} color={'#082854'} fontWeight={700} fontFamily={'Nunito'}>
                        Jony Scotty
                    </Typography>
                </Box>

                <Box
                    mt={5}
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                >
                    <Typography maxWidth={600} component={'p'} textAlign={'center'} variant='bodySmall' color={'#08285480'}>
                        Quote testimonials are ads or artwork that display positive statements about your company from a brand evangelist or a delighted customer. The quote is usually accompanied by an image of the person being quoted to make the message more relatable to the target audience.
                    </Typography>
                </Box>

                <Box
                    mt={5}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    gap={1}
                >
                    <Image width={22.36} style={{
                        width: '22.36px',
                    }} height={24} alt='star' src={'/images/red-star.svg'} />
                    <Image
                        style={{
                            width: '22.36px',
                        }}
                        width={22.36} height={24} alt='star' src={'/images/red-star.svg'} />
                    <Image
                        style={{
                            width: '22.36px',
                        }}
                        width={22.36} height={24} alt='star' src={'/images/red-star.svg'} />
                    <Image
                        style={{
                            width: '22.36px',
                        }}
                        width={22.36} height={24} alt='star' src={'/images/red-star.svg'} />
                    <Image
                        style={{
                            width: '22.36px',
                        }}
                        width={22.36} height={24} alt='star' src={'/images/black-star.svg'} />
                </Box>
            </Box>
        </CustomContainer>
    );
};

export default TestimonialSlide;