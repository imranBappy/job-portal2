import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const BlogRelatedTopics = () => {
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
                Related Topics
            </Typography>

            <Box width={'100%'} display={'flex'} gap={2} flexWrap={'wrap'}>
                {[
                    'Project Management',
                    'Copywriting',

                    'Social Media Marketing',
                    'English',
                    'Copy Editing'
                ]?.map((item) => (
                    // <Link key={item} href={'#'}>
                        <Box key={item}  bgcolor={'#0079d126'} py={1} px={2} >
                            <Typography fontWeight={400} color="primary">{item}</Typography>
                        </Box>
                    // </Link>
                ))}
            </Box>

        </Box>
    );
};

export default BlogRelatedTopics;