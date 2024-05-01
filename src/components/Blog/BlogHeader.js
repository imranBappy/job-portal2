import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';

const BlogHeader = () => {

    return (
        <Box
            sx={{
                backgroundImage: `url(/images/hero-bg.svg)`,
                maxWidth: '100%',
                height: '200px',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',

            }}
        >
            <Container maxWidth="md">
                <Box
                    height={200}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}

                >
                    <Typography
                        variant='h2'
                        color="primary"
                        style={{
                            position: 'relative'
                        }}
                    >
                        Blog
                        <Image
                            style={{
                                position: 'absolute',
                                bottom: -30,
                                left: 0
                            }}

                            src="/icons/styled_border.svg" width={100} height={50} alt='border' />
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default BlogHeader;
