import { Box, Divider, Grid, Pagination, Stack } from '@mui/material';
import React from 'react';
import BlogCard from '../Common/card/Blog/BlogCard';
import handleContent from '@/utils/handleContent';

const BlogLeftSite = (props) => {
    const blogs = props.blogs || [];
    const { loading, error, changePage, total } = props;
    const content = blogs?.map((item) => (<BlogCard key={item.id} blog={{
        ...item,
    }} />))

    return (
        <Grid item lg={9} >
            <Box
                marginBottom={'50px'}
                width={'100%'}
                display={'flex'}

                // flexWrap={{ xs: 'wrap', md: 'wrap', lg: 'wrap' }}
                flexWrap={'wrap'}
                gap={3}
                justifyContent={{
                    xs: 'center',
                    sm: 'center',
                    md: 'center',
                    lg: 'flex-start',
                    xl: 'flex-start',
                }}
            >
                {
                    handleContent(content, loading, error)
                }
            </Box>

            {
                blogs?.length && (
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
                )
            }
        </Grid>
    );
};

export default BlogLeftSite;