"use client"
import { useEffect, useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import BlogHeader from './BlogHeader';
import BlogRightSide from './BlogRightSite';
import BlogLeftSite from './BlogLeftSite';
import { useQuery } from '@apollo/client';
import { BLOG_QUERY } from '@/graphql/news/newsQuery';
import BlogSearch from './BlogSearch';

const BlogContainer = () => {
    const [total, setTotal] = useState(0);
    const perPage = 6;
    const [page, setPage] = useState(0);
    const [custom, setCustom] = useState("")


    const { data, loading, error, refetch } = useQuery(BLOG_QUERY, {
        variables: {
            first: perPage,
            offset: page,
            customSearch: custom,
            blogType: "blog"
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
                blogType: "blog"
            }
        })
    }, [page, refetch]);


    const changePage = (value) => {
        setPage((value - 1) * perPage);
    };


    const handleCustomSarch = (value) => {
        setCustom(value)
        refetch({
            variables: {
                first: perPage,
                offset: page,
                customSearch: value,
            }
        })
    }
    return (
        <>
            <BlogHeader />
            <Container maxWidth="xl">
                <Box
                    display={{
                        xs: 'block',
                        sm: 'block',
                        md: 'block',
                        lg: 'none',
                        xl: 'none',
                    }}
                    p={5}
                >
                    <BlogSearch handleCustomSarch={handleCustomSarch} />
                </Box>
                <Grid container my={4}
                >
                    <BlogLeftSite changePage={changePage} total={total} loading={loading} error={error} blogs={blogs} />
                    <BlogRightSide handleCustomSarch={handleCustomSarch} />
                </Grid>
            </Container >
        </>
    );
};

export default BlogContainer;
