import { Box, Grid, Hidden } from '@mui/material';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuthWrapperContainer = ({ children, image, imageLayoutRatio, contentLayoutRatio }) => {
    const router = useRouter()

    useEffect(() => {
        let token = Cookies.get('token');
        let userRole = Cookies.get('role');
        if (token && userRole) {
            userRole === 'company' ? router.push('/recruiter') :
                router.push('/candidate')
        }
    }, [])


    return (
        <Grid container>
            <Grid item xs={12} md={contentLayoutRatio ? contentLayoutRatio : 5}>
                <Box sx={{ width: { xs: '85%', md: "70%" }, margin: 'auto' }}>
                    <Link href={'/'}>
                        <Box sx={{ position: 'relative', height: 60, width: 150, marginTop: '33px' }}>
                            <Image
                                style={{ height: "100%", width: "100%" }}
                                layout='fill'
                                src="/icons/logo.svg"
                                alt="random"
                            />
                        </Box>
                    </Link>
                    {children}
                </Box>
            </Grid>
            <Hidden mdDown>
                <Grid item xs={12} md={imageLayoutRatio ? imageLayoutRatio : 7}>
                    <Box
                        sx={{
                            height: '100vh',
                            position: 'sticky',
                            top: 0,
                            width: '100%',
                            overflow: 'hidden',
                        }}
                    >
                        <Image
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                            src={image}
                            alt="random"
                        />
                    </Box>
                </Grid>
            </Hidden>
        </Grid>
    );
};

export default AuthWrapperContainer;

