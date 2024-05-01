import {
    Avatar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '@/graphql/auth/authQuery';
import { useRouter } from 'next/navigation';

const NavProfile = ({ logout, role }) => {
    const router = useRouter();
    const [anchorElUser, setAnchorElUser] = useState(null);

    const { data } = useQuery(GET_ME, {
        fetchPolicy: 'network-only',
        notifyOnNetworkStatusChange: true,
    });

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        logout();
    };

    // ----- Handle Click Dashboard
    const handleClickDashboard = () => {
        if (role === 'recruiter') {
            router.push('/recruiter');
        } else {
            router.push('/candidate');
        }
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <Box
                    display={'flex'}
                    gap={1.5}
                    alignItems={'center'}
                    onClick={handleOpenUserMenu}
                >
                    <IconButton sx={{ p: 0 }}>
                        <Avatar
                            alt={data?.me?.username}
                            src={
                                data?.me?.profile?.imagePath
                                    ? data?.me?.profile?.imagePath
                                    : ''
                            }
                        />
                    </IconButton>
                    <Typography
                        sx={{ cursor: 'pointer' }}
                        fontFamily={'Nunito'}
                        fontWeight={'600'}
                        color="#1C3E5E"
                    >
                        {data?.me?.username}
                    </Typography>

                    <KeyboardArrowDownIcon
                        style={{ cursor: 'pointer', padding: 0 }}
                        fontSize="large"
                        color="#1C3E5E"
                    />
                </Box>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleClickDashboard}>
                    <Typography textAlign="center">{'Dashboard'}</Typography>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleCloseUserMenu();
                        handleLogout();
                    }}
                >
                    <Typography textAlign="center">{'Logout'}</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default NavProfile;
