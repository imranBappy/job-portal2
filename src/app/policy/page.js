"use client";

import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { AGREEMENT_QUERY } from '@/graphql/agreement/agreementQuery';
import Loading from '../loading';

const Privicy = () => {
    const { data, loading } = useQuery(AGREEMENT_QUERY, {
        variables: { id: '2' },
    });
    if (loading) return <Loading />;
    const { content } = data.singleAgreement;
    console.log(data);
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

export default Privicy;
