"use client"

import CustomContainer from '@/common/CustomContainer'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material'
import Cookies from "js-cookie"
import Image from "next/image"
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Button from '../Common/UI/Button'
import DropDownNavMenu from './DropDownNavMenu'
import UserProfileInfo from './UserProfileInfo'
import "./style.css"

const RESUME_LIST = [
    {
        name: "Create a Resume",
        link: "/resume",
        isAuthenticateRequired: true,
        path: 'resume'
    },
    {
        name: "Resume Template",
        link: "/resume-templates",
        isAuthenticateRequired: false
    },
]
const RESOURCE_LIST = [
    {
        name: "Blog",
        link: "/blog",
        isAuthenticateRequired: false
    },
    {
        name: "Career Advice",
        link: "/advice",
        isAuthenticateRequired: false
    },
]


const NavLink = ({ link, label, isAuthRequired, isAuthenticated, path }) => {

    const pathname = usePathname()
    return <Link passHref href={isAuthRequired && !isAuthenticated ? `/login?path=${path}` : link}><Typography sx={{
        cursor: 'pointer', fontSize: "16px", fontWeight: 600, color: link === pathname ? "primary.main" : "text.primary",
        "&:hover": {
            color: "primary.main"
        }
    }}>{label}</Typography></Link>
}
const MobileNavMenu = ({ label, onClick }) => {
    return <Box onClick={onClick} sx={{ display: 'flex', cursor: 'pointer', width: "100%", justifyContent: 'space-between', mb: 2 }}>
        <Typography sx={{ fontSize: "17px", fontWeight: 600 }}>{label}</Typography>
        <ArrowRightIcon />
    </Box>
}

const HambugerMenu = ({ handleOpenCloseMenu, openMobileMenu }) => {
    return <IconButton onClick={handleOpenCloseMenu}
        sx={{
            bgcolor: 'primary.main',
            '&:hover': {
                bgcolor: 'primary.dark',
            },
        }}
        className={'hambuger_btn'}>
        <Box className={openMobileMenu ? "change" : ""}>
            <Box className="bar1" />
            <Box className="bar2" />
            <Box className="bar3" />
        </Box>
    </IconButton>
}

const Navbar = () => {
    const router = useRouter()


    const tabletView = useMediaQuery("(max-width:1070px)")

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState('');

    const [scrolling, setScrolling] = useState(false);
    const [openMobileMenu, setOpenMobileMenu] = useState(false)


    const handleRedirect = (url, isAuthRequired, path) => {
        if (isAuthRequired && !isAuthenticated) {
            router.push(`/login?path=${path}`)
        }
        else {
            router.push(`${url}?path=${path}`)
            setOpenMobileMenu(false)
        }
    }

    const handleOpenCloseMenu = () => {
        // document.body.style.overflow = openMobileMenu ? "auto" : "hidden";
        setOpenMobileMenu(!openMobileMenu)
    }

    const handleLogout = () => {
        window.location.href = "/"
        Cookies.remove("token")
        Cookies.remove("role")
        setIsAuthenticated(false)
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        let token = Cookies.get('token');
        let userRole = Cookies.get('role');
        if (token) {
            setRole(userRole)
            setIsAuthenticated(true);
        }

    }, []);


    return (
        <Box sx={{ position: 'sticky', top: 0, background: scrolling ? 'white' : 'none', zIndex: 999, boxShadow: scrolling ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "none" }}>
            <CustomContainer>
                <Box className={"navbar_container"} >
                    <Box>
                        <Image src="/icons/logo.svg"
                            width={150}
                            height={50} alt="Logo" />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, }}>
                        <Box className={`desktop_nav_menu ${isAuthenticated ? "after_login_desktopMenu" : ""}`} sx={{ display: 'flex', alignItems: 'center', gap: 3.2, }}>
                            {isAuthenticated && role === "company" ? <></> :
                                <>
                                    <DropDownNavMenu handleCloseMobMenu={setOpenMobileMenu} isAuthenticated={isAuthenticated} label="Resume" menuList={RESUME_LIST} />
                                    <NavLink isAuthRequired isAuthenticated={isAuthenticated} link="/jobs" path="jobs" label="Find a Job" />
                                    <NavLink isAuthRequired isAuthenticated={isAuthenticated} link="/companies" path="companies" label="Companies" />
                                    <DropDownNavMenu isAuthenticated={isAuthenticated} handleCloseMobMenu={setOpenMobileMenu} label="Resource" menuList={RESOURCE_LIST} />
                                </>
                            }
                            {!isAuthenticated ?
                                <NavLink link="/login?path=recruiter/post_a_job" label="Post a Job"
                                    path="recruiter/post_a_job"
                                />
                                : <></>}
                        </Box>
                        {!isAuthenticated ?
                            <HambugerMenu handleOpenCloseMenu={handleOpenCloseMenu} openMobileMenu={openMobileMenu} />
                            : <></>}
                    </Box>

                    {isAuthenticated ?
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <UserProfileInfo handleLogout={handleLogout} />
                            {role !== "company" ?
                                <Box className="after_login_hamburger_btn">
                                    <HambugerMenu handleOpenCloseMenu={handleOpenCloseMenu} openMobileMenu={openMobileMenu} />
                                </Box>
                                : <></>}
                        </Box>
                        :
                        <Box className="auth_buttons" >
                            <IconButton onClick={() => handleRedirect('/login')} sx={{ fontSize: "16px", fontWeight: 700, color: 'primary.main', borderRadius: 0 }}>
                                Login
                            </IconButton>
                            <Button onClick={() => handleRedirect('/register')} label="Sign Up" style={{ fontSize: "16px", fontWeight: 700, color: 'white', px: 2, borderRadius: 2 }} />
                        </Box>
                    }


                </Box>
            </CustomContainer>
            {openMobileMenu && tabletView ? <Box className="mobile_menu_sidebar_container">
                <Box className="mobile_menu_blank_container" onClick={handleOpenCloseMenu} />
                <Box className="mobile_menu_sidebar">
                    <Box className="mobile_menu_inside_container">
                        <Box className={`${isAuthenticated ? "after_login_mobile_menu" : "mobile_nav_menu"} `}>
                            {isAuthenticated && role === "company" ? <></> :
                                <>
                                    <DropDownNavMenu isAuthenticated={isAuthenticated} handleCloseMobMenu={setOpenMobileMenu} label="Resume" menuList={RESUME_LIST} />
                                    <MobileNavMenu onClick={() => handleRedirect('/jobs', true, 'jobs')} label="Find a Job" />
                                    <MobileNavMenu onClick={() => handleRedirect('/companies', true, 'jobs')} label="Companies" />
                                    <DropDownNavMenu isAuthenticated={isAuthenticated} handleCloseMobMenu={setOpenMobileMenu} label="Resource" menuList={RESOURCE_LIST} />
                                </>
                            }
                            {!isAuthenticated ?
                                <MobileNavMenu onClick={() => handleRedirect('/login?path=recruiter/post_a_job', true, 'recruiter/post_a_job')} label="Post a Job" />
                                : <></>}

                        </Box>
                        {!isAuthenticated ?
                            <>
                                <Button onClick={() => handleRedirect('/register')} label="Signup" style={{ width: "100%" }} />
                                <Button onClick={() => handleRedirect('/login')} label="Login" style={{ width: "100%", }} />
                            </>
                            : <></>}

                    </Box>
                </Box>
            </Box> : <></>}

        </Box>
    )
}

export default Navbar