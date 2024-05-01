import { Box, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import JobCardV2 from '../Common/card/Job/JobCardV2';
import { COMPANY_JOBS_QUERY } from '@/graphql/company/companyQuery';
import { useQuery } from '@apollo/client';
import handleContent from '@/utils/handleContent';

const LatestJob = ({ companyId }) => {

    const { loading, error, data, } = useQuery(COMPANY_JOBS_QUERY, {
        variables: {
            first: 4,
            offset: 0,
            id: companyId,
        },
    });

    const jobs = data?.singleCompany?.jobs?.edges?.map((edge) => edge.node);

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
                    Latest Job
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
                    md: 'center',
                    lg: 'flex-start',
                    xl: 'flex-start',
                }}
            >
                {
                    handleContent(content, loading, error)
                }
            </Box>
        </Grid>
    );
};

export default LatestJob;