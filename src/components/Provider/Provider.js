'use client';

import theme from '@/theme';
import { ThemeProvider } from '@emotion/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { apolloClient } from '@/graphql';
import { ApolloProvider } from '@apollo/client';
import LayoutProvider from '@/components/Layout/LayoutProvider';
import ToastContainerSSR from "@/utils/toast";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Provider = ({ children }) => {
    const router = useRouter()
    useEffect(() => {
        let token = Cookies.get('token');
        let userRole = Cookies.get('role');
        if (token && userRole) {
            userRole === 'company' ? router.push('/recruiter') :
                router.push('/candidate')
        }
    }, [])


    return (
        <>
            <ToastContainerSSR position="bottom-left" />
            <ThemeProvider theme={theme}>
                <ApolloProvider client={apolloClient}>
                    <LayoutProvider>
                        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID} >
                            {children}
                        </GoogleOAuthProvider>
                    </LayoutProvider>
                </ApolloProvider>
            </ThemeProvider>
        </>
    );
};

export default Provider;