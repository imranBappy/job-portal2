import React, { useEffect, useState } from 'react';
import UserProfileJobListHeader from '../UserProfileJobListHeader';
import { Box, Icon, Pagination, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Button from '@/components/Common/UI/Button';
import { Edit, ShowChartOutlined, Visibility } from '@mui/icons-material';
import { JOB_LIST_QUERY } from '@/graphql/job/jobQuery';
import { useQuery } from '@apollo/client';
import moment from 'moment';
const ShortlistedJobs = () => {
    const perPage = 12;
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);

    const { data } = useQuery(JOB_LIST_QUERY, {
        variables: {
            first: perPage,
            offset: page,
        },
    });

    useEffect(() => {
        if (data?.jobListFiltered?.jobList?.totalCount) {
            setTotal(Math.ceil(data?.jobListFiltered?.jobList?.totalCount / perPage));
        }
    }, [data?.jobListFiltered?.jobList?.totalCount]);

    const handleOpenFilter = () => {
        setOpenFilter((pre) => !pre);
    };

    const changePage = (value) => {
        setPage((value - 1) * perPage);
    };
    const jobs = data?.jobListFiltered?.jobList?.edges.map((edge) => edge.node);

    return (
        <Box>
            <UserProfileJobListHeader />
            <table
                style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    borderSpacing: '0',
                    textAlign: 'left',
                    padding: '1rem',
                    maxHeight: '500px',
                    overflow: 'scroll',
                }}
            >
                <tr
                    style={{
                        padding: '1rem',
                        borderBottom: '1px solid #E0E0E0',
                    }}
                >
                    <th
                        style={{
                            padding: '1rem',
                            width: '5%',
                        }}
                    >
                        <Typography variant="subHeader3" color="text.secondary">
                            #
                        </Typography>
                    </th>
                    <th>
                        <Typography variant="subHeader3" color="text.secondary">
                            Company Name
                        </Typography>
                    </th>
                    <th>
                        <Typography variant="subHeader3" color="text.secondary">
                            Roles
                        </Typography>
                    </th>
                    <th>
                        <Typography variant="subHeader3" color="text.secondary">
                            Date Applied
                        </Typography>
                    </th>

                    <th>
                        <Typography variant="subHeader3" color="text.secondary">
                            Action
                        </Typography>
                    </th>
                </tr>
                {jobs?.map((job, index) => (
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
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <Image
                                    src={
                                        job?.company?.logoUrl ||
                                        '/icons/google-login.svg'
                                    }
                                    alt="logo"
                                    width={40}
                                    height={40}
                                />
                                <Typography
                                    variant="subHeader3"
                                    color="text.primary"
                                >
                                    {job?.company?.name}
                                </Typography>
                            </Box>
                        </td>
                        <td>
                            <Typography
                                variant="subHeader3"
                                color="text.primary"
                            >
                                {job?.title}
                            </Typography>
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
                            <Button
                                variant="normal"
                            >
                                <Visibility />
                            </Button>

                        </td>
                    </tr>
                ))}
            </table>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: ' 50px 0',
                }}
            >
                <Stack spacing={2}>
                    <Pagination
                        color="primary"
                        count={1}
                        shape="rounded"
                        defaultPage={1}
                        onChange={(e, value) => console.log(value)}
                    />
                </Stack>
            </Box>
        </Box>
    );
};

export default ShortlistedJobs;
