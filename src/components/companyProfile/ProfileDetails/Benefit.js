import React from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import ProfileDetailHeader from './ProfileDetailHeader';
import { MdOutlineSettingsRemote } from 'react-icons/md';

const BenefitCard = () => {
    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
            <MdOutlineSettingsRemote
                fontSize={25}
                color={theme.palette.primary.dark}
            />
            <Typography
                fontWeight={600}
                color="text.darkBlue"
                variant="subHeader1"
            >
                Full Healthcare
            </Typography>
            <Typography color="text.darkBlue" variant="bodyNormal">
                We believe in thriving communities and that starts with our team
                being happy and healthy.
            </Typography>
        </Box>
    );
};

const Benefit = () => {
    return (
        <Box>
            <ProfileDetailHeader title="Benefit" showAdd />

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <BenefitCard />
                </Grid>
                <Grid item xs={12} md={4}>
                    <BenefitCard />
                </Grid>
                <Grid item xs={12} md={4}>
                    <BenefitCard />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Benefit;
