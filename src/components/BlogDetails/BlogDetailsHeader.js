"use client"

import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { Images } from '@/utils/imagePath';
import moment from 'moment';
import SocialLink from '../SocialLink/SocialLink';
import fullName from '@/utils/fullName';
const BlogDetailsHeader = ({ blog }) => {
    const author = blog?.author?.profile || {};

    const socialmedialinksSet = author?.socialmedialinksSet?.edges?.map((item) => ({
        id: item?.node?.id,
        name: item?.node?.name,
        urlLink: item?.node?.urlLink,
    }))


    return (
        <Box
            sx={{
                backgroundImage: `url(/images/hero-bg.svg)`,
                width: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
        >
            <Container maxWidth="xl">
                <Box

                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    p={2}
                    height={{
                        xs: '100%',
                        sm: '100%',
                        md: '100%',
                        lg: '350px',
                        xl: '350px',
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            gap: 5,
                            alignItems: 'center',
                            justifyContent: 'space-between',

                        }}

                        flexWrap={{
                            xs: 'wrap',
                            sm: 'wrap',
                            md: 'wrap',
                            lg: 'nowrap',
                            xl: 'nowrap',
                        }}
                    >
                        <Box
                            sx={
                                {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                    justifyContent: 'space-between',
                                }
                            }
                        >
                            <Typography
                                sx={{
                                    color: "#494959",
                                    fontSize: '18px',
                                    fontWeight: 400,
                                }}
                            >
                                {
                                    moment(blog?.createdOn).format('MMM DD, YYYY')
                                }
                            </Typography>
                            <Typography
                                variant='h2'
                                fontSize={{
                                    xs: '1.5rem',
                                    sm: '1.5rem',
                                    md: '1.5rem',
                                    lg: '52px',
                                }}

                            >
                                {
                                    blog?.title || ""
                                }
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                    alignItems: 'center',
                                }}
                            >
                                <Box>
                                    <Image style={{
                                        borderRadius: '50%',
                                    }} src={author?.photoUrl || Images.NO_IMAGE} alt="author" width={64} height={64} />
                                </Box>
                                <Box>
                                    <Typography
                                        color="#0E1412"
                                        fontWeight={600}
                                        fontSize={18}
                                    >
                                        {
                                            fullName(author?.firstName, author?.lastName)
                                        }
                                    </Typography>
                                    <Typography
                                        color="#586863"
                                        textTransform={'capitalize'}
                                        fontWeight={400}
                                        fontSize={16}
                                    >
                                        {
                                            author?.profession || ''
                                        }
                                    </Typography>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                    alignItems: 'center',
                                }}
                            >

                                {
                                    socialmedialinksSet?.map((item, index) => <SocialLink key={index}
                                        name={item.name} urlLink={item.urlLink}
                                    />)
                                }
                                <SocialLink key={'index'}
                                    name={"linkedin"} urlLink={"item.urlLink"}
                                />

                            </Box>
                        </Box>
                        {blog?.thumbnailUrl && <Box>
                            <Image style={{
                                borderRadius: '8px',
                                border: '0.67px solid #0B0B1D',
                            }} src={blog?.thumbnailUrl} alt="author" width={307} height={307} />
                        </Box>
                        }
                    </Box>
                </Box>
            </Container >
        </Box >
    );
};

export default BlogDetailsHeader;