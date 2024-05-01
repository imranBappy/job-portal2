"use client"
import React from 'react';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { Box, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
const Links = () => {
    return (
        <Box>
            <Typography variant="h3" mb={2} component="h3">
                Job Link Share
            </Typography>

            <Box
                width={'100%'}
                display={'flex'}
                alignItems={'center'}
                gap={2}

            >
                <Box
                    bgcolor={'#0079d126'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    borderRadius={10}
                    p={1}
                >
                    <InsertLinkIcon
                        fontSize='small'
                        sx={{
                            color: '#0079D1'
                        }} />
                </Box>


                <Box
                    bgcolor={'#0079d126'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    borderRadius={10}
                    p={1}
                >
                    <GitHubIcon
                        fontSize='small'
                        sx={{
                            color: '#0079D1'
                        }} />
                </Box>

                <Box
                    bgcolor={'#0079d126'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    borderRadius={10}
                    p={1}
                >
                    <FacebookIcon
                        fontSize='small'
                        sx={{
                            color: '#0079D1'
                        }} />
                </Box>

                <Box
                    bgcolor={'#0079d126'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    borderRadius={10}
                    p={1}
                >
                    <LinkedInIcon

                        fontSize='small'
                        sx={{
                            color: '#0079D1'
                        }} />
                </Box>

            </Box>
        </Box >
    );
};

export default Links;