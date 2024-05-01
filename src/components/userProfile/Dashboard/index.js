"use client"
import { useEffect, useState } from 'react';
import { Box, Divider, Grid } from '@mui/material';
import RecentApplicationsHistory from './RecentApplicationsHistory';
import CountBox from '@/components/companyProfile/Dashboard/CountBox';
import UserHeader from '../UserHeader';
import { useQuery } from '@apollo/client';
import { GET_ME } from '@/graphql/auth/authQuery';

const UserDashboard = () => {
    const { data = {} } = useQuery(GET_ME);

    const [isClient, setIsClient] = useState(false);
    const { firstName, lastName } = data?.me?.profile || {};


    const { shortListed,
        totalApplied,
        totalJobAlert } = data?.me || {};


    useEffect(() => {
        setIsClient(true);
    }, [])

    return (
        <Box>
            {isClient && <UserHeader
                title={`Welcome, ${firstName || ''} ${lastName || ''}`}
                subtitle=""
            />}


            <Divider />

            <Box sx={{ my: 3.2 }}>

                {isClient && <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <CountBox
                            title="Total Jobs Applied"
                            count={totalApplied || 0}
                            isEven
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <CountBox title="Job Alerts" count={totalJobAlert || 0} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <CountBox title="Shortlist" count={shortListed || 0} isEven />
                    </Grid>
                </Grid>}

            </Box>
            <RecentApplicationsHistory />
        </Box>
    );
};

export default UserDashboard;
