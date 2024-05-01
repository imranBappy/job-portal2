import { Search } from '@mui/icons-material';
import { Box, Divider, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import React from 'react';
import BlogSearch from './BlogSearch';
import BlogCategories from './BlogCategories';
import RecentPost from './RecentPost';
import BlogRelatedTopics from './BlogRelatedTopics';

const BlogRightSide = ({
    handleCustomSarch
}) => {
    return (
        <Grid item lg={3}  >
            <Box
                px={5}
                display={'flex'}
                flexDirection={'column'}
                gap={5}
            >
                <Box
                    width='100%'
                    display={{
                        xs: 'none',
                        sm: 'none',
                        md: 'none',
                        lg: 'block',
                        xl: 'block',
                    }}
                >
                    <BlogSearch handleCustomSarch={handleCustomSarch} />
                </Box>
                {/* <BlogCategories /> */}
                <Divider />
                <RecentPost />
                <BlogRelatedTopics />
            </Box>
        </Grid>
    );
};

export default BlogRightSide;