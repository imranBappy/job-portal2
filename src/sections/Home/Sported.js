import CustomContainer from '@/common/CustomContainer';
import { Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const Sported = () => {
    return (
        <section style={{ background: "#FEF7E3", minHeight: "150px", marginTop: 65, }} >
            <CustomContainer >
                <Grid
                    minHeight={150}
                    width={'100%'}
                    display={'flex'}
                    justifyContent="space-between"
                    alignItems="center"
                    flexGrow={1}
                    gap={{
                        xl: 5,
                        sm: 2,
                        xs: 2,
                    }}
                    py={4}
                >
                    <Grid >
                        <Typography
                            color={' #1C3E5E'}
                            fontFamily={'Nunito'}
                            fontWeight={900}
                            variant='p'>
                            Sported by 2.5k Companies
                        </Typography>
                        <Grid display={'flex'} flexWrap={'wrap'} flexGrow={1}  >
                            <Image src='/icons/facebook.svg' width={157} height={67} alt='Facebook' />
                            <Image src='/icons/google.svg' width={157} height={67} alt='Google' />
                            <Image src='/icons/oracel.svg' width={157} height={67} alt='Oracel' />
                            <Image src='/icons/hsbc.svg' width={157} height={67} alt='HSBC' />
                        </Grid>
                    </Grid>
                    <Grid
                        display={'flex'}
                        justifyContent={'space-between'}
                        flexWrap={'wrap'}
                        flexGrow={1}
                        gap={2}
                    >

                        <Typography variant='div' >
                            <Typography color={' #1C3E5E'}
                                fontFamily={'Nunito'}
                                fontWeight={900}
                                variant='p'>
                                Talents
                            </Typography>
                            <Typography
                                fontSize={
                                    {
                                        xs: '1.5rem',
                                        sm: '2rem',
                                        md: '2rem',
                                        lg: '3rem',
                                        xl: '3rem',
                                    }
                                }
                                variant='h2'>+322K</Typography>
                        </Typography >
                        <Typography variant='div' >
                            <Typography
                                color={' #1C3E5E'}
                                fontFamily={'Nunito'}
                                fontWeight={900}
                                variant='p'>Startups</Typography>
                            <Typography
                                fontSize={
                                    {
                                        xs: '1.5rem',
                                        sm: '2rem',
                                        md: '2rem',
                                        lg: '3rem',
                                        xl: '3rem',
                                    }
                                }
                                variant='h2'>+322K</Typography>
                        </Typography>
                        <Typography variant='div' >
                            <Typography
                                color={' #1C3E5E'}
                                fontFamily={'Nunito'}
                                fontWeight={900}
                                variant='p'>Jobs</Typography>
                            <Typography fontSize={
                                {
                                    xs: '1.5rem',
                                    sm: '2rem',
                                    md: '2rem',
                                    lg: '3rem',
                                    xl: '3rem',
                                }
                            } variant='h2'>+23K</Typography>
                        </Typography>
                    </Grid>
                </Grid>

            </CustomContainer>

        </section >
    );
};

export default Sported;