'use client';

import Toaster from '@/common/Toaster';
import { VERIFY_EMAIL } from '@/components/Auth/graphql/mutation';
import Button from '@/components/Common/UI/Button';
import CircularLoader from '@/components/Loader/CircularLoader';
import { Images } from '@/utils/imagePath';
import { useMutation } from '@apollo/client';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const VerifyEmail = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    let token = searchParams.get('token');

    const [resendPasswordEmail, { loading }] = useMutation(VERIFY_EMAIL, {
        onCompleted: (res) => {
            Toaster({
                message: res?.verificationEmailDone?.message,
                type: 'success',
            });
        },
        onError: (error) => {
            if (error?.graphQLErrors[0]?.extensions?.errors) {
                Toaster({
                    message: error.graphQLErrors[0].extensions.errors?.token,
                    type: 'error',
                });
            } else {
                Toaster({
                    message: error.message,
                    type: 'error',
                });
            }
            router.push('/login');
        },
    });

    useEffect(() => {
        if (token) {
            resendPasswordEmail({
                variables: {
                    token,
                },
            });
        }
    }, [token]);

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {false ? (
                <CircularLoader fontSize={'4rem'} />
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <Box sx={{ height: 250, width: 250 }}>
                        <Image
                            src={Images.VERIFY_SUCCESSFULLY_ICON}
                            alt="verify_successfully"
                            style={{ height: '100%', width: '100%' }}

                        />
                    </Box>
                    <Typography
                        variant="h3"
                        sx={{ fontWeight: 800, color: '#3C4946' }}
                    >
                        Email verify successfully!!
                    </Typography>
                    <Typography
                        variant="bodySmall"
                        sx={{ fontWeight: 500, color: 'text.lightBlue' }}
                    >
                        Thank your for your confirmation
                    </Typography>

                    <Button
                        onClick={() => router.push('/login')}
                        label="Login"
                        style={{
                            width: '100%',
                            fontSize: '16px',
                            py: 1,
                            mt: 1,
                        }}
                    />
                </Box>
            )}
        </Box>
    );
};

export default VerifyEmail;
