import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import { Images } from '@/utils/imagePath';

const Header = ({ data = {} }) => {
    const {
        logoUrl, name
    } = data;


    return (
        <Box
            sx={{
                backgroundImage: `url(/images/hero-bg.svg)`,
                maxWidth: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',

            }}

            height={{
                xs: 600,
                sm: '600',
                md: 500,
                lg: 300,
                xl: 300,
            }}
        >
            <Container maxWidth="xl">
                <Box
                    height={{
                        xs: 600,
                        sm: '600',
                        md: 500,
                        lg: 300,
                        xl: 300,
                    }}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}

                >
                    <Box
                        sx={{
                            minHeight: 200,
                            maxWidth: 1100

                        }}


                        display={'flex'}
                        justifyContent={'space-between'}
                        alignItems={'center'}

                        p={3}
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
                            width={'100%'}
                            display={'flex'}
                            gap={{
                                xs: 10,
                                sm: 10,
                                md: 0,
                                lg: 5,
                                xl: 5,
                            }}
                            alignItems={'center'}
                            justifyContent={'space-between'}
                            flexWrap={'wrap'}
                        >
                            <Box

                                width={{
                                    xs: '100%',
                                    sm: '100%',
                                    md: '100%',
                                    lg: 172,
                                    xl: 172,
                                }}
                                display={{
                                    xs: 'flex',
                                    sm: 'flex',
                                    md: 'block',
                                    lg: 'block',
                                    xl: 'block',
                                }}
                                alignItems={'center'}
                                justifyContent={'center'}
                            >
                                <Image
                                    alt="Logo"
                                    src={logoUrl || Images.NO_IMAGE}
                                    width={172}
                                    height={172}

                                />
                            </Box>
                            <Box
                                sx={{
                                    height: 120,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                }}
                                gap={1}
                            >
                                <Box
                                    style={{
                                        display: 'flex',
                                        gap: 10
                                    }}
                                >
                                    <Typography variant="h3"

                                        fontSize={{
                                            xs: '1.5rem',
                                            sm: '1.5rem',
                                            md: '2rem'
                                        }}

                                        component="h1">
                                        {name}
                                    </Typography>
                                    <Typography
                                        style={{
                                            border: '1px solid #017EF3',
                                            padding: '6px 12px',
                                            color: "#017EF3",
                                            fontSize: '16px'
                                        }}
                                    >
                                        {data?.totalVacancy || 0} Jobs
                                    </Typography>
                                </Box>
                                <Box display={'flex'} gap={0.5}>

                                    <a href={data?.website} target='blank'>
                                        <Typography
                                            variant="body1"
                                            component="p"
                                            color="primary"
                                        >
                                            {data?.website}
                                        </Typography>
                                    </a>

                                </Box>
                                <Box
                                    display={'flex'}
                                    justifyContent={'space-between'}
                                    gap={5}
                                    flexWrap={'wrap'}

                                >
                                    <Box
                                        display={'flex'}
                                        gap={2}
                                        alignItems={'center'}
                                    >
                                        <Box

                                            sx={{
                                                borderRadius: "50%",
                                                bgcolor: "#fff",
                                                padding: '10px'
                                            }}
                                        >
                                            <Image alt='icon' width={24} height={24}
                                                src={'/icons/company_header_0.svg'}

                                            />
                                        </Box>
                                        <Box>
                                            <Typography
                                                variant='body1'
                                                mb={1}
                                            >
                                                Founded
                                            </Typography>
                                            <Typography
                                                variant='h6'
                                            >
                                                {
                                                    data.foundedDate ? moment(data.foundedDate).format('DD MMM YYYY') : '-'
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box
                                        display={'flex'}
                                        gap={2}
                                        alignItems={'center'}
                                        flexWrap={'wrap'}
                                    >
                                        <Box

                                            sx={{
                                                borderRadius: "50%",
                                                bgcolor: "#fff",
                                                padding: '10px'
                                            }}
                                        >
                                            <Image alt='icon' width={24} height={24}
                                                src={'/icons/company_header_1.svg'}
                                            />
                                        </Box>
                                        <Box>
                                            <Typography
                                                variant='body1'
                                                mb={1}
                                            >
                                                Employees
                                            </Typography>
                                            <Typography
                                                variant='h6'
                                            >
                                                {data?.employeesCount || '0'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box
                                        display={'flex'}
                                        gap={2}
                                        alignItems={'center'}
                                    >
                                        <Box

                                            sx={{
                                                borderRadius: "50%",
                                                bgcolor: "#fff",
                                                padding: '10px'
                                            }}
                                        >
                                            <Image alt='icon' width={24} height={24}
                                                src={'/icons/company_header_2.svg'}
                                            />
                                        </Box>
                                        <Box>
                                            <Typography
                                                variant='body1'
                                                mb={1}
                                            >
                                                Location
                                            </Typography>
                                            <Typography
                                                variant='h6'
                                            >
                                                {
                                                    (data?.city || data?.country) ? `${data?.city}, ${data?.country}` : '-'
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box
                                        display={'flex'}
                                        gap={2}
                                        alignItems={'center'}
                                    >
                                        <Box

                                            sx={{
                                                borderRadius: "50%",
                                                bgcolor: "#fff",
                                                padding: '10px'
                                            }}
                                        >
                                            <Image alt='icon' width={24} height={24}
                                                src={'/icons/company_header_3.svg'}
                                            />
                                        </Box>
                                        <Box>
                                            <Typography
                                                variant='body1'
                                                mb={1}
                                            >
                                                Industry
                                            </Typography>
                                            <Typography
                                                variant='h6'
                                            >
                                                {data?.industry?.name || '-'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>


                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Header;
