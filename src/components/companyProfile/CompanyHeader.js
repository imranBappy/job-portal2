import { Add } from '@mui/icons-material';
import { Box } from '@mui/material';
import Button from '../Common/UI/Button';
import { useRouter } from 'next/navigation';

const CompanyHeader = () => {
    const router = useRouter()

    return (
        <Box display="flex" justifyContent="flex-end" mb={1}>
            <Button
                startIcon={<Add />}
                label="Post a job"
                onClick={() => router.push("/recruiter/post_a_job")}
                style={{
                    borderRadius: 0,
                    bgcolor: 'primary.dark',
                    fontWeight: 500,
                }}
            />
        </Box>
    );
};

export default CompanyHeader;
