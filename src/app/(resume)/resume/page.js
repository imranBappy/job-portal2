'use client';
import CreateUpdateResume from '@/components/ResumeSection/CreateUpdateResume';
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ResumePage() {
    const router = useRouter()

    useEffect(() => {
        let token = Cookies.get('token');
        let userRole = Cookies.get('role');
        if (!token || !userRole) {
            router.push('/')
        }
    }, [])


    return (
        <CreateUpdateResume />
    );
}
