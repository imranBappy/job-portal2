import { Box, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { JOB_LIST_QUERY } from '@/graphql/job/jobQuery';
import JobCardV2 from '../Common/card/Job/JobCardV2';
import handleContent from '@/utils/handleContent';
import { useQuery } from '@apollo/client';

const SimilarJobs = ({ categoryId }) => {



    const { loading, error, data, } = useQuery(JOB_LIST_QUERY, {
        variables: {
            first: 4,
            offset: 0,
            categoryList: [categoryId],
        },
    });

    const [jobs, setJobs] = useState([])

    useEffect(() => {
        const jobs = data?.jobListFiltered?.jobList?.edges?.map((edge) => edge.node) || []
        setJobs(jobs?.filter(job => job.id !== data?.jobListFiltered?.jobList?.edges[0]?.node?.id))
    }, [data])


    // const jobs = data?.jobListFiltered?.jobList?.edges?.map((edge) => edge.node);



    const content = jobs?.map(job => <JobCardV2 isLatest={true} key={job?.id} job={job} />)


    return (
        <Grid>
            <Box
                display={'flex'}
                justifyContent={'space-between'}
                gap={5}
                flexWrap={'wrap'}
            >
                <Typography variant="h3" mb={2} component="h3">
                    Similar Jobs
                </Typography>
                <Box>
                    <Link
                        href="/jobs"
                        style={{
                            textDecoration: 'none',
                            color: '#0079D1',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 5,
                            justifyContent: 'center'
                        }}
                    >
                        <Typography
                            pt={2}
                            fontSize={'1.4rem'}
                            variant="h5" mb={2} component="p">
                            Show all jobs
                        </Typography>
                        <ArrowRightAltIcon />
                    </Link>
                </Box>
            </Box>

            <Box
                display={'flex'}
                gap={5}
                flexWrap={'wrap'}

                justifyContent={{
                    xs: 'center',
                    sm: 'center',
                    md: 'flex-start',
                    lg: 'flex-start',
                    xl: 'flex-start',
                }}

            >
                {
                    handleContent(
                        content,
                        loading,
                        error,
                    )
                }
            </Box>
        </Grid>
    );
};

export default SimilarJobs;