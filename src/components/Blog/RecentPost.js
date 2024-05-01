import { Box, Typography } from '@mui/material';
import React from 'react';
import RecentPostCard from './RecentPostCard';
import { useQuery } from '@apollo/client';
import { BLOG_QUERY } from '@/graphql/news/newsQuery';

const RecentPost = () => {
    const { data } = useQuery(BLOG_QUERY, {
        variables: {
            first: 5,
            offset: 0,
            orderBy: "-created_on"
        }
    })
    const blogs = data?.allPosts?.edges.map((edge) => edge.node);



    return (
        <Box
            sx={{
                width: '100%',

                display: 'flex',
                flexDirection: 'column',
                gap: 4,
            }}
        >
            <Typography variant='h5'>
                Recent Post
            </Typography>
            <Box
                display={'flex'}
                flexDirection={'column'}
                gap={2}

            >
                {
                    blogs?.map((item, index) => <RecentPostCard data={item} key={index} />)
                }
            </Box>
        </Box>
    );
};

export default RecentPost;