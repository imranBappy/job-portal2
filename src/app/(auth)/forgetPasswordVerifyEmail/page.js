'use client';
import Toaster from '@/common/Toaster';
import { SENT_RESET_PASSWORD_EMAIL } from '@/components/Auth/graphql/mutation';
import Button from '@/components/Common/UI/Button';
import { useMutation } from '@apollo/client';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

const page = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [resendPasswordEmail] = useMutation(SENT_RESET_PASSWORD_EMAIL, {
        onCompleted: (res) => {
            Toaster({
                message: res?.sentPasswordResetEmail?.message,
                type: 'success',
            });
        },
        onError: (error) => {
            Toaster({
                message: error.message,
                type: 'error',
            });
        },
    });

    const handleResentEmail = () => {
        resendPasswordEmail({
            variables: {
                email: searchParams.get('email'),
            },
        });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 400,
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
                    Verify your Email
                </Typography>

                <Typography variant="bodySmall" color="text.lightBlue">
                    Thank you, check your email for instructions to reset your
                    password
                </Typography>
                <Button
                    onClick={() => router.push('/')}
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

                <Box sx={{ mt: 3 }}>
                    <Typography
                        onClick={handleResentEmail}
                        variant="bodySmall"
                        sx={{ color: 'text.darkBlue', cursor: 'pointer' }}
                    >
                        Don t receive an email?{' '}
                        <Typography
                            sx={{ fontWeight: 700 }}
                            variant="span"
                            color="primary.main"
                        >
                            {' '}
                            Resend
                        </Typography>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default page;
