import React from 'react';
import { Box, Pagination } from '@mui/material';
import ApplicantList from './ApplicantList';

const AllApplicants = () => {
    return (
        <Box sx={{ mt: 3 }}>
            <ApplicantList
                isShowFilter={true}
                initialFilter={{ first: 10 }} />
        </Box>
    );
};

export default AllApplicants;
