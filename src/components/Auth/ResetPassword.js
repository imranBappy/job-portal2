import Toaster from '@/common/Toaster';
import AuthWrapperContainer from '@/components/Auth/AuthWrapperContainer';
import Button from '@/components/Common/UI/Button';
import CInput from '@/components/companyProfile/formElement/CInput';
import { Images } from '@/utils/imagePath';
import { useMutation } from '@apollo/client';
import { Box, InputAdornment, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { SENT_RESET_PASSWORD_EMAIL } from './graphql/mutation';
import { useRouter } from 'next/navigation';

const ResetPassword = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [error, setError] = useState({});

    const [resetPassword, { loading }] = useMutation(
        SENT_RESET_PASSWORD_EMAIL,
        {
            onCompleted: (res) => {
                Toaster({
                    message: res?.sentPasswordResetEmail?.message,
                    type: 'success',
                });
                router.push(`/forgetPasswordVerifyEmail?email=${email}`);
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

    const handleInputChange = (e) => {
        setEmail(e.target.value);
        setError({ ...error, email: '' });
    };

    const handleResetPassword = () => {
        if (!email) {
            setError({ email: 'This field is required.' });
            return;
        }

        resetPassword({ variables: { email } });
    };

    return (
        <AuthWrapperContainer image={Images.RESET_COVER_BG}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'calc(100vh - 80px)',
                }}
            >
                <Box
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h5" color="text.darkBlue">
                        Reset your password
                    </Typography>
                    <Typography
                        variant="bodySmall"
                        color="text.lightBlue"
                        sx={{ my: 1.5 }}
                    >
                        Enter the email address associated with your account and
                        we will send you a link to reset your password.
                    </Typography>

                    <CInput
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AiOutlineMail fontSize={22} />
                                </InputAdornment>
                            ),
                        }}
                        name="email"
                        placeholder="Email"
                        type="text"
                        value={email}
                        onChange={handleInputChange}
                        error={error?.email}
                    />
                    <Button
                        isLoading={loading}
                        onClick={handleResetPassword}
                        label="Continue"
                        style={{
                            py: 2,
                            my: 3,
                            fontSize: '16px',
                            fontWeight: 700,
                        }}
                    />

                    <Box sx={{ textAlign: 'center' }}>
                        <Typography
                            fontWeight={700}
                            fontSize={14}
                            textTransform={'capitalize'}
                            sx={{ color: 'common.blue' }}
                        >
                            <Link href={'/login'}>Back To Sign In</Link>
                        </Typography>
                    </Box>

                    <Box sx={{ textAlign: 'center', mb: 2, }} mt={5}>
                        <Link href={'/register'}>
                            <Typography
                                sx={{
                                    color: '#0F172A',
                                    fontWeight: 400,
                                    fontSize: 14,
                                }}
                            >
                                Don’t have an account?{' '}
                                <Typography
                                    variant="span"
                                    sx={{ color: 'common.blue', fontWeight: 600 }}
                                >
                                    Sign Up
                                </Typography>
                            </Typography>
                        </Link>
                    </Box>
                </Box>

            </Box>
        </AuthWrapperContainer>
    );
};

export default ResetPassword;
