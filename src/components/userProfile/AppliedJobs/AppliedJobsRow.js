import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';
import { Images } from '@/utils/imagePath';
import React from 'react';
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
const AppliedJobsRow = ({ job, index }) => {

    return (
        <tr
            key={job?.id}
            style={{
                background: index % 2 === 0 ? '#F8F8FD' : '#fff',
                padding: '1.5rem',
            }}
        >
            <td
                style={{
                    padding: '1.5rem',
                    textAlign: 'left',
                    width: '5%',
                }}
            >
                <Typography
                    variant="subHeader3"
                    color="text.primary"
                >
                    {index + 1}
                </Typography>
            </td>
            <td>
                <Link href={`/companies/${job?.job?.company?.id}`} >

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >

                        <Image
                            src={
                                job?.job?.company?.logoUrl ||
                                Images.NO_IMAGE
                            }
                            alt="logo"
                            width={40}
                            height={40}
                        />
                        <Typography
                            sx={{
                                fontWeight: 600,
                                color: '#0079D1',
                            }}
                            variant="subHeader3"
                            color="text.primary"
                        >
                            {job?.job?.company?.name}
                        </Typography>
                    </Box>
                </Link>
            </td>
            <td>
                <Link href={`/jobs/${job?.job?.id}`} >
                    <Typography
                        sx={{
                            fontWeight: 600,
                            color: '#0079D1',
                        }}
                        variant="subHeader3"
                        color="text.primary"
                    >
                        {job?.job?.title}
                    </Typography>
                </Link>
            </td>
            <td>
                <Typography
                    variant="subHeader3"
                    color="text.primary"
                >
                    {
                        moment(job?.dateCreated).format('DD MMMM YYYY')
                    }
                </Typography>
            </td>

            <td>
                <Typography
                    sx={{
                        width: 'fit-content',
                        borderWidth: '2px',
                        color: color(job?.status),
                        borderColor: color(job?.status),
                        border: 2,
                        fontWeight: 600,
                        borderRadius: '50px',
                        padding: '0.5rem 1rem',
                    }}
                >{job?.status}</Typography>


            </td>
        </tr>
    );
};

export default AppliedJobsRow;