import Button from '@/components/Common/UI/Button';
import { Images } from '@/utils/imagePath';
import { Box, Typography } from '@mui/material';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

const ApplicationsList = ({ item, isEven }) => {
    const color = (status) => {
        if (status === 'PENDING') {
            return '#FFB836';
        } else if (status === 'SELECTED') {
            return '#4640DE';
        } else if (status === 'REJECTED') {
            return '#FF3B3B';
        } else {
            return '#008000';
        }
    };
    return (
        <Box
            sx={{
                minWidth: '721px',
                bgcolor: isEven ? 'primary.extraLight' : '#ffffff',
                p: 3,
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2,
                borderRadius: '8px',
            }}
        >
            <Box
                sx={{
                    minWidth: '350px',

                    display: 'flex',
                    gap: 3,
                    alignItems: 'center',
                }}

            >
                <Box
                    sx={{
                        height: 64,
                        width: 64,
                    }}
                >
                    <Image
                        src={item?.job?.company?.logoUrl || Images.COMPANY_DUMMY_LOGO}
                        alt="company logo"
                        width={64}
                        height={64}
                    />
                </Box>
                <Box>
                    <Link href={`/companies/${item?.job?.company?.id}`}>
                        <Typography
                            sx={{
                                fontWeight: 700,
                                color: 'text.darkBlue',
                            }}
                            variant="bodyLarge"
                        >
                            {
                                item?.job?.company?.name
                            }
                        </Typography>
                    </Link>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            mt: 0.5,
                        }}
                    >
                        <Link href={`/jobs/${item?.job?.id}`}>
                            <Typography
                                sx={{
                                    color: 'text.lightBlue',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    }
                                }}
                                variant="bodyNormal"
                            >
                                {item?.job?.title}
                            </Typography>
                        </Link>
                    </Box>
                </Box>
            </Box>
            <Box>
                <Typography
                    variant="bodyNormal"
                    sx={{ color: 'text.darkBlue', fontWeight: 500 }}
                >
                    Date Applied
                </Typography>
                <Box
                    sx={{
                        minWidth: '150px',
                        mt: 1,
                        color: 'text.secondary',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',

                        gap: 0.5,
                    }}
                >
                    <Typography
                        textAlign={'left'}
                    >{
                            moment(item?.dateCreated).format('DD MMMM YYYY')
                        }</Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    gap: 10,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography
                    sx={{
                        borderWidth: '2px',
                        color: color(item?.status),
                        borderColor: color(item?.status),
                        border: 2,
                        fontWeight: 600,
                        borderRadius: '50px',
                        padding: '0.5rem 1rem',
                    }}
                >{item?.status}</Typography>
                {/* <Button variant="normal">
                    <BiDotsHorizontalRounded fontSize={30} />
                </Button> */}
            </Box>
        </Box>
    );
};

export default ApplicationsList;
