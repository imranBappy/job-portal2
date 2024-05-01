import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { CiLocationOn } from 'react-icons/ci';
import Button from '@/components/Common/UI/Button';
import EditBasicInfo from './EditBasicInfo';
import { useQuery } from '@apollo/client';
import fullName from '@/utils/fullName';
import ProfileDescription from './ProfileDescription';
import { GET_ME } from '@/graphql/auth/authQuery';
import { Images } from '@/utils/imagePath';
import handleAddress from '@/utils/handleAddress';
const ProfileCard = ({ }) => {
    const { data, loading, refetch } = useQuery(GET_ME);

    const { firstName, lastName, profession, photoUrl, city, country, bio, company } =
        data?.me?.profile || {};

    const [open, setOpen] = useState(false);

    const handleClone = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };



    return (
        <>
            <EditBasicInfo
                refetch={refetch}
                data={data}
                onClose={handleClone}
                open={open}
            />
            <Box
                style={{
                    width: '100%',
                    border: '1px solid #D6DDEB',
                    padding: '1rem',
                }}
            >
                <Box
                    width={140}
                    height={140}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    borderRadius={'50%'}
                    bgcolor={'primary.main'}
                >
                    <Image
                        style={{
                            borderRadius: '50%',
                        }}
                        src={photoUrl || Images.NO_IMAGE}
                        width={140}
                        height={140}
                        alt="Profile Image"
                    />
                </Box>
                <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    gap={5}
                >
                    <Box
                        mt={3}
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'center'}
                        gap={1}
                    >
                        <Typography variant="h5" color={'text.primary'}>
                            {fullName(firstName, lastName)}
                        </Typography>
                        <Typography color="text.secondary" variant="body1">
                            {profession}
                            <span
                                style={{
                                    color: '#000',
                                }}
                            >
                                {
                                    company?.name ? `at ${company?.name}` : ""
                                }
                            </span>
                        </Typography>

                        <Typography
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                            }}
                            color="text.secondary"
                            variant="body1"
                        >
                            <CiLocationOn fontSize={'1.5rem'} />{' '}
                            <span>{handleAddress(city, country, loading)}</span>
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            onClick={handleOpen}
                            variant="outlined"
                            style={{
                                borderRadius: '0',
                                color: '#4640DE',
                                borderColor: '#4640DE',
                                padding: '0.5rem 1rem',
                                fontSize: '1rem',
                                fontWeight: 600,
                            }}
                        >
                            Edit Profile
                        </Button>
                    </Box>
                </Box>
            </Box>
            <ProfileDescription handleOpen={handleOpen} data={bio} />
        </>
    );
};

export default ProfileCard;
