"use client"
import React, { useEffect, useState } from 'react';
import CareerAdviceHeader from './CareerAdviceHeader';
import { Box, Container, Pagination, Stack } from '@mui/material';
import { useQuery } from '@apollo/client';
import { BLOG_QUERY } from '@/graphql/news/newsQuery';
import BlogCard from '../Common/card/Blog/BlogCard';

const CareerAdvice = () => {
    const [total, setTotal] = useState(0);
    const perPage = 6;
    const [page, setPage] = useState(0);

    const { data, refetch } = useQuery(BLOG_QUERY, {
        variables: {
            first: perPage,
            offset: page,
            blogType: "career"
        }
    })
    const blogs = data?.allPosts?.edges.map((edge) => edge.node);

    useEffect(() => {
        if (data?.allPosts?.totalCount) {
            setTotal(Math.ceil(data?.allPosts?.totalCount / perPage));
        }
    }, [data?.allPosts?.totalCount]);

    useEffect(() => {
        refetch({
            variables: {
                first: perPage,
                offset: page,
            }
        })
    }, [page, refetch]);




    const changePage = (value) => {
        setPage((value - 1) * perPage);
    };
    return (
        <>
            <CareerAdviceHeader />

            <Container maxWidth="xl"  >
                <Box

                    my={5}
                    width={'100%'}
                    display={'flex'}
                    flexWrap={{ xs: 'wrap', md: 'wrap', lg: 'nowrap' }}
                    gap={5}
                    justifyContent={{
                        xs: 'center',
                        sm: 'center',
                        md: 'center',
                        lg: 'space-between',
                        xl: 'start',

                    }}
                >
                    {
                        blogs?.map((item) => (<BlogCard key={item.id} blog={{
                            ...item,
                        }} />))
                    }


                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: ' 50px 0',
                    }}
                >
                    <Stack spacing={2}>
                        <Pagination
                            color="primary"
                            count={total}
                            shape="rounded"
                            defaultPage={1}
                            onChange={(e, value) => changePage(value)}
                        />
                    </Stack>
                </Box>
            </Container>
        </>
    );
};

export default CareerAdvice;