import React from 'react';
import { Box, Typography } from '@mui/material';
import Button from '@/components/Common/UI/Button';
import { Edit, Email, Phone } from '@mui/icons-material';
import ProfileCardHeader from '../ProfileCardHeader';
import EditBasicInfo from './EditBasicInfo';
import { useQuery } from '@apollo/client';
import { GET_ME } from '@/graphql/auth/authQuery';

const AdditionalDetails = () => {
    const [open, setOpen] = React.useState(false);

    const handleClone = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const { data, refetch } = useQuery(GET_ME);

    const { email } = data?.me || {};
    const { phoneNumber } = data?.me?.profile || {};

    return (
        <>
            <EditBasicInfo refetch={refetch} data={data} onClose={handleClone} open={open} />
            <Box
                style={{
                    width: '100%',
                    border: '1px solid #D6DDEB',
                    padding: '1rem',
                }}
            >
                <ProfileCardHeader
                    onClick={handleOpen}
                    title="Additional Details"
                    hideBtn
                />
                <Box mt={2} display={'flex'} gap={1}>
                    <Box>
                        <Email
                            color="#7C8493"
                            style={{
                                color: '#7C8493',
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography variant="body1" color={'text.secondary'}>
                            Email
                        </Typography>
                        <Typography variant="body1">{email}</Typography>
                    </Box>
                </Box>

                <Box mt={2} display={'flex'} gap={1}>
                    <Box>
                        <Phone
                            style={{
                                color: '#7C8493',
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography variant="body1" color={'text.secondary'}>
                            Phone
                        </Typography>
                        <Typography variant="body1">{phoneNumber}</Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default AdditionalDetails;
