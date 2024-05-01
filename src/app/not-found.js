import Button from '@/components/Common/UI/Button';
import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';

const NotFound = () => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',

                backgroundImage: 'url(/images/bg-404.svg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100%',
                backgroundPosition: 'center',
                backgroundColor: '#FEF7E3',
            }}
        >

            <Container>
                <Box
                    sx={{
                        width: '100%',
                        height: '100vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    flexWrap={{ xs: 'wrap', md: 'nowrap' }}
                >
                    <Image
                        src="/images/404.svg"
                        width={500}
                        height={500}
                        alt="404"
                    />

                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <Typography maxWidth={500} variant="body1">
                            Sorry, the page you’re looking for doesn’t exist. If
                            you think something is broken, report a porblem
                        </Typography>
                        <Box>
                            <Button href="/" label="Go To Home" />
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default NotFound;
