import React, { useState } from 'react';


import { useMutation } from '@apollo/client';
import { CREATE_ACCOUNT } from '@/graphql/accout/accountMutation';
import CModal from '@/common/CModal';
import Button from '../Common/UI/Button';
import { Box, Typography } from '@mui/material';
import CTextArea from '../companyProfile/formElement/CTextArea';
import Toaster from '@/common/Toaster';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';


const DeleteAccoutModal = ({ modelState }) => {
    const [open, setOpen] = modelState;
    const [deleteReason, setDeleteReason] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();


    const handleClose = () => {
        setOpen(false);
    }
    const [deleteAcction, { loading }] = useMutation(CREATE_ACCOUNT, {
        onCompleted: (data) => {
            window.location.href = "/"
            Cookies.remove("token")
            Cookies.remove("role")
        },
        onError: (error) => {
            Toaster({
                type: 'error',
                message: error.message,
            });
        }

    });



    const handleDeleteAccount = (deletionReason) => {
        const variables = {
            deletionReason: deletionReason,
        }
        console.log(deletionReason);
        if (!deletionReason) {
            setError('Please enter your reason');
            return; f
        }

        deleteAcction({ variables })
    }

    return (
        <CModal
            title={'Delete Account'}
            onClose={handleClose}
            open={open}
            setOpen={setOpen}
        >
            <Box display={'flex'} flexDirection={'column'} gap={1} p={1}>
                {/* <Typography variant={'h4'}>Delete Account</Typography> */}
                <Typography variant={'bodyNormal'} mt={-4}>
                    Are you sure you want to delete your account?
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        mb: 1,
                    }}
                >
                    <CTextArea
                        placeholder={'Write your reason here...'}
                        name={'deleteReason'}
                        minRow={10}
                        value={deleteReason}
                        onChange={(e) => setDeleteReason(e.target.value)}
                        error={error}
                    />
                </Box>

                <Box display={'flex'} gap={1}>
                    <Button
                        variant={'outlined'}
                        onClick={() => handleDeleteAccount(deleteReason)}
                        disabled={loading}
                    >
                        Delete
                    </Button>
                    <Button
                        color={'primary'}
                        onClick={handleClose}
                        variant={'contained'}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </CModal>
    );
};

export default DeleteAccoutModal;