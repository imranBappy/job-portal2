import CustomContainer from '@/common/CustomContainer';
import Button from '@/components/Common/UI/Button';
import { Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link'

const Services = () => {
    return (
        <CustomContainer  >
            <Grid display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'space-between'}  >
                <Typography color="text.primary" maxWidth={650} textAlign={'center'} mt={10} variant='h2'>
                    Build Your Resume Fast and Easy To Find a Job
                </Typography>
                <Typography color="text.lightBlue" maxWidth={700} variant='subHeader2' textAlign={'center'} mt={5} >
                    Resume was founded to disrupt how talent and business leaders connect. Proven Track Record of Success in Business Administration and Financial Services.
                </Typography>
            </Grid>
            <Grid container mt={5} justifyContent={'center'} spacing={7} alignItems={'center'} >

                <Grid item md={4} xl={4} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'space-between'} >
                    <Image src='/icons/service3.svg'
                        width={100}
                        height={100}
                        alt='Service3'

                    />
                    <Typography mb={2} color="text.primary" maxWidth={224} textAlign={'center'} mt={2} variant='h5'>
                        Create a perfect resume
                    </Typography>
                    <Typography color="text.lightBlue" maxWidth={300} textAlign={'center'} mt={1} >
                        Build your reputation with a universal profile that works across hundreds of different kind of employers.
                    </Typography>
                </Grid>
                <Grid item md={4} xl={4} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'space-between'} >
                    <Image src='/icons/service2.svg'
                        width={100}
                        height={100}
                        alt='Service2'

                    />
                    <Typography mb={2} color="#1C3E5E" maxWidth={224} textAlign={'center'} mt={2} variant='h5'>
                        Identify career opportunities.
                    </Typography>
                    <Typography color="rgba(28, 62, 94, 0.75)" maxWidth={300} textAlign={'center'} mt={1} >
                        Select your preferences (shift details, salary, location, etc.) and discover jobs most relevant to you.
                    </Typography>
                </Grid>
                <Grid item md={4} xl={4} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'space-between'} >
                    <Image src='/icons/service1.svg'
                        width={100}
                        height={100}
                        alt='Service1'

                    />
                    <Typography mb={2} color="#1C3E5E" maxWidth={224} textAlign={'center'} mt={2} variant='h5'>
                        Find your next opportunity!
                    </Typography>
                    <Typography color="rgba(28, 62, 94, 0.75)" maxWidth={300} textAlign={'center'} mt={1} >
                        Message multiple employers while keeping all communication in one, convenient place. It’s so much easy.
                    </Typography>
                </Grid>


            </Grid>
            <Grid container mt={5} justifyContent={'center'} alignItems={'center'} >
                <Link
                    href="/login?path=resume?"
                >

                    <Button style={{
                        padding: '10px 65px',
                        bgcolor: 'common.blue',
                    }} variant='contained' color='primary' label="Get Started" />
                </Link>

            </Grid>
        </CustomContainer>
    );
};

export default Services;