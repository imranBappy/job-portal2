"use client"
import { Box, Typography } from '@mui/material';
import React from 'react';

import SocialLink from '@/components/SocialLink/SocialLink';
const About = ({ details, links, totalApplicant, vacancy }) => {
    return (
        <Box>
            <Typography variant="h3" mb={2} component="h3">
                Company Overview
            </Typography>


            <Box mt={3} display={'flex'} flexDirection={'column'} gap={2}>
                {details.map((detail, index) => (
                    <Box
                        key={index}
                        display={'flex'}
                        justifyContent={'space-between'}
                        gap={2}
                    >
                        <Typography
                            color="text.secondary"
                            variant="body1"
                            component="p"
                        >
                            {detail.name}
                        </Typography>
                        {
                            detail.name === 'Social Media' ? <>
                                <Box
                                    display={'flex'}
                                    alignItems={'center'}
                                    gap={2}
                                    alignContent={'flex-start'}
                                >
                                    {
                                        links?.map((link, index) => <SocialLink key={index} name={link.name}
                                            urlLink={link.urlLink}
                                        />)
                                    }


                                </Box>
                            </> : <Typography
                                color="text.secondary"
                                variant="body1"
                                component="p"
                            >
                                {detail.value || "-"}
                            </Typography>
                        }

                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default About;