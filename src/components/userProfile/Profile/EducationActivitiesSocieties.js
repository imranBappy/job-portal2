"use client"

import Toaster from '@/common/Toaster';
import ActivitiesList from '@/components/ResumeSection/CreateUpdateResume/ActivitiesList';
import SearchAbleInput from '@/components/ResumeSection/CreateUpdateResume/SearchAbleInput';
import { ALL_EDUCATIONAL_ACTIVITIES } from '@/graphql/resume/resumeQuery';
import { useLazyQuery } from '@apollo/client';
import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';

const EducationActivitiesSocieties = ({ data = {}, setEducation }) => {
    const [activityList, setActivityList] = useState([]);
    const [getActivities] = useLazyQuery(ALL_EDUCATIONAL_ACTIVITIES, {
        onCompleted: (res) => {
            let temp = res?.educationalActivities?.edges?.map(
                (item) => item.node,
            );
            setActivityList(temp);
        },
        nextFetchPolicy: 'network-only',
        notifyOnNetworkStatusChange: true,
        onError: (error) => {
            Toaster({
                type: 'error',
                message: error.message,
            });
        },
    });

    useEffect(() => {
        getActivities()
    }, []);

    const handleAddActivity = (item) => {
        setEducation({ ...data, activities: item });
    };

    return (
        <Grid item xs={12}>
            <Box sx={{ mt: 4 }}>
                <ActivitiesList
                    selectedList={data.activities || []}
                    handleAdd={handleAddActivity}
                    list={activityList || []} />
            </Box>
        </Grid>
    );
};

export default EducationActivitiesSocieties;