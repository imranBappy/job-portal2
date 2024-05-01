"use client"

import FilterLayout from '@/components/Layout/FilterLayout';
import { JOB_LIST_QUERY } from '@/graphql/job/jobQuery';
import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';

import JobRowCardV2 from '../Common/card/Job/JobRowCardV2';
import JobCardV2 from '../Common/card/Job/JobCardV2';
import JobFilterListContainer from './JobFilterListContainer';
import JobFilterHeader from './JobFilterHeader';
import handleContent from '@/utils/handleContent';
import { Box, Pagination, Stack } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation'

function convertTo2DArray(arr) {
    const newArray = arr.map((item) => {
        return item.split("-")
    })
    return newArray;
}


const Job = () => {
    // layout
    const [layout, setLayout] = useState('grid');

    // filter
    const [openFilter, setOpenFilter] = useState(false)

    // pagination
    const PER_PAGE = 12;
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);

    // jobs
    const [jobs, setJobs] = useState([]); // [job]

    //     // all filtering state
    const [sortBy, setSortBy] = useState(''); // latest, oldest, salary, deadline
    const [custom, setCustom] = useState("")
    const [jobType, setJobType] = useState([]);
    const [JobCategory, setJobCategory] = useState([]);
    const [jobLevel, setJobLevel] = useState([]);
    const [jobSalary, setJobSalary] = useState([]);
    const [jobDateFilter, setJobDateFilter] = useState("");
    const [location, setLocation] = useState("");

    const searchQuery = useSearchParams()
    const router = useRouter()

    const { data, loading, error, refetch } = useQuery(JOB_LIST_QUERY, {
        variables: {
            first: PER_PAGE,
            offset: page,
            sortBy,
            customSearch: custom,
            jobTypeList: jobType,
            jobLevelList: jobLevel,
            categoryList: JobCategory,
            salaryRangeList: convertTo2DArray(jobSalary),
            postDay: jobDateFilter,
            location: location
        },
        fetchPolicy: "no-cache"
    });



    const changePage = (value) => {
        setPage((value - 1) * PER_PAGE);
    };

    useEffect(() => {
        if (data?.jobListFiltered?.jobList?.edges) {
            setJobs(data?.jobListFiltered?.jobList?.edges.map((edge) => edge.node))
        }
    }, [data?.jobListFiltered?.jobList?.edges])


    useEffect(() => {
        refetch({
            variables: {
                first: PER_PAGE,
                offset: page,
                sortBy,
                jobTypeList: jobType,
                jobLevelList: jobLevel,
                categoryList: JobCategory,
                salaryRangeList: convertTo2DArray(jobSalary),
                postDay: jobDateFilter,
                location: location
            }
        })
    }, [page, refetch, sortBy, jobType, jobLevel, JobCategory, jobSalary, jobDateFilter, location])

    useEffect(() => {
        if (data?.jobListFiltered?.jobList?.totalCount) {
            setTotal(Math.ceil(data?.jobListFiltered?.jobList?.totalCount / PER_PAGE));
        }
    }, [data?.jobListFiltered?.jobList?.totalCount]);

    useEffect(() => {
        const catId = (searchQuery.get('categoryId'))
        if (searchQuery?.get('categoryId')) {
            const isExist = JobCategory.find((item) => item === catId)
            if (!isExist) {
                setJobCategory((preState) => [...preState, catId])
                router.replace('/jobs')
            }
        }
        console.log({ catId });
    }, [searchQuery])



    const handleOpenFilter = () => {
        setOpenFilter((pre) => !pre);
    };


    const handleRefetch = () => {



        refetch({
            variables: {
                first: PER_PAGE,
                offset: page,
                sortBy,
                jobTypeList: jobType,
                jobLevelList: jobLevel,
                categoryList: JobCategory,
                salaryRangeList: convertTo2DArray(jobSalary),
                postDay: jobDateFilter,
                location: location
            }
        });
    }


    const handleCustomSarch = (value) => {
        setCustom(value)
        refetch({
            variables: {
                first: PER_PAGE,
                offset: page,
                sortBy,
                customSearch: value,
                jobTypeList: jobType,
                jobLevelList: jobLevel,
                categoryList: JobCategory,
                salaryRangeList: convertTo2DArray(jobSalary),
                postDay: jobDateFilter,
                location: location
            }
        })
    }

    let content = null;

    switch (layout) {
        case 'grid':
            content = jobs?.map((job) => <JobCardV2 handleRefetch={handleRefetch} key={job?.id} job={job} />);
            break;
        default:
            content = jobs?.map((job) => (
                <JobRowCardV2 handleRefetch={handleRefetch} key={job?.id} job={job} />
            ));
    }




    return (
        <FilterLayout
            header={<JobFilterHeader
                filterState={[custom, setCustom]}
                handleSearch={handleCustomSarch}
                locationState={[location, setLocation]}
                title1={'Find your'}
                title2={'Dream Jobs'}
                subtitle={'Find your next career at companies like HubSpot, Nike, and Dropbox'}

            />}
            paginationState={{
                PER_PAGE,
                totalState: [total, setTotal],
                pageState: [page, setPage],
            }}
            filterContainer={<JobFilterListContainer
                jobTypeState={[jobType, setJobType]}
                jobLevelState={[jobLevel, setJobLevel]}
                JobCategoryState={[JobCategory, setJobCategory]}
                jobSalaryState={[jobSalary, setJobSalary]}
                jobDateFilterState={[jobDateFilter, setJobDateFilter]}
                handleOpenFilter={handleOpenFilter}
            />}

            filterBar={{
                filterState: [sortBy, setSortBy],
                title: 'All Jobs',
                subtitle: `Showing ${data?.jobListFiltered?.jobList?.totalCount || 0} results`,
                setLayout: setLayout,
            }}
            totalCount={data?.jobListFiltered?.jobList?.totalCount}
            filterOpenState={[openFilter, setOpenFilter]}
        >
            <>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',

                        flexWrap: 'wrap',
                        gap: '15px',
                    }}

                    justifyContent={{
                        xs: 'center',
                        sm: 'center',
                        md: 'center',
                        lg: 'flex-start',
                        xl: 'flex-start',
                    }}
                >
                    {
                        handleContent(
                            content,
                            loading,
                            error
                        )
                    }
                </Box>
                {
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
                }
            </>
        </FilterLayout>
    );
};

export default Job;