'use client';
import React from 'react';
import { Box, Container } from '@mui/material';
import { AGREEMENT_QUERY } from '@/graphql/agreement/agreementQuery';
import { useQuery } from '@apollo/client';
import Loading from '../loading';


const Candition = () => {
    const { data, loading } = useQuery(AGREEMENT_QUERY, {
        variables: { id: '1' },
    });
    if (loading) return <Loading />;
    const { content } = data.singleAgreement;
    return (
        <Container maxWidth="xl">
            <Box
                sx={{
                    my: 5,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 5,
                }}
            >
                <div
                    dangerouslySetInnerHTML={{
                        __html: content,
                    }}
                />

            </Box>
        </Container>
    );
};

export default Candition;
