"use client"
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import Button from '../../UI/Button';
import { Images } from '@/utils/imagePath';
import Link from 'next/link';
import handleAddress from '@/utils/handleAddress';

const ColumnCard = (props) => {
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
        <Box
            // {...rest}
            flexGrow={1}

            sx={{
                width: '100%',
                border: "1px solid #D6DDEB",
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.1)',
                },
            }}
            p={3}
            display="flex"
            justifyContent="space-between"
            style={style}
            position={'relative'}
        >


            <Box
                pb={1}
                flexGrow={1}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                gap={1}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    mb={1}
                    alignSelf={'flex-start'}
                >

                    <Link
                        style={{
                            textDecoration: 'none',

                        }}
                        href={`/companies/${id}`}
                    >
                        <Image

                            src={logoUrl || Images.NO_IMAGE}
                            width={80} height={80} alt="-" />  </Link>
                </Box>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'flex-start'}
                    gap={1}

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
                    <Typography color="text.secondary" variant='subHeader3'>
                        {
                            handleAddress(city, country)
                        }
                    </Typography>
                </Box>


                <Box>
                    <Box display={'flex'}>
                        <Typography color="text.secondary" variant='subHeader2'> Industry Type : </Typography>
                        <Typography variant='subHeader2'> &nbsp; {industry?.name || '-'} </Typography>
                    </Box>
                    <Box display={'flex'}>
                        <Typography color="text.secondary" variant='subHeader2'> Vacancy : </Typography>
                        <Typography variant='subHeader2'> {jobs?.totalCount} </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                alignSelf={' flex-end'}
            >
                <Link
                    href={`/companies/${id}`}
                >
                    <Button
                        style={{
                            width: 180,
                            height: 45,
                            fontSize: '1rem',
                        }} label='View Details' /></Link>
            </Box>
        </Box>
    );
};

export default ColumnCard;