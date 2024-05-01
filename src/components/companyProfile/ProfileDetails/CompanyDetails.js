import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import ProfileDetailHeader from './ProfileDetailHeader';
import CudCompanyDetail from './CudCompanyDetail';

const CompanyDetails = ({ data, handleEdit }) => {

    return (
        <>
            <ProfileDetailHeader title="Company Details" />
            <Typography varaint="bodyNormal" color="text.grey">{data?.description}</Typography>
            <Divider sx={{ my: 3 }} />
        </>
    );
};

export default CompanyDetails;
