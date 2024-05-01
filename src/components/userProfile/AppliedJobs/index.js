import React, { useEffect, useState } from 'react';
import UserProfileJobListHeader from '../UserProfileJobListHeader';
import { Box, Pagination, Stack, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { ALL_APPLIED_JOBS } from '@/graphql/appliedJobs/appliedJobQuery';
import calcluteDate from '@/utils/calcluteDate';
import AppliedJobsRow from './AppliedJobsRow';
import NotFound from '@/components/Common/UI/NotFound';


const AppliedJobs = () => {
    const perPage = 10;
    const [page, setPage] = useState(0);
    const [filter, setFilter] = useState("ALL")
    const [selectedDate, setSelectedDate] = React.useState(3);
    const [total, setTotal] = useState(0);
    const { data, refetch, loading, error } = useQuery(ALL_APPLIED_JOBS, {
        variables: {
            first: perPage,
            offset: page,
            status: filter !== 'ALL' ? filter : null,
            startDate: calcluteDate(selectedDate)
        },
    });


    useEffect(() => {
        refetch({
            variables: {
                first: perPage,
                offset: page,
                status: filter !== 'all_jobs' ? filter : null,
                startDate: calcluteDate(selectedDate)
            },
        })

    }, [filter, refetch, page, selectedDate])

    useEffect(() => {
        if (data?.candidateList?.totalCount) {
            setTotal(Math.ceil(data?.candidateList?.totalCount / perPage));
        }
    }, [data?.candidateList?.totalCount]);





    const jobs = data?.candidateList?.edges.map((edge) => edge.node);

    const content = jobs?.map((job, index) => (
        <AppliedJobsRow index={index} job={job} key={job?.id} />
    ))


    const changePage = (value) => {
        setPage((value - 1) * perPage);
    };

    return (
        <>
            <UserProfileJobListHeader filterDateState={[selectedDate, setSelectedDate]} filterState={[filter, setFilter]} />
            {
                jobs?.length > 0 ? (<Box>   <Box
                        sx={{
                            borderRadius: '10px',

                            mb: 5,
                        }}
                        overflow={{
                            xs: 'scroll',

                            sm: 'scroll',
                            lg: 'hidden',
                        }}
                    >

                        <table
                            style={{
                                width: '100%',
                                borderCollapse: 'collapse',
                                borderSpacing: '0',
                                textAlign: 'left',
                                padding: '1rem',
                                maxHeight: '500px',

                                position: 'relative',
                                minWidth: '100%',
                            }}
                        >
                            <tr
                                style={{
                                    padding: '1rem',
                                    borderBottom: '1px solid #E0E0E0',
                                    minWidth: '100%',
                                }}
                            >
                                <th
                                    style={{
                                        padding: '1rem',
                                        width: '5%',
                                        minWidth: '50px',
                                    }}
                                >
                                    <Typography variant="subHeader3" color="text.secondary">
                                        #
                                    </Typography>
                                </th>
                                <th style={{
                                    padding: '1rem',
                                    width: '5%',
                                    minWidth: '200px',
                                }}>
                                    <Typography variant="subHeader3" color="text.secondary">
                                        Company Name
                                    </Typography>
                                </th>
                                <th style={{
                                    padding: '1rem',
                                    width: '5%',
                                    minWidth: '200px',
                                }}>
                                    <Typography variant="subHeader3"

                                        color="text.secondary">
                                        Job Title
                                    </Typography>
                                </th>
                                <th style={{
                                    padding: '1rem',
                                    width: '5%',
                                    minWidth: '180px',
                                }}>
                                    <Typography variant="subHeader3" color="text.secondary">
                                        Date Applied
                                    </Typography>
                                </th>

                                <th style={{
                                    padding: '1rem',
                                    width: '5%',
                                    minWidth: '200px',
                                }}>
                                    <Typography variant="subHeader3" color="text.secondary">
                                        Status
                                    </Typography>
                                </th>
                            </tr>

                            {
                                content
                            }
                        </table>
                    </Box>



                    {
                        jobs?.length === 0 && <NotFound />
                    }

                    {
                        jobs?.length > 0 && <Box
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
                                    count={total}
                                    shape="rounded"
                                    defaultPage={1}
                                    onChange={(e, value) => changePage(value)}
                                />
                            </Stack>
                        </Box>
                    }
                </Box>) : <NotFound />
            }
        </>
    );
};

export default AppliedJobs;
