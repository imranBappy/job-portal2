"use client"
import Button from '@/components/Common/UI/Button';
import { JOB_LIST_QUERY } from '@/graphql/job/jobQuery';
import { useQuery } from '@apollo/client';
import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import JobCardV2 from '@/components/Common/card/Job/JobCardV2';



const LatestJobs = () => {
    const { data, loading, error } = useQuery(JOB_LIST_QUERY, {
        variables: {
            first: 9,
            offset: 0,
            // sortBy: filter,
        },
    });
    const jobs = data?.jobListFiltered?.jobList?.edges.map((edge) => edge.node);
    if (loading) return <p style={{ width: "100%", textAlign: 'center', margin: 50 }}>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <Container maxWidth='xl'>
            <Grid display={'flex'} mb={10} flexDirection={'column'} alignItems={'center'} justifyContent={'space-between'}  >
                <Typography color="text.primary" textAlign={'center'} mt={10} variant='h2'>
                    Browse Latest Jobs
                </Typography>
                <Typography color="text.blueLight" maxWidth={500} variant='subHeader2' component={'p'} textAlign={'center'} mt={5} >
                    Search and find your dream job is now easier than ever. Just browse a job and apply if you need to.
                </Typography>

            </Grid>

            {/* <JobFilter /> */}

            <Box
                display={'flex'}
                justifyContent={'center'}
                flexWrap={'wrap'}
                gap={5}
            >
                {
                    jobs.map(job => <JobCardV2 isLatest={true} key={job?.id} job={job} />)
                }
            </Box>
            <Grid container mt={5} justifyContent={'center'} alignItems={'center'} >
                <Button
                    href='/jobs'
                    style={{
                        padding: '15px 65px',
                        bgcolor: 'common.blue',
                    }} variant='contained' color='primary' label="Browse All" />
            </Grid>
        </Container>
    );
};
// export async function getServerSideProps(context) {
//     return await apolloClient.query({
//         query: GET_LATEST_JOBS,
//         variables: {
//             first: 6,
//             offset: 0,
//         }
//     });;
// }


export default LatestJobs;