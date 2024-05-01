'use client';
import React, { useEffect, useState } from 'react';
import AuthWrapperContainer from './AuthWrapperContainer';
import { Images } from '@/utils/imagePath';
import {
    Box,
    Divider,
    IconButton,
    InputAdornment,
    Typography,
} from '@mui/material';
import Image from 'next/image';
import CInput from '../companyProfile/formElement/CInput';
import { HiOutlineUser } from 'react-icons/hi';
import {
    AiOutlineEye,
    AiOutlineEyeInvisible,
    AiOutlineLock,
} from 'react-icons/ai';
import Link from 'next/link';
import Button from '../Common/UI/Button';
import SocialLogin from './SocialLogin';
import CCheckbox from '../companyProfile/formElement/CheckBox';
import { LOGIN_USER } from '@/graphql/auth/authMutation';
import { useLazyQuery, useMutation } from '@apollo/client';
import Toaster from '@/common/Toaster';
import AccountVerifyModal from './AccountVerifyModal';
import { useRouter, useSearchParams } from 'next/navigation';
import secureLocalStorage from 'react-secure-storage';
import Cookies from "js-cookie"
import { GET_TOTAL_RESUME_COUNT } from '../userProfile/MyResume/graphql/query';


const AccountType = ({ image, name, isActive, onClick }) => {
    return (
        <Box
            onClick={onClick}
            sx={{
                width: '100%',
                py: 1.6,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: isActive ? '#3286C5' : 'transparent',
                borderRadius: 12,
                border: 2,
                borderColor: '#3286C5',
                gap: 1,
                cursor: 'pointer',
            }}
        >
            <Image src={image} alt="candidate icon" />
            <Typography
                variant="bodyNormal"
                sx={{
                    fontWeight: 700,
                    color: isActive ? 'white' : 'text.darkBlue',
                }}
            >
                {name}
            </Typography>
        </Box>
    );
};

const Login = () => {
    const router = useRouter();
    const searchParams = useSearchParams()

    const [error, setError] = useState({});
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [openEmailVerifyModal, setOpenEmailVerifyModal] = useState(false);
    const [accountType, setAccountType] = useState('candidate');
    const [payload, setPayload] = useState({
        email: '',
        password: '',
    });

    const path = searchParams.get('path')

    const [getResumeCount] = useLazyQuery(GET_TOTAL_RESUME_COUNT, {
        onCompleted: ({ resumeList }) => {
            const totalCount = resumeList?.totalCount || 0;
            if (totalCount === 0) {
                router.push("candidate/my_resume?isOpen=true")
            } else {
                router.push("/candidate")
            }
        },
        fetchPolicy: 'no-cache'
    })


    const [userLogin, { loading }] = useMutation(LOGIN_USER, {
        onCompleted: async (res) => {
            let role = res?.userLogin?.user?.role?.toLowerCase()
            if (accountType !== role) {
                Toaster({
                    message: `No ${accountType === "candidate" ? "Candidate" : 'Recruiter'} account exist with this email`,
                    type: 'error',
                });
                return
            }

            Cookies.set("token", res?.userLogin?.accessToken)
            Cookies.set("role", res?.userLogin?.user?.role?.toLowerCase())



            if (path && path !== "undefined") {
                router.push(path)
            } else {
                if (role === 'candidate') {
                    await getResumeCount()
                } else {
                    router.push("/recruiter")
                }
            }

            Toaster({
                message: 'Login successfully!',
                type: 'success',
            });
        },
        onError: (error) => {


            setOpenEmailVerifyModal(
                error?.graphQLErrors[0]?.extensions?.errors?.message ===
                'Account not verified',
            );

            if (error?.graphQLErrors[0]?.extensions?.errors) {
                if (error?.graphQLErrors[0]?.extensions?.errors?.message) {
                    if (
                        error?.graphQLErrors[0]?.extensions?.errors?.message === 'Email does not exist.'
                    ) {
                        setError({
                            ...error,
                            email: error?.graphQLErrors[0]?.extensions?.errors?.message,
                        });
                    }
                    if (
                        error?.graphQLErrors[0]?.extensions?.errors?.message ===
                        'Incorrect Password'
                    ) {
                        setError({
                            ...error,
                            password: error?.graphQLErrors[0]?.extensions?.errors?.message,
                        });
                    }
                    if (
                        error?.graphQLErrors[0]?.extensions?.errors?.message ===
                        'Account not verified'
                    ) {
                        setError({
                            ...error,
                            email: error?.graphQLErrors[0]?.extensions?.errors?.message,
                        });
                    }
                }
            } else {
                Toaster({
                    message: error.message,
                    type: 'error',
                });
            }
        },
    });

    const handleInputChange = (e) => {
        let { name, value } = e.target;

        setPayload({ ...payload, [name]: value });
        setError({ ...error, [name]: '' });
    };

    const handleShowHidePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = () => {
        let errorObj = {}

        if (!payload.email) {
            errorObj.email = 'This field is required.'
        }
        if (!payload.password) {
            errorObj.password = 'This field is required.'
        }

        if (Object.keys(errorObj).length > 0) {
            setError(errorObj)
            return
        }

        if (rememberMe) {
            secureLocalStorage.setItem('email', payload.email);
            secureLocalStorage.setItem('password', payload.password);
            secureLocalStorage.setItem('rememberMe', rememberMe);
        }
        else {
            secureLocalStorage.clear('email');
            secureLocalStorage.clear('password');
            secureLocalStorage.clear('rememberMe');
        }


        userLogin({
            variables: {
                password: payload.password.trim(),
                email: payload.email.toLowerCase()
            }
        });
    };

    const onKeyDown = (ev) => {
        if (ev.key === 'Enter') {

            handleLogin()

            ev.preventDefault();
        }
    };


    useEffect(() => {
        let email = secureLocalStorage.getItem('email');
        let password = secureLocalStorage.getItem('password');
        let rememberMeVal = secureLocalStorage.getItem('rememberMe');

        if (email && password) {
            setRememberMe(rememberMeVal);
            setPayload({
                email: email,
                password: password,
            });
        }
    }, []);

    return (
        <AuthWrapperContainer image={Images.LOGIN_COVER_BG}>
            <Box sx={{ my: { xs: 2, sm: 5 }, }}>
                <Box sx={{ mb: { xs: 0, sm: 3.2 }, }}>
                    <Typography
                        sx={{
                            fontWeight: 800,
                            color: 'text.darkBlue',
                            mb: { xs: 1, sm: 1.5 },
                        }}
                        variant="h5"
                    >
                        Sign In in to your Account
                    </Typography>
                    <Typography
                        sx={{ color: 'text.lightBlue', fontWeight: 500 }}
                        variant="bodySmall"
                    >
                        Welcome back! please enter your detail
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mt: 2.4, mb: 3 }}>
                    <AccountType
                        onClick={() => setAccountType('candidate')}
                        name="Candidate"
                        image={Images.CANDIDATES_ICON_BG}
                        isActive={accountType === 'candidate'}
                    />
                    <AccountType
                        onClick={() => setAccountType('company')}
                        name="Recruiter"
                        image={Images.RECRUITER_ICON_BG}
                        isActive={accountType === 'company'}
                    />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <CInput
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <HiOutlineUser fontSize={22} />
                                </InputAdornment>
                            ),
                        }}
                        value={payload.email}
                        name="email"
                        placeholder="Email"
                        type="text"
                        error={error?.email}
                        onChange={handleInputChange}
                    />
                    <CInput
                        required={{ required: 'Email is passeword' }}
                        value={payload.password}
                        error={error?.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        onKeyDown={onKeyDown}
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

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <CCheckbox
                            value={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                            label="Remember me"
                            labelStyle={{ fontSize: '14px', fontWeight: 600 }}
                        />
                        <Typography
                            variant="bodySmall"
                            sx={{ color: 'common.blue', fontWeight: 700 }}
                        >
                            <Link href={'/forgetPassword'}>
                                Forgot Password?
                            </Link>
                        </Typography>
                    </Box>
                    <Button
                        isLoading={loading}
                        onClick={handleLogin}
                        type="submit"
                        label="Sign In"
                        style={{
                            py: 2,
                            fontSize: '16px',
                            fontWeight: 700,
                            mt: { xs: 0, sm: 2 },
                            width: '100%',
                        }}
                    />
                </Box>
                {accountType === 'candidate' ? (
                    <>
                        <Typography
                            sx={{
                                mt: { xs: 2.5, sm: 4 },
                                fontWeight: 700,
                                fontSize: 14,
                                color: 'text.primary',
                                textAlign: 'center',
                            }}
                        >
                            Don’t have an account?{' '}
                            <Typography variant="span" color="primary.main">
                                <Link href={'/register'}>Sign Up</Link>
                            </Typography>
                        </Typography>

                        <Divider
                            sx={{
                                color: 'text.lightBlue',
                                my: { xs: 3, md: 4 },
                                fontSize: 12,
                            }}
                        >
                            Or sign In with
                        </Divider>

                        <SocialLogin />
                    </>
                ) : <>
                    <Divider sx={{ my: 3 }} />
                    <Link href={'/recruiterForm'}>
                        <Typography
                            fontWeight={700}
                            fontSize={16}
                            color="primary.main"
                            sx={{ textAlign: 'center', textDecoration: 'underline' }}
                        >
                            Become a Recruiter
                        </Typography>
                    </Link></>}

                <Box
                    sx={{
                        my: 3.5,
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Link href="/terms" passHref>
                        <Typography variant="bodyNormal" color="text.darkBlue">
                            Terms & Condition
                        </Typography>
                    </Link>
                    <Link href="/policy" passHref>
                        <Typography variant="bodyNormal" color="text.darkBlue">
                            Privacy Policy
                        </Typography>
                    </Link>
                    <Link href="/faq" passHref>
                        <Typography variant="bodyNormal" color="text.darkBlue">
                            Faq
                        </Typography>
                    </Link>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography
                        variant="bodyNormal"
                        sx={{
                            fontWeight: 500,
                            color: 'text.darkBlue',
                        }}
                    >
                        @ {new Date().getFullYear()} Wright Talent. All Right Reserved.
                    </Typography>
                </Box>
            </Box>
            <AccountVerifyModal
                open={openEmailVerifyModal}
                setOpen={setOpenEmailVerifyModal}
                loginEmail={payload.email}
            />
        </AuthWrapperContainer >
    );
};

export default Login;
