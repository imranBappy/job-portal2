import { Box, Divider, Grid, useMediaQuery } from '@mui/material';
import CompanyHeader from '../CompanyHeader';
import CountBox from './CountBox';
import { GET_ME } from '@/graphql/auth/authQuery';
import Toaster from '@/common/Toaster';
import { useQuery } from '@apollo/client';
import NewAppliedCandidateList from './NewAppliedCandidateList';

const DashboardComponent = () => {
    const isTabletView = useMediaQuery('(max-width:1020px)');

    const { data } = useQuery(GET_ME, {
        fetchPolicy: 'network-only',
        onError: (err) => {
            Toaster({
                message: err.message,
                type: 'error',
            });
        },
    });

    return (
        <Box>


            <Box sx={{ my: 3.2 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={isTabletView ? 6 : 4}>
                        <CountBox
                            title="Total Candidate"
                            count={data?.me?.company?.totalCandidateCount ?? 0}
                            isEven
                        />
                    </Grid>
                    <Grid item xs={12} md={isTabletView ? 6 : 4}>
                        <CountBox
                            title="Shortlist"
                            count={data?.me?.company?.totalShortlistCount ?? 0}
                        />
                    </Grid>
                    <Grid item xs={12} md={isTabletView ? 6 : 4}>
                        <CountBox
                            title="Pending Application"
                            count={data?.me?.company?.totalPendingCount ?? 0}
                            isEven
                        />
                    </Grid>
                </Grid>
            </Box>
            <NewAppliedCandidateList />
        </Box>
    );
};

export default DashboardComponent;
