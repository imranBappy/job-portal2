"use client"
import React from 'react';
import { Box, Typography } from '@mui/material';
import SocialLink from '@/components/SocialLink/SocialLink';
import { Link } from '@mui/icons-material';
import Toaster from '@/common/Toaster';
const Links = ({ job }) => {

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${job?.id}`)
        Toaster({
            type: 'success',
            message: 'Copied to clipboard'
        })
    }

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
                <SocialLink
                    name={'facebook'}
                    urlLink={`${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${job?.id}`}
                    isShare={true}
                />

                <SocialLink
                    name={'linkedin'}
                    urlLink={`${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${job?.id}`}
                    isShare={true}
                />
                <SocialLink
                    name={'twitter'}
                    urlLink={`${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${job?.id}`}
                    isShare={true}
                />

                <a
                    onClick={handleCopyLink}
                    style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: "#0079D110",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <Link
                        style={{
                            fontSize: 18,
                        }}
                        color="primary"
                    />
                </a>



            </Box>
        </Box >
    );
};

export default Links;