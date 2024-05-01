import React from 'react';
import BlogDetailsHeader from './BlogDetailsHeader';
import { Box, Container, Typography } from '@mui/material';

const BlogDetails = ({ blog }) => {

    return (
        <>
            <BlogDetailsHeader blog={blog} />

            <Container maxWidth="xl">
                <Box
                    py={8}
                >
                    <Typography variant='subHeader2' color="#494959" >
                        <div
                            dangerouslySetInnerHTML={{
                                __html: blog?.content,
                            }}
                        />
                    </Typography>

                </Box>
            </Container>
        </>
    );
};

export default BlogDetails;