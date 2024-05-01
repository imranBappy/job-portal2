"use client"

import { Button, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import Cookies from "js-cookie"
import { useGoogleLogin } from '@react-oauth/google';
import { useLazyQuery, useMutation } from '@apollo/client';
import { SOCIAL_LOGIN } from '../graphql/mutation';
import { useRouter, useSearchParams } from 'next/navigation';
import { GET_TOTAL_RESUME_COUNT } from '@/components/userProfile/MyResume/graphql/query';


const Google = ({ }) => {
    const router = useRouter();
    const searchParams = useSearchParams()
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
        onCompleted: async ({ userSocialLogin }) => {
            const token = userSocialLogin?.accessToken || '';
            const role = userSocialLogin?.user?.role || '';
            Cookies.set("token", token)
            Cookies.set("role", role)

            await getResumeCount()

        },
        onError: (err) => {
            console.log({ err })
        }
    })

    const login = useGoogleLogin({
        onSuccess: ({ access_token }) => {
            socialLogin({
                variables: {
                    socialType: 'google',
                    token: access_token
                }
            })

        },
    })



    return (

        <>
            <Button
                onClick={login}
                sx={{
                    py: 1.5,
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
                    src="/icons/google-login.svg"
                />
                <Typography
                    ml={1}
                    fontWeight={700}
                    color={'black'}
                    fontSize={16}
                    textTransform={'capitalize'}
                >
                    Google
                </Typography>
            </Button>

        </>
    );
};

export default Google;
