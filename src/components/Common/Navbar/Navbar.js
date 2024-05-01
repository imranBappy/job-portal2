'use client';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import NavLink from './NavLink';
import useAuthCheck from '@/hooks/useAuth';
import NavProfile from './NavProfile';
import {
    MenuItem,
    Container,
    Menu,
    Typography,
    IconButton,
    Toolbar,
    Box,
    AppBar,
} from '@mui/material';
import Link from 'next/link';
const pages = [
    {
        id: 1,
        page: 'Home',
        href: '/',
    },
    {
        id: 2,
        page: 'Resume',
        href: '/resume',
    },
    {
        id: 3,
        page: 'Find a Job',
        href: '/jobs',
    },
    {
        id: 4,
        page: 'Post a Job',
        href: '/post-a-job',
    },
    {
        id: 5,
        page: 'Companies',
        href: '/companies',
    },
    {
        id: 6,
        page: 'Recourses',
        href: '/recourses',
    },

];

function Navbar({ bgcolor }) {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const { isAuthenticated, loading, logout, role } = useAuthCheck();

    return (
        <AppBar
            sx={{
                bgcolor: bgcolor ? bgcolor : 'secondary.main',
                color: 'primary.main',
                boxShadow: 0,
                zIndex: 'app bar',

            }}
            position="static"
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.id}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Link href={page.href}>
                                        <Typography textAlign="center">
                                            {page.page}
                                        </Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                            {
                                !isAuthenticated ? (
                                    <MenuItem
                                        onClick={handleCloseNavMenu}
                                    >
                                        <Link href={'/login'}>
                                            <Typography textAlign="center">
                                                {'Login'}
                                            </Typography>
                                        </Link>
                                    </MenuItem>
                                ) : null
                            }
                        </Menu>
                    </Box>
                    <AdbIcon
                        sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            justifyContent: 'center',
                        }}
                    >
                        {pages.map((p) => (
                            <NavLink
                                style={{ zIndex: 2 }}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'black', display: 'block' }}
                                key={p.id}
                                page={p.page}
                                href={p.href}
                            />
                        ))}
                    </Box>
                    {loading ? (
                        'Loading...'
                    ) : isAuthenticated ? (
                        <NavProfile logout={logout} role={role} />
                    ) : (
                        <Box
                            sx={{
                                flexGrow: 0,
                                display: { xs: 'none', md: 'flex' },
                                justifyContent: 'center',
                            }}
                        >
                            <NavLink
                                href="/login"
                                sx={{ my: 2, color: 'black', display: 'block' }}
                                page="Login"
                            />
                            <NavLink
                                href="/register"
                                page="SignUp"
                                sx={{ my: 2, color: 'black', display: 'block' }}
                            />
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
