import React from 'react';
import { Container, Grid } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

const index = () => {
    return (
        <>
            <Grid width={"100%"} display={'flex'} justifyContent={'space-between'} flexWrap={'wrap'}  >
                <Grid flexGrow={1} width={{
                    xs: '100%',
                    sm: '100%',
                    md: '50%',
                    lg: '50%',
                    xl: '50%',
                }}
                >
                    <Container maxWidth="sm">
                        <Link href={'/'}>
                            <Image style={{ marginTop: 100 }} width={75} height={33} src="/icons/logo.svg" alt="random" />
                        </Link>
                        {children}
                    </Container>
                </Grid>
            </Grid>
        </>
    );
};

export default index;