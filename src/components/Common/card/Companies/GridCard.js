"use client"
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import Button from '../../UI/Button';
import { Images } from '@/utils/imagePath';
import Link from 'next/link';
import handleAddress from '@/utils/handleAddress';

const GridCard = (props) => {



    const { name,
        logoUrl,
        city,
        country,
        jobs,
        industry,
        id
    } = props?.data;

    const { style } = props;


    return (
        <>

            <Box
                // {...rest}
                // flexGrow={1}
                sx={{
                    border: "1px solid #D6DDEB",
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.1)',
                    },
                }}
                p={2}
                display="flex"
                justifyContent="space-between"
                style={style}
                flexDirection={'column'}
                position={'relative'}
                flexBasis={280}
            >

                <Box
                    display="flex"
                    alignItems="center"
                    pb={1}
                    mb={1}
                    alignSelf={'center'}
                >
                    <Link
                        style={{
                            textDecoration: 'none',

                        }}
                        href={`/companies/${id}`}
                    >

                        <Image
                            style={{
                                borderRadius: "50%"
                            }}
                            src={logoUrl || Images.NO_IMAGE} width={100} height={100} alt="-" />  </Link>
                </Box>
                <Box

                    flexGrow={1}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"


                >
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        gap={1}
                        alignItems={'center'}
                    >
                        <Link
                            style={{
                                textDecoration: 'none',

                            }}
                            href={`/companies/${id}`}
                        >
                            <Typography variant='h6'
                            >
                                {name}
                            </Typography>
                        </Link>

                        <Typography

                            color="text.secondary" variant='subHeader3'>
                            {
                                handleAddress(city, country)
                            }
                        </Typography>
                    </Box>



                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                        my={1}
                    >
                        <Box display={'flex'} >
                            <Typography color="text.secondary" variant='subHeader2'> Industry Type : </Typography>
                            <Typography variant='subHeader2'> &nbsp; {industry?.name || '-'} </Typography>
                        </Box>
                        <Box display={'flex'}>
                            <Typography color="text.secondary" variant='subHeader2'> Vacancy: &nbsp; </Typography>
                            <Typography variant='subHeader2'> {jobs?.totalCount} </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        width: '100%',
                    }}
                >
                    <Link
                        href={`/companies/${id}`}
                    >
                        <Button


                            fullWidth={true}

                            style={{
                                height: 45,
                                fontSize: '1rem',
                            }} label='View Details' />
                    </Link>

                </Box>

            </Box>
        </>
    );
};

export default GridCard;