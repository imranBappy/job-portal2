"use client"
import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import styles from '../../sections/Home/Header/Header.module.css';
import JobSearch from '@/sections/Home/Header/JobSearch';
const JobFilterHeader = (props) => {
    const { title1, title2, subtitle } = props;

    return (
        <Box
            sx={{
                backgroundImage: `url(/images/hero-bg.svg)`,
                width: '100%',
                height: '335px',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
        >
            <Container maxWidth="xl">
                <Box
                    style={{
                        width: '100%',
                        height: 335,
                    }}
                    display={'flex'}
                    justifyContent={'space-around'}
                    alignItems={'center'}
                >
                    <Box
                        flexGrow={1}
                        alignSelf={'center'}
                    >
                        <Typography align='center' variant='h2' mb={3}>
                            {title1} <Typography variant='h2' component={'span'} color={'primary'}

                                position={'relative'}
                            >     {title2}
                                <Image
                                    src={'/images/company-title-border.svg'}
                                    width={250}
                                    height={10}
                                    // layout={'responsive'}
                                    style={{
                                        position: 'absolute',
                                        width: 250,
                                        height: 10,
                                        top: '100%',
                                        left: '0',

                                    }}
                                    className={styles.header_styled_border1}

                                />
                            </Typography>

                        </Typography>
                        <Typography
                            style={{
                                maxWidth: '700px',
                                margin: 'auto'
                            }}
                            align='center' component={'p'} variant='subHeader2'>
                            {subtitle}
                        </Typography>

                        <JobSearch locationState={props.locationState} handleSearch={props.handleSearch}
                            sx={{
                                mt: 3
                            }}
                        />
                        <Typography component={'p'} variant='p'
                            fontSize={'1rem'}
                            color="#515B6F"
                            marginTop={'1rem'}
                        >
                            Popular : UI Designer, UX Researcher, Android, Admin
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default JobFilterHeader;