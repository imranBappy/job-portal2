import Toaster from '@/common/Toaster';
import CircularLoader from '@/components/Loader/CircularLoader';
import { GET_ME } from '@/graphql/auth/authQuery';
import { useQuery } from '@apollo/client';
import { Box, Divider, Grid } from '@mui/material';
import CompanyDetails from './CompanyDetails';
import Contact from './Contact';
import DetailHeader from './DetailHeader';
import OfficeLocation from './OfficeLocation';
import Teams from './Team';

const ProfileDetails = () => {
    const { data, loading, refetch } = useQuery(GET_ME, {
        onError: (err) => {
            Toaster({
                message: err.message,
                type: 'error',
            });
        },
    });

    if (loading) {
        return (
            <Box sx={{ height: '80vh' }}>
                <CircularLoader />
            </Box>
        );
    }
    return (
        <Box>

            <DetailHeader data={data?.me?.company} refetch={refetch} userId={data?.me?.id} />
            <Divider sx={{ my: 3 }} />
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <CompanyDetails
                        data={data?.me?.company}
                        refetch={refetch}
                    />
                    <Contact data={data?.me?.company} />
                    <Teams data={data?.me?.company} refetch={refetch} />

                </Grid>
                <Grid item xs={12} md={4}>
                    <OfficeLocation
                        data={data?.me?.company}
                        refetch={refetch}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProfileDetails;
