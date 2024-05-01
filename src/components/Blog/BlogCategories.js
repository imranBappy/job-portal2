import { BLOG_CATEGORY_QUERY } from '@/graphql/blogCategory/blogCategoryQuery';
import { useQuery } from '@apollo/client';
import { Box, Typography } from '@mui/material';
import React from 'react';

const BlogCategories = () => {

    const { data } = useQuery(BLOG_CATEGORY_QUERY, {
        variables: {
            first: 10,
            offset: 0,
        }
    })
    const categories = data?.allBlogCategories?.edges.map((edge) => edge.node);

    return (
        <Box
            sx={{
                width: '100%',

                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Typography variant='h5'>
                Categories
            </Typography>

            <ul
                style={{
                    paddingLeft: 30,
                    margin: 0,
                    color: '#515B6F',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                }}

            >
                {
                    categories?.map((category, index) => (
                        <li key={category.id}>
                            <Typography variant='subHeader3'>
                                <a href="#">{category?.name}</a>
                            </Typography>
                        </li>
                    ))
                }

            </ul>

        </Box>
    );
};

export default BlogCategories;