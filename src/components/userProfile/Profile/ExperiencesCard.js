import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProfileCardHeader from '../ProfileCardHeader';
import EditExperiences from './EditExperiences';
import moment from 'moment';
import handleAddress from '@/utils/handleAddress';
import { useRouter } from 'next/navigation';

const ExperiencesCard = ({ data, refetch, ...props }) => {
    const { name } = data?.company;
    const { country, city } = data;
    const [open, setOpen] = useState(false);
    const [responsibilities, setResponsibilities] = useState([]);
    const router = useRouter();

    const handleClone = () => {
        setOpen(false);
        router.push(`/candidate/profile_details`);
    };
    const handleOpen = () => {
        router.push(`/candidate/profile_details?expId=${data.id}`);
        setOpen(true);
    };



    useEffect(() => {
        try {
            const responsibilities = data?.responsibilities?.edges?.map((item) => item.node?.title);
            setResponsibilities(responsibilities);
        } catch (err) {
            setResponsibilities([]);
        }
    }, [data?.responsibilities?.edges]);



    const jobStartDate = moment(data?.startDate).format('MMM YYYY');
    const jobEndDate = moment(data?.endDate).format('MMM YYYY');







    return (
        <>
            <EditExperiences
                refetch={refetch}
                open={open}
                onClose={handleClone}
            />

            <Box display={'flex'} py={2} gap={5}>
                {/* <Box>
                    <Image
                        style={{
                            borderRadius: '50%',
                        }}
                        src={logoUrl || '/images/default-image.jpg'} // logoUrl ? logoUrl :
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
                        title={data.designation.name}
                    />
                    <Typography variant="body1" color={'text.secondary'}>
                        <span style={{ color: '#000000' }}>{name}</span> .
                        Full-Time . {jobStartDate}- {jobEndDate !== 'Invalid date' ? jobEndDate : 'Present'}
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
                        {
                            responsibilities.join(', ')
                        }
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default ExperiencesCard;
