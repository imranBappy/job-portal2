import React from 'react';
import Modal from '../Common/UI/Modal';
import { useRouter } from 'next/navigation';
import Button from '../Common/UI/Button';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';



const RegistationModal = ({
    open,
    onClose,
}) => {
    const router = useRouter()
    return (
        <Modal
            open={open}
            onClose={onClose}
            style={{
                width: 550,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 480,
                        height: 'auto',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                >
                    <Image
                        src="/images/email-verify.svg"
                        alt="404"
                        width={150}
                        height={130}
                    />

                    <Typography variant="h4" sx={{ fontWeight: 700, my: 2 }}>
                        Account Registered Successfully
                    </Typography>

                    <Typography variant="bodySmall" color="text.lightBlue">
                        Thank you, check verification email has been sent to your email address.
                    </Typography>
                    <Button
                        onClick={() => router.push('/login')}
                        variant="contained"
                        style={{
                            py: 2,
                            fontSize: '17px',
                            mt: 3,
                            width: '100%',
                            fontWeight: 700,
                        }}
                        size="large"
                        label="Continue"
                    />


                </Box>
            </Box>
        </Modal>
    );
};

export default RegistationModal;