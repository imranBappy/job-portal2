import { Box, Typography } from '@mui/material';
import ApplicantList from '../ApplicantList';
import moment from 'moment';

const NewAppliedCandidateList = () => {
    const filters = {
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
    }
    return (
        <Box sx={{ border: 2, borderColor: '#D6DDEB' }}>
            <Box sx={{ borderBottom: 2, borderColor: '#D6DDEB', p: 3 }}>
                <Typography fontWeight={600} variant="subHeader1">
                    New Applied Candidate List
                </Typography>
            </Box>

            <Box sx={{ p: 3, }}>
                <ApplicantList hideFilter initialFilter={filters}
                
                />
            </Box>
        </Box>
    );
};

export default NewAppliedCandidateList;
