"use client";

import { Button, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import { useRouter, useSearchParams } from 'next/navigation'
import { SOCIAL_LOGIN } from '../graphql/mutation';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_TOTAL_RESUME_COUNT } from '@/components/userProfile/MyResume/graphql/query';
import Cookies from 'js-cookie';


const Linkedin = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const path = searchParams.get('path')

    const [getResumeCount] = useLazyQuery(GET_TOTAL_RESUME_COUNT, {
        onCompleted: ({ resumeList }) => {
            const totalCount = resumeList?.totalCount || 0;
            if (path && path !== "undefined") {
                router.push(path)
            } else {
                if (totalCount === 0) {
                    router.push("candidate/my_resume?isOpen=true")
                } else {
                    router.push("/candidate")
                }
            }
        },
        fetchPolicy: 'no-cache'
    })

    const [socialLogin] = useMutation(SOCIAL_LOGIN, {
        onCompleted: async ({ userSocialLogin, ...rest }) => {
            const token = userSocialLogin?.accessToken || '';
            Cookies.set("token", token)
            Cookies.set("role", 'CANDIDATE')
            await getResumeCount()
        },
        onError: (err) => {
            console.log({ err })
        }
    })

    const { linkedInLogin } = useLinkedIn({
        clientId: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID,
        redirectUri: `https://resume-maker-swart.vercel.app/login`,
        scope: "openid profile email",
    });

    const linkedInCode = searchParams.get('code')
    useEffect(() => {
        if (linkedInCode) {
            socialLogin({
                variables: {
                    socialType: 'linkedin',
                    token: linkedInCode
                }
            })
        }
    }, [linkedInCode]);


    return (
        <>
            <Button
                onClick={linkedInLogin}
                sx={{
                    py: { xs: 1.5, sm: 2 },
                    px: 5,
                    borderRadius: 50,
                    borderColor: '#E2E8F0',
                    width: '100%',
                }}
                variant="outlined"

            >
                <Image
                    alt="-"
                    width={20}
                    height={20}
                    src="/icons/linkedin-login.svg"
                />
                <Typography
                    ml={1}
                    fontWeight={700}
                    color={'black'}
                    fontSize={16}
                    textTransform={'capitalize'}
                >
                    Linkedin
                </Typography>
            </Button>
        </>
    );
};

export default Linkedin;
