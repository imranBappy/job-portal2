import { CREATE_ACCOUNT } from '@/graphql/accout/accountMutation';
import { useMutation } from '@apollo/client';
import { Logout } from '@mui/icons-material';
import { Box, Typography, useTheme } from '@mui/material';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { BiSolidLock } from 'react-icons/bi';
import { AiOutlineUserDelete } from "react-icons/ai";

import { useState } from 'react';
import DeleteAccoutModal from '@/components/DeleteAccoutModal/DeleteAccoutModal';



const SidebarList = ({ onClick, active, item, theme }) => {
    return (
        <Box
            onClick={() => onClick(item.value)}
            sx={{ display: 'flex', gap: 2, cursor: 'pointer' }}
        >
            <Box
                sx={{
                    height: 40,
                    width: 6,
                    bgcolor: active === item.value ? 'primary.dark' : 'none',
                    margin: 'auto',
                }}
            />
            <Box
                sx={{
                    width: '100%',
                    bgcolor: active === item.value ? 'primary.light' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    px: 1.6,
                    gap: 1.6,
                    py: 2,
                }}
            >
                <item.icon
                    size={21}
                    style={{
                        color: active === item.value
                            ? theme.palette.primary.dark
                            : theme.palette.text.secondary

                    }}
                    color={
                        active === item.value
                            ? theme.palette.primary.dark
                            : theme.palette.text.secondary
                    }
                />

                <Typography
                    variant="bodyNormal"
                    fontWeight={500}
                    color={
                        active === item.value
                            ? 'primary.dark'
                            : 'text.secondary'
                    }
                >
                    {item.display}
                </Typography>
            </Box>
        </Box>
    );
};

const SidebarContainer = ({ listData, onClick, }) => {
    const theme = useTheme();
    const pathname = usePathname();
    const router = useRouter();
    const [open, setOpen] = useState(false);


    const handleLogout = () => {
        Cookies.remove("token")
        Cookies.remove("role")
        window.location.href = "/"
    }


    return (
        <Box
            sx={{
                height: { xs: "100vh", md: 'calc(100vh - 60px)' },
                width: '280px',
                position: 'fixed',
                bgcolor: 'common.grey',
                borderRight: 2,
                borderColor: '#E5E7EB',
            }}
        >
            <DeleteAccoutModal
                modelState={[open, setOpen]}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'space-between',
                }}
            >
                <Box sx={{ py: 4 }}>
                    {listData.map((item, key) => (
                        <SidebarList
                            key={`sidebar_list_${key}`}
                            onClick={onClick}
                            active={pathname.split("/")[2] ? pathname.split("/")[2] : "dashboard"}
                            item={item}
                            theme={theme}
                        />
                    ))}
                </Box>
                <Box sx={{ pb: 2 }}>
                    <SidebarList
                        onClick={onClick}
                        active={pathname.split("/")[2] ? pathname.split("/")[2] : "dashboard"}
                        item={{
                            display: 'Change Password',
                            value: 'change_password',
                            icon: BiSolidLock,
                        }}
                        theme={theme}
                    />
                    <SidebarList
                        onClick={() => setOpen(true)}
                        item={{
                            display: 'Delete Account',
                            value: '',
                            icon: AiOutlineUserDelete,
                        }}
                        theme={theme}
                    />
                    <SidebarList
                        onClick={handleLogout}
                        item={{
                            display: 'Logout',
                            value: '',
                            icon: Logout,
                        }}
                        theme={theme}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default SidebarContainer;
