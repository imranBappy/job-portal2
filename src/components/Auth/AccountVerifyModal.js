import { Images } from '@/utils/imagePath';
import {
    Box,
    Dialog,
    IconButton,
    InputAdornment,
    Typography,
} from '@mui/material';
import Image from 'next/image';
import { AiOutlineMail } from 'react-icons/ai';
import Button from '../Common/UI/Button';
import CInput from '../companyProfile/formElement/CInput';
import { AiOutlineClose } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import Toaster from '@/common/Toaster';
import { RESEND_RESET_PASSWORD_EMAIL } from './graphql/mutation';
import { useMutation } from '@apollo/client';

const AccountVerifyModal = ({ open, setOpen, loginEmail }) => {
    const [email, setEmail] = useState(loginEmail);
    const [error, setError] = useState({});


    const handleClose = () => {
        setOpen(false);
    };

    const [resendVerificationEmail, { loading }] = useMutation(
        RESEND_RESET_PASSWORD_EMAIL,
        {
            onCompleted: (res) => {
                Toaster({
                    message: res?.resendVerificationEmail?.message,
                    type: 'success',
                });
                handleClose();
            },
            onError: (error) => {
                if (error?.graphQLErrors[0]?.extensions?.errors) {
                    setError(error.graphQLErrors[0].extensions.errors);
                } else {
                    Toaster({
                        message: error.message,
                        type: 'error',
                    });
                }
            },
        },
    );

    const handleResendEmail = () => {
        if (!email) {
            setError({ ...error, email: 'This field is required.' });
            return;
        }

        resendVerificationEmail({ variables: { email } });
    };

    useEffect(() => {
        setEmail(loginEmail);
    }, [loginEmail]);

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
                    width: 500,
                    p: 5,
                    height: 'auto',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'relative',
                }}
            >
                <IconButton
                    onClick={handleClose}
                    sx={{
                        height: 35,
                        width: 35,
                        borderRadius: '50%',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        background: 'rgba(0,0,0,0.3)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        '&:hover': {
                            background: 'rgba(0,0,0,0.4)',
                        },
                    }}
                >
                    <AiOutlineClose fontSize={22} color="white" />
                </IconButton>

                <Box sx={{ height: 150, width: 200, mb: 3 }}>
                    <Image
                        src={Images.VERIFY_EMAIL_ICON}
                        alt="verify_email"
                        style={{ height: '100%', width: '100%' }}
                    />
                </Box>
                <Typography
                    variant="h5"
                    sx={{ color: 'text.darkDark', fontWeight: 700 }}
                >
                    Verify Your Email
                </Typography>
                <Typography
                    variant="bodySmall"
                    sx={{ color: 'text.lightBlue', fontWeight: 500, mt: 2 }}
                >
                    Enter the email address associated with your account and we
                    will send you a link to verify your account.
                </Typography>

                <Box
                    sx={{
                        mt: 3,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                    }}
                >
                    <CInput
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError({ ...error, email: '' });
                        }}
                        boxStyle={{ width: '100%' }}
                        placeholder="Email"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AiOutlineMail fontSize={22} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        onClick={handleResendEmail}
                        isLoading={loading}
                        label="Continue"
                        style={{
                            width: '100%',
                            py: 1.5,
                            fontSize: '16px',
                            fontWeight: 700,
                        }}
                    />
                </Box>
            </Box>
        </Dialog>
    );
};

export default AccountVerifyModal;
