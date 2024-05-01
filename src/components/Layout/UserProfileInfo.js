import { GET_ME } from '@/graphql/auth/authQuery'
import useAuthCheck from '@/hooks/useAuth'
import { Images } from '@/utils/imagePath'
import { useQuery } from '@apollo/client'
import { AccountBox, Apartment, ArrowDropDown, AssignmentLate, Dashboard, Feed, Group, HeadsetMic, Lock, Logout, PlaylistAdd, PlaylistAddCheck, Settings, Work, WorkOutline } from '@mui/icons-material'
import { Box, Menu, MenuItem, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { AiOutlineUserDelete } from "react-icons/ai";
import DeleteAccoutModal from '../DeleteAccoutModal/DeleteAccoutModal'

const CANDIDATE_LIST = [
    {
        label: "Dashboard",
        url: "/candidate",
        icon: <Dashboard />
    },
    {
        label: "My Profile",
        url: "/candidate/profile_details",
        icon: <AccountBox />
    },
    {
        label: "My Resume",
        url: "/candidate/my_resume",
        icon: <Feed />
    },
    {
        label: "Applied Jobs",
        url: "/candidate/applied_jobs",
        icon: <WorkOutline />
    },
    {
        label: "Job Alerts",
        url: "/candidate/job_alerts",
        icon: <AssignmentLate />
    },
    {
        label: "Change Password",
        url: "/candidate/change_password",
        icon: <Lock />
    },

]


const RECRUITER_LIST = [
    {
        label: "Dashboard",
        url: "/recruiter",
        icon: <Dashboard />
    },
    {
        label: "Company Profile",
        url: "/recruiter/company_profile",
        icon: <Apartment />
    },
    {
        label: "Job List",
        url: "/recruiter/job_list",
        icon: <WorkOutline />
    },
    {
        label: "Shortlist Resume",
        url: "/recruiter/shortlist_resume",
        icon: <PlaylistAddCheck />
    },
    {
        label: "All Applicants",
        url: "/recruiter/all_applicants",
        icon: <Group />
    },
    {
        label: "Change Password",
        url: "/recruiter/change_password",
        icon: <Lock />
    },
]


const UserProfileInfo = ({ handleLogout }) => {
    const router = useRouter()
    const pathname = usePathname()
    const [open, setOpen] = useState(false);



    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const { role } = useAuthCheck();

    const { data } = useQuery(GET_ME, {
        fetchPolicy: 'network-only',
        notifyOnNetworkStatusChange: true,
    });


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const makeName = () => {
        if (role === 'company') {
            return data?.me?.company?.name;
        }

        if (data?.me?.profile?.firstName) {
            return data?.me?.profile?.firstName + " " + data?.me?.profile?.lastName
        }

        return 'Loading...'

    }

    return (
        <Box>
            <DeleteAccoutModal
                modelState={[open, setOpen]}
            />
            <Box onClick={handleClick} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <Box sx={{ height: "35px", width: "35px", borderRadius: "50%", border: 1, mr: 1, position: 'relative', overflow: "hidden", borderColor: 'primary.main' }}>
                    <Image layout='fill' src={data?.me?.profile?.photoUrl ? data?.me?.profile?.photoUrl : Images.NO_IMAGE} style={{ objectFit: 'cover' }} alt='' />
                </Box>
                <Typography sx={{ fontWeight: 600, color: 'text.primary' }}>{makeName()}</Typography>
                <ArrowDropDown />
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={openMenu}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        borderRadius: "12px",
                        overflow: "visible",
                        p: 1,
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
                        mt: 1.5,
                        width: 250,
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >

                {role === 'company' ?
                    RECRUITER_LIST?.map((item) => (
                        <Link key={item.label} href={item.url} passHref>
                            <MenuItem sx={{ py: 0.5, display: 'flex', gap: 2, alignItems: 'center' }}>
                                {item.icon}
                                {item.label}
                            </MenuItem>
                        </Link>
                    ))
                    :
                    CANDIDATE_LIST?.map((item) => (
                        <Link key={item.label} href={item.url} passHref>
                            <MenuItem sx={{ py: 0.5, display: 'flex', gap: 2, alignItems: 'center', bgcolor: pathname === item.url ? "rgba(0,0,0,0.05)" : "" }} >
                                {item.icon}
                                {item.label}
                            </MenuItem>
                        </Link>
                    ))
                }

                <MenuItem
                    sx={{
                        display: 'flex', gap: 2, alignItems: 'center',
                        mt: 1,
                        ml: 0.5,
                        "&:hover": {
                            backgroundColor: "rgba(255, 77, 79, 0.1)"
                        }
                    }}
                    onClick={() => setOpen(true)}
                >
                    <AiOutlineUserDelete />
                    Delete Account</MenuItem>
                <MenuItem
                    sx={{
                        color: "#ff4d4f",
                        display: 'flex', gap: 2, alignItems: 'center',
                        mt: 1,
                        ml: 0.5,
                        "&:hover": {
                            backgroundColor: "rgba(255, 77, 79, 0.1)"
                        }
                    }}
                    onClick={handleLogout}
                >
                    <Logout />
                    Logout</MenuItem>
            </Menu>
        </Box >
    )
}

export default UserProfileInfo



