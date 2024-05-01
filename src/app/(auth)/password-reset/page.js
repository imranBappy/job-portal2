'use client';

import Button from '@/components/Common/UI/Button';
import AuthWrapperContainer from '@/components/Auth/AuthWrapperContainer';
import CInput from '@/components/companyProfile/formElement/CInput';
import { Images } from '@/utils/imagePath';
import { Box, IconButton, InputAdornment, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import {
    AiOutlineEye,
    AiOutlineEyeInvisible,
    AiOutlineLock,
} from 'react-icons/ai';
import { RESET_PASSWORD } from '@/components/Auth/graphql/mutation';
import { useMutation } from '@apollo/client';
import Toaster from '@/common/Toaster';
import { useRouter, useSearchParams } from 'next/navigation';

const page = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState({});
    const [payload, setPayload] = useState({
        password: '',
        confirmPasswowrd: '',
    });

    const [resendPassword, { loading }] = useMutation(RESET_PASSWORD, {
        onCompleted: (res) => {
            Toaster({
                message: res?.passwordResetDone?.message,
                type: 'success',
            });
            router.push('/login');
        },
        onError: (error) => {
            if (error?.graphQLErrors[0]?.extensions?.errors) {
                if (Array.isArray(error?.graphQLErrors[0]?.extensions?.errors)) {
                    Toaster({
                        message: error?.graphQLErrors[0]?.extensions?.errors[0],
                        type: 'error',
                    });
                }
                else {
                    setError(error?.graphQLErrors[0]?.extensions?.errors)
                }
            } else {
                Toaster({
                    message: error.message,
                    type: 'error',
                });
            }
        },
    });

    const handleShowHidePassword = () => {
        setShowPassword(!showPassword);
    };
    const handleShowHideConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setPayload({ ...payload, [name]: value });
        setError({ ...error, [name]: '' });
    };

    const handleSubmit = () => {

        let errorObj = {}

        if (!payload.password) {
            errorObj.password = 'This field is required'
        }

        if (!payload.confirmPasswowrd) {
            errorObj.confirmPasswowrd = 'This field is required'
        }

        if (payload.password && payload.password.length < 8) {
            errorObj.password = 'Your password must have at least 8 characters'
        }

        if ((payload.password && payload.confirmPasswowrd) && payload.password !== payload.confirmPasswowrd) {
            errorObj.confirmPasswowrd = 'Password and confirm password . should be the same.'
        }

        if (Object.keys(errorObj).length > 0) {
            setError(errorObj)
            return
        }


        let payloadVariables = {
            password: payload.password,
            confirmPasswowrd: payload.confirmPasswowrd,
            token: searchParams.get('token'),
            uid: searchParams.get('uid'),
        };

        resendPassword({ variables: payloadVariables });
    };

    return (
        <AuthWrapperContainer image={Images.RESET_COVER_BG}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: 'calc(100vh - 80px)',
                }}
            >
                <Box
                    sx={{
                        height: '90%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Typography mb={2} variant="h5">
                        Create new password
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5,
                        }}
                    >
                        <CInput
                            name="password"
                            placeholder="Enter New Password"
                            error={error?.password}
                            value={payload.password}
                            onChange={handleInputChange}
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AiOutlineLock fontSize={22} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleShowHidePassword}
                                        >
                                            {showPassword ? (
                                                <AiOutlineEye fontSize={25} />
                                            ) : (
                                                <AiOutlineEyeInvisible
                                                    fontSize={25}
                                                />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <CInput
                            value={payload.confirmPasswowrd}
                            name="confirmPasswowrd"
                            onChange={handleInputChange}
                            placeholder="Confirm Your Password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            error={error?.confirmPasswowrd}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AiOutlineLock fontSize={22} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={
                                                handleShowHideConfirmPassword
                                            }
                                        >
                                            {showConfirmPassword ? (
                                                <AiOutlineEye fontSize={25} />
                                            ) : (
                                                <AiOutlineEyeInvisible
                                                    fontSize={25}
                                                />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            isLoading={loading}
                            onClick={handleSubmit}
                            label="Create New Password"
                            style={{
                                py: 2,
                                my: 3,
                                fontSize: '16px',
                                fontWeight: 700,
                            }}
                        />
                    </Box>
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
                </Box>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
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
        </AuthWrapperContainer>
    );
};

export default page;
