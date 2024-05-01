"use client"

import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import ProfileCardHeader from '../ProfileCardHeader';
import EditProfileEducation from './EditProfileEducation';
import handleAddress from '@/utils/handleAddress';
import { activitiesConverter } from '@/utils/converter';
import { useRouter } from 'next/navigation'

const ProfileEducation = ({ data, refetch, ...props }) => {
    const {
        city,
        country,
        subject,
        degree,
        institution,
        endDate,
        startDate,
    } = data;

    const [open, setOpen] = React.useState(false);


    const router = useRouter();

    const handleClone = () => {
        setOpen(false);
        router.push(`/candidate/profile_details`);
    };
    const handleOpen = () => {
        router.push(`/candidate/profile_details?eduId=${data.id}`);
        setOpen(true);
    };

    const [activities, setActivities] = React.useState([]);


    useEffect(() => {
        try {
            setActivities(activitiesConverter(data?.activities));
        } catch (error) {
            setActivities([]);
        }
    }, [data?.activities]);




    return (
        <>
            <EditProfileEducation
                refetch={refetch}
                data={data}
                open={open}
                onClose={handleClone}
            />
            <Box display={'flex'} py={2} gap={5}>
                {/* <Box>
                    <Image
                        style={{
                            borderRadius: '50%',
                        }}
                        src={institution?.logoUrl || '/images/default-image.jpg'}
                        width={80}
                        height={80}
                        alt="Profile Image"
                    />
                </Box> */}
                <Box
                    width={'100%'}
                    display={'flex'}
                    flexDirection={'column'}
                    gap={1}
                >
                    <ProfileCardHeader
                        onClick={handleOpen}
                        title={institution?.name}
                    />
                    <Typography variant="body1" color={'text.secondary'}>
                        {degree}, {subject} . {startDate}-{' '}
                        {endDate ? endDate : 'Present'}
                    </Typography>

                    <Typography variant="body1" color={'text.secondary'}>
                        {
                            handleAddress(city, country)
                        }
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: '#515B6F',
                        }}
                    >
                        {activities?.join(', ') || ''}
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default ProfileEducation;
