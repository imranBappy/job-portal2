import { Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import JobSearch from './JobSearch';
import styles from './Header.module.css'
import CustomContainer from '@/common/CustomContainer';
import HomePageSearch from './HomePageSearch';

const Header = () => {
    return (

        <CustomContainer >
            <Grid spacing={{ xs: 0, sm: 0, md: 0, lg: 10, xl: 10, }} container justifyContent={'space-between'}  >
                <Grid
                    item
                    md={8} xl={8}
                    width={'100%'} height={'100%'}
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'flex-start'}
                >
                    <Typography
                        className={styles.header_title}
                        mt={20}
                        variant='h1'
                        position={'relative'}
                        maxWidth={'750px'}
                        mb={12}
                        color="text.primary"
                    >
                        Discover Your Path
                        Secure <Typography variant='span' sx={{
                            fontWeight: 900,
                            fontFamily: 'Roboto'
                        }}> Your Ideal Career</Typography>

                        <Image className={styles.header_styled_border1} src='/icons/titleStroke1.svg' alt='titleStroke1' width={447} height={33} />
                        <Image className={styles.header_styled_border2} src='/icons/titleStroke2.svg' alt='titleStroke2' width={102} height={81} />
                    </Typography>
                    <Typography color="text.primary" variant='subHeader1'>
                        Embark on a transformative journey to unparalleled success. Unleash your limitless potential, secure your dream job, and pave the way to a future filled with confidence.
                    </Typography>

                    <HomePageSearch />
                </Grid >
                <Grid md={4} sm={12} xs={12} item xl={4}   >
                    <Grid className={styles.header_image_container}>
                        <Grid display={'flex'} justifyContent="space-between" position={'relative'} >
                            <Image style={{
                                position: 'absolute',
                                left: '-4rem',
                                top: '4rem',
                            }} src='/icons/Spotify.svg' width={52} height={52} alt='Spotify' />
                            <Image className={styles.header_image} style={{
                                zIndex: 1,
                                position: 'relative',
                                top: '-5rem',
                                marginRight: '2rem'
                            }} src='/images/banner-img-4.png' width={187} height={291} alt='banner' />
                            <Image className={styles.header_image} src='/images/banner-img-3.png' width={187} height={291} alt='banner' />

                        </Grid>
                        <Grid display={'flex'} justifyContent="space-between" position={'relative'} item >
                            <Image style={{
                                position: 'absolute',
                                right: '0',
                            }} src='/icons/Slack.svg' width={52} height={52} alt='Slack' />
                            <Image className={styles.header_image} src='/images/banner-img-2.png' width={187} height={291} alt='banner' />
                            <Image className={styles.header_image} style={{
                                position: 'relative',
                                bottom: '-6rem',
                                marginLeft: '2rem'
                            }} src='/images/banner-img-1.png' width={187} height={291} alt='banner' />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </CustomContainer>
    );
};

export default Header;