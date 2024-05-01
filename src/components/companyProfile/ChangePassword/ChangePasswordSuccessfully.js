import React from 'react';
import { Box, Dialog, Typography } from '@mui/material';
import Image from 'next/image';
import { Images } from '@/utils/imagePath';
import Button from '@/components/Common/UI/Button';
import { useRouter } from 'next/navigation';

const ChangePasswordSuccessfully = ({ open, setOpen }) => {
    const router = useRouter();

    const handleClose = () => {
        setOpen(false);
        router.push('/login');
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
            maxWidth={'sm'}
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    width: '100vw',
                    p: 3,
                    height: 'auto',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ height: 150, width: 150, mb: 2 }}>
                    <Image
                        src={Images.SUCCESS_ICON}
                        style={{ height: '100%', width: '100%' }}
                        alt="success"
                    />
                </Box>
                <Typography variant="h3">
                    Password reset successfully
                </Typography>
                <Button
                    onClick={handleClose}
                    label="Login"
                    style={{
                        width: '100%',
                        py: 1,
                        fontSize: '20px',
                        fontWeigth: 700,
                        mt: 3,
                    }}
                />
            </Box>
        </Dialog>
    );
};

export default ChangePasswordSuccessfully;
