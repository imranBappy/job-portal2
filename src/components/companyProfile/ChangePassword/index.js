import {
    Box,
    Grid,
    IconButton,
    InputAdornment,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import Button from '../../Common/UI/Button';
import CInput from '../formElement/CInput';
import ChangePasswordSuccessfully from './ChangePasswordSuccessfully';
import { CHANGE_PASSWORD_MUTATION } from '@/graphql/auth/authMutation';
import Toaster from '@/common/Toaster';
import { useMutation } from '@apollo/client';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const PasswordShowHideComponent = ({ onClick, isShow }) => {
    return (
        <InputAdornment position="end">
            <IconButton onClick={onClick}>
                {!isShow ? (
                    <AiOutlineEye fontSize={25} />
                ) : (
                    <AiOutlineEyeInvisible fontSize={25} />
                )}
            </IconButton>
        </InputAdornment>
    );
};

const ChangePassword = () => {
    const [payload, setPayload] = useState({
        oldPassword: '',
        newPassword1: '',
        newPassword2: '',
    });
    const [passwordShowHide, setPasswordShowHide] = useState({
        oldPassword: false,
        newPassword1: false,
        newPassword2: false,
    });
    const [passwordResetSuccessfully, setPasswordResetSuccessfully] =
        useState(false);
    const [error, setError] = useState({});

    const [changePassword, { loading }] = useMutation(
        CHANGE_PASSWORD_MUTATION,
        {
            onCompleted: (res) => {
                Toaster({
                    message: res.userPasswordChange.message,
                    type: 'success',
                });
                setPasswordResetSuccessfully(true);
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
        let { name, value } = e.target;

        setPayload({ ...payload, [name]: value });
        setError({ ...error, [name]: '' });
    };

    const handleShowHidePassword = (e, key) => {
        setPasswordShowHide({
            ...passwordShowHide,
            [key]: !passwordShowHide[key],
        });
    };

    const handleChangePassword = () => {

        let errorObj = {}

        if (!payload.oldPassword) {
            errorObj.oldPassword = 'This field is required.'
        }

        if (!payload.newPassword1) {
            errorObj.newPassword1 = 'This field is required.'
        }

        if (payload.newPassword1 && payload.newPassword1.length < 8) {
            errorObj.newPassword1 = 'Minimum 8 characters'
        }

        if (!payload.newPassword2) {
            errorObj.newPassword2 = 'This field is required.'
        }


        if ((payload.newPassword1 && payload.newPassword2) && payload.newPassword1 !== payload.newPassword2) {
            errorObj.newPassword2 = 'New Password and confirm password . should be the same.'
        }

        if (Object.keys(errorObj).length > 0) {
            setError(errorObj)
            return
        }

        changePassword({ variables: payload });
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h6" color="text.darkBlue">
                Password Details
            </Typography>
            <Grid container spacing={3} mt={2}>
                <Grid item xs={12} md={4}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                        }}
                    >
                        <Typography
                            variant="bodyNormal"
                            sx={{ color: 'text.darkBlue', fontWeight: 600 }}
                        >
                            New Password
                        </Typography>
                        <Typography
                            variant="bodyNormal"
                            sx={{ color: 'text.grey' }}
                        >
                            Manage your password to make sure it is safe
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box
                        sx={{
                            width: { xs: "100%", sm: '70%' },
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <Box>
                            <CInput
                                label="Old Password"
                                value={payload.oldPassword}
                                name="oldPassword"
                                onChange={handleInputChange}
                                error={error?.oldPassword}
                                placeholder="Enter your old password"
                                type={
                                    passwordShowHide.oldPassword
                                        ? 'password'
                                        : 'text'
                                }
                                InputProps={{
                                    endAdornment: (
                                        <PasswordShowHideComponent
                                            isShow={
                                                passwordShowHide.oldPassword
                                            }
                                            onClick={(e) =>
                                                handleShowHidePassword(
                                                    e,
                                                    'oldPassword',
                                                )
                                            }
                                        />
                                    ),
                                }}
                            />
                        </Box>
                        <Box>
                            <CInput
                                label="New Password"
                                value={payload.newPassword1}
                                name="newPassword1"
                                onChange={handleInputChange}
                                error={error?.newPassword1}
                                placeholder="Minimum 8 characters"
                                type={
                                    passwordShowHide.newPassword1
                                        ? 'password'
                                        : 'text'
                                }
                                InputProps={{
                                    endAdornment: (
                                        <PasswordShowHideComponent
                                            isShow={
                                                passwordShowHide.newPassword1
                                            }
                                            onClick={(e) =>
                                                handleShowHidePassword(
                                                    e,
                                                    'newPassword1',
                                                )
                                            }
                                        />
                                    ),
                                }}
                            />
                        </Box>

                        <CInput
                            label="Confirm Password"
                            value={payload.newPassword2}
                            name="newPassword2"
                            onChange={handleInputChange}
                            error={error?.newPassword2}
                            placeholder="Minimum 8 characters"
                            type={
                                passwordShowHide.newPassword2
                                    ? 'password'
                                    : 'text'
                            }
                            InputProps={{
                                endAdornment: (
                                    <PasswordShowHideComponent
                                        isShow={passwordShowHide.newPassword2}
                                        onClick={(e) =>
                                            handleShowHidePassword(
                                                e,
                                                'newPassword2',
                                            )
                                        }
                                    />
                                ),
                            }}
                        />

                        <Box>
                            <Button
                                onClick={handleChangePassword}
                                isLoading={loading}
                                label="Change Password"
                                style={{
                                    fontWeight: 700,
                                    py: 1,
                                    px: 2,
                                    fontSize: '16px',
                                    marginTop: "10px"
                                }}
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <ChangePasswordSuccessfully
                open={passwordResetSuccessfully}
                setOpen={setPasswordResetSuccessfully}
            />
        </Box>
    );
};

export default ChangePassword;
