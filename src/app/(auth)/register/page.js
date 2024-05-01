'use client';
import Toaster from '@/common/Toaster';
import AuthWrapperContainer from '@/components/Auth/AuthWrapperContainer';
import SocialLogin from '@/components/Auth/SocialLogin';
import Button from '@/components/Common/UI/Button';
import RegistationModal from '@/components/Modal/RegistationModal';
import CInput from '@/components/companyProfile/formElement/CInput';
import CCheckbox from '@/components/companyProfile/formElement/CheckBox';
import { REGISTER_USER } from '@/graphql/auth/authMutation';
import { Images } from '@/utils/imagePath';
import { useMutation } from '@apollo/client';
import {
    Box,
    Divider,
    IconButton,
    InputAdornment,
    Typography
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
    AiOutlineEye,
    AiOutlineEyeInvisible,
    AiOutlineLock,
    AiOutlineMail,
} from 'react-icons/ai';
import { HiOutlineUser } from 'react-icons/hi';

const page = () => {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [inputData, setInputData] = useState({
        firstName: "",
        lastName: "",
        email: '',
        password1: "",
        password2: "",
        isAccept: false,
    });
    const [error, setError] = useState({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleShowHidePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (e) => {
        let { name, value } = e.target;

        setInputData({ ...inputData, [name]: value });
        setError({ ...error, [name]: '' });
    };

    const [userRegistration, { loading }] = useMutation(REGISTER_USER, {
        onCompleted: (res) => {
            // router.push('/send-email');
            setShowSuccessModal(true);
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
    });

    const onSubmit = () => {
        let errorObj = {}

        if (!inputData.firstName) {
            errorObj.firstName = 'This field is required'
        }
        if (!inputData.lastName) {
            errorObj.lastName = 'This field is required'
        }
        if (!inputData.email) {
            errorObj.email = 'This field is required'
        }
        if (!inputData.password1) {
            errorObj.password1 = 'This field is required'
        }
        if (inputData.password1 && inputData.password1.length < 8) {
            errorObj.password1 = 'Your password must have at least 8 characters'
        }
        if (inputData.password1 !== inputData.password2) {
            errorObj.password2 = 'Password does not match'
        }
        if (!inputData.isAccept) {
            errorObj.isAccept = 'This field is required.'
        }
        if (Object.keys(errorObj).length > 0) {
            setError(errorObj)
            return
        }

        userRegistration({
            variables: {
                email: inputData.email.toLowerCase(),
                password1: inputData.password1.trim(),
                password2: inputData.password2.trim(),
                firstName: inputData.firstName.trim(),
                lastName: inputData.lastName.trim(),
            },
        });
    };

    return (
        <AuthWrapperContainer image={Images.LOGIN_COVER_BG}>
            <Box sx={{ my: { xs: 0, sm: 5.4 }, mt: { xs: 3, sm: 4 } }}>
                <Typography
                    variant="h5"
                    sx={{ fontWeight: 800, color: 'text.darkBlue' }}
                >
                    Sign Up for candidate account
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        gap: { xs: 1, sm: 2 },
                        flexDirection: 'column',
                        marginTop: 2,
                    }}
                >
                    <Box
                        display={'flex'}
                        flexDirection={{ xs: "column", sm: 'column', md: 'row' }}
                        gap={1}
                    >
                        <Box
                            flexGrow={1}
                        >
                            <CInput
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <HiOutlineUser fontSize={22} />
                                        </InputAdornment>
                                    ),
                                }}
                                name="firstName"
                                onChange={handleInputChange}
                                value={inputData.firstName}
                                placeholder="First Name"
                                type="text"
                                error={error?.firstName}
                            />
                        </Box>
                        <Box
                            flexGrow={1}
                        >
                            <CInput
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <HiOutlineUser fontSize={22} />
                                        </InputAdornment>
                                    ),
                                }}
                                name="lastName"
                                onChange={handleInputChange}
                                value={inputData.lastName}
                                placeholder="Last Name"
                                type="text"
                                error={error?.lastName}
                            />
                        </Box>
                    </Box>
                    <CInput
                        value={inputData.email}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AiOutlineMail fontSize={22} />
                                </InputAdornment>
                            ),
                        }}
                        name="email"
                        onChange={handleInputChange}
                        placeholder="Email"
                        type="text"
                        error={error?.email}
                    />
                    <CInput
                        value={inputData.password1}
                        placeholder="New Password"
                        error={error?.password1}
                        type={showPassword ? 'text' : 'password'}
                        name="password1"
                        onChange={handleInputChange}
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
                        value={inputData.password2}
                        placeholder="Confirm Password"
                        error={error?.password2}
                        type={showPassword ? 'text' : 'password'}
                        name="password2"
                        onChange={handleInputChange}
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

                    <Divider sx={{ color: 'text.lightBlue', my: 2.5 }}>
                        Or sign up with
                    </Divider>
                    <SocialLogin />

                    <Box
                        sx={{
                            display: 'flex',
                            mt: 3
                        }}
                    >
                        <CCheckbox
                            label={
                                <Typography
                                    sx={{ color: 'text.darkBlue' }}
                                    fontSize={12}
                                >
                                    By creating an account means you agree to
                                    the{' '}
                                    <Link href="/terms">
                                        <Typography variant="span" sx={{ fontWeight: 700, textDecoration: 'underline' }}>
                                            {' '}
                                            Terms & Conditions
                                        </Typography>{' '}
                                    </Link>
                                    and our{' '}
                                    <Link href="/policy">
                                        <Typography sx={{ fontWeight: 700, textDecoration: 'underline' }} variant="span">
                                            Privacy Policy
                                        </Typography>
                                    </Link>
                                </Typography>
                            }
                            error={error?.isAccept}
                            value={inputData.isAccept}
                            onChange={(e) => {
                                setInputData({
                                    ...inputData,
                                    isAccept: e.target.checked,
                                })
                                setError({ ...error, isAccept: "" })
                            }
                            }
                            sx={{ mt: -1 }}
                        />
                    </Box>

                    <Button
                        isLoading={loading}
                        onClick={onSubmit}
                        label="Sign Up"
                        sx={{
                            py: 2,
                            fontSize: '16px',
                            fontWeight: 700,
                            my: { xs: 2, md: 3 },

                        }}
                    />
                </Box>

                <Box sx={{ mt: 1, }}>
                    <Link href={'/login'}>
                        <Typography
                            fontWeight={700}
                            fontSize={14}
                            color="text.primary"
                            textTransform={'capitalize'}
                            sx={{ textAlign: 'center' }}
                        >
                            Already have an account?{' '}
                            <Typography variant="span" color="primary.main">
                                Login
                            </Typography>
                        </Typography>
                    </Link>
                </Box>

            </Box>
            <RegistationModal
                open={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
            />
        </AuthWrapperContainer >

    );
};

export default page;
