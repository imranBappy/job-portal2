"use client"
import Cookies from 'js-cookie'
import { usePathname, useRouter, } from 'next/navigation'
import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import CircularLoader from '../Loader/CircularLoader'
import { Footer } from '@/sections'

const LayoutProvider = ({ children }) => {
    const pathname = usePathname()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    const restrictLayout = ["app", "login", "register", "verify-email", "password-reset", "forgetPasswordVerifyEmail", "forgetPassword", "resume", "candidate", "recruiter", "template", "send-email", "recruiterForm"]
    const restrictAfterLogin = ["login", "register", "verify-email", "password-reset", "forgetPasswordVerifyEmail", "forgetPassword", "send-email", "recruiterForm"]
    const restrictBeforeLogin = ["resume", "candidate", "recruiter", "template", "jobs", "companies"]
    const restrictRouteForCompany = ["resume", "candidate", "template", "jobs", "companies", "blog", "contact_us", "faq", "jobAlerts", "policy", "resume_preview", "resume-templates", "terms"]

    useEffect(() => {
        setIsLoading(true)
        let token = Cookies.get('token');
        let userRole = Cookies.get('role');

        if ((token || userRole) && restrictAfterLogin.includes(pathname.split("/")[1])) {
            userRole === 'company' ? router.push('/recruiter') :
                router.push('/candidate')
        }
        else if ((!token || !userRole) && restrictBeforeLogin.includes(pathname.split("/")[1])) {
            router.push(`/login?path=${pathname}`)
        }
        // else if (userRole === 'company' && restrictRouteForCompany.includes(pathname.split("/")[1])) {
        //     router.push('/recruiter')
        // }
        // else {
        //     router.push('/candidate')
        // }
        setIsLoading(false)
    }, []);

    if (isLoading) {
        return <CircularLoader />
    }


    return (
        <>
            {restrictLayout.includes(pathname.split("/")[1]) ? children : <>
                <Navbar />{children}<Footer />
            </>
            }
        </>
    )
}

export default LayoutProvider