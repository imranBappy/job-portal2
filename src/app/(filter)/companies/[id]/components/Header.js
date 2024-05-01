import Button from '@/components/Common/UI/Button';
import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import ShareIcon from '@mui/icons-material/Share';
import Image from 'next/image';

const Header = ({ data = {}, setOpen }) => {
    const {
        company: { logoUrl, name } = {},
        title,
        jobType,
    } = data;
    return (
        <Box
            sx={{
                backgroundImage: `url(/images/hero-bg.svg)`,
                width: '100%',
                height: '300px',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
        >
            <Container maxWidth="xl">
                <Box
                    height={300}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}

                // flexDirection={'column'}
                >
                    <Box
                        sx={{
                            width: '100%',
                            minHeight: 120,
                        }}
                        display={'flex'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        bgcolor={'#fff'}
                        p={3}
                        border={'1px solid #D6DDEB'}
                        flexDirection={{
                            xs: 'column',
                            sm: 'column',
                            md: 'column',
                            lg: 'row',
                            xl: 'row',
                        }}
                        gap={2}
                    >
                        <Box
                            display={'flex'}
                            gap={3}
                            alignItems={'center'}
                            justifyContent={'center'}
                        >
                            <Image
                                alt="-"
                                src={logoUrl || '/icons/uihut.svg'}
                                width={80}
                                height={80}
                            />
                            <Box
                                sx={{
                                    height: 120,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                }}
                                gap={0.3}
                            >
                                <Typography variant="h3" component="h1">
                                    {title}
                                </Typography>
                                <Box display={'flex'} gap={1}>
                                    <Typography
                                        variant="body1"
                                        component="p"
                                        color="primary"
                                    >
                                        {name}
                                    </Typography>
                                    <Typography
                                        color="text.secondary"
                                        variant="body1"
                                        component="p"
                                    >
                                        . {data?.designation?.name}
                                    </Typography>
                                    <Typography
                                        color="text.secondary"
                                        variant="body1"
                                        component="p"
                                    >
                                        . {jobType}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box
                            display={'flex'}
                            gap={3}
                            alignItems={'center'}
                            justifyContent={'center'}
                        >
                            <Box
                                sx={{
                                    borderRight: '1px solid #D6DDEB',
                                }}
                                pr={5}
                            >
                                <ShareIcon
                                    color="text.secondary"
                                    width={32}
                                    height={32}
                                />
                            </Box>
                            <Button
                                onClick={() => setOpen(true)}
                                style={{
                                    width: '243px',
                                    height: '57px',
                                    fontSize: '18px',
                                    fontWeight: '700',
                                }}
                                label="Apply"
                            />
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Header;
