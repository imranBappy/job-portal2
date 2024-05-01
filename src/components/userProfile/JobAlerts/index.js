'use client';
import { Box, Pagination, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DisplayJobs from '@/app/jobAlerts/DisplayJobs';
import { JOB_LIST_QUERY } from '@/graphql/job/jobQuery';
import { useQuery } from '@apollo/client';
import FilterBar from '@/app/(filter)/components/FilterBar';
import handleContent from '@/utils/handleContent';

const JobAlerts = () => {
    const perPage = 12;
    const [layout, setLayout] = useState('grid'); // row
    const [openFilter, setOpenFilter] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [filter, setFilter] = useState('newest');

    const { data } = useQuery(JOB_LIST_QUERY, {
        variables: {
            first: perPage,
            offset: page,
            sortBy: filter,
            isAlert: true,
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
            <FilterBar
                title={'All Jobs'}
                subtitle={`Showing ${data?.jobListFiltered?.jobList?.totalCount || 0} results`}
                setLayout={setLayout}
                openFilter={openFilter}
                handleOpenFilter={handleOpenFilter}
                filterState={[filter, setFilter]}
            />
            {
                handleContent(<DisplayJobs layout={layout} data={jobs} />, loading, error)
            }


            {
                jobs?.length === 0 && (
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
                                count={total}
                                shape="rounded"
                                defaultPage={1}
                                onChange={(e, value) => changePage(value)}
                            />
                        </Stack>
                    </Box>
                )
            }

        </Box>
    );
};

export default JobAlerts;
