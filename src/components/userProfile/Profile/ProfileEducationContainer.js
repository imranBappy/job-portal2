"use client";
import React, { useState } from 'react';
import ProfileEducation from './ProfileEducation';
import { Button, Divider } from '@mui/material';
import { EDUCATION_QUERY } from '@/graphql/education/educationQuery';
import { useQuery } from '@apollo/client';
import ProfileCardHeader2 from '../ProfileCardHeader2';
import EditProfileEducation from './EditProfileEducation';
import CircularLoader from '@/components/Loader/CircularLoader';
import NotFound from '@/components/Common/UI/NotFound';
    

const ProfileEducationContainer = () => {

    const [total, setTotal] = React.useState(3);

    const { data, refetch, loading } = useQuery(EDUCATION_QUERY, {
        variables: {
            first: total,
        }
    });

    const [open, setOpen] = React.useState(false);
    const handleClone = () => {
        setOpen(false);

    }

    const handleSeeMore = () => {
        setTotal(data?.educationList?.totalCount)
    }

    const educations = data?.educationList?.edges?.map((item) => item.node);

    const totalCount = data?.educationList?.totalCount;


    return (
        <>
            <ProfileCardHeader2 onOpen={() => setOpen(true)} title="Education" />
            <EditProfileEducation
                refetch={refetch}
                open={open}
                onClose={handleClone}
            />

            {
                loading ? <CircularLoader /> : !totalCount && <NotFound />
            }

            {educations?.map((item, i) => (
                <>
                    <ProfileEducation
                        refetch={refetch}
                        key={item.id}
                        data={item}
                    />
                    {i !== educations.length - 1 && <Divider />}
                </>
            ))}

            {
                (totalCount > 3 && educations?.length < totalCount) && <Button onClick={handleSeeMore}
                    style={{
                        textTransform: 'capitalize'
                    }}
                >
                    {
                        loading ? 'Loading...' : 'See More'
                    }
                </Button>
            }


        </>
    );
};

export default ProfileEducationContainer;
