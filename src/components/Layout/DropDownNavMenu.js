import { ArrowRight, KeyboardArrowDown } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Menu, MenuItem, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DropDownNavMenu = ({ menuList, label, handleCloseMobMenu, isAuthenticated, }) => {
    const router = useRouter()


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRedirect = (linkData) => {
        if (linkData.isAuthenticateRequired && !isAuthenticated) {
            router.push('/login?path=resume')
            handleCloseMobMenu(false)
            handleClose()
        }
        else {
            handleCloseMobMenu(false)
            router.push(linkData.link)
            handleClose()
        }
    }

    return (
        <Box>
            <Accordion className={`${isAuthenticated ? "after_login_mobile_menu" : "mobile_nav_menu"} `} sx={{ boxShadow: "none", mb: 2.5 }}>
                <AccordionSummary
                    sx={{
                        p: 0, m: 0,
                        minHeight: "10px !important",
                        "& .Mui-expanded": {
                            m: 0, p: 0,
                        },
                        "&.MuiAccordionSummary-root": {
                            minHeight: "10px !important"
                        },
                        "& .MuiAccordionSummary-content": {
                            m: 0
                        }
                    }}
                    expandIcon={<ArrowRight sx={{ color: 'black' }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography sx={{ fontSize: "17px", fontWeight: 600, color: "black", opacity: 1, }}>{label}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0, }}>
                    {menuList?.map((item, key) => (
                        <MenuItem key={`${Math.round()}_${key}`} onClick={() => handleRedirect(item)} sx={{ fontSize: "16px", color: "text.primary", fontWeight: 600, }}>{item.name}</MenuItem>
                    ))}
                </AccordionDetails>
            </Accordion>

            <Box
                className={`desktop_nav_menu ${isAuthenticated ? "after_login_desktop_menu" : ""}`}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ display: 'flex', alignItems: 'center', gap: 0.2, cursor: 'pointer' }}>
                <Typography sx={{ fontSize: "16px", fontWeight: 600, color: "text.primary", "&:hover": { color: "primary.main" } }}>{label}</Typography>
                <KeyboardArrowDown sx={{ fontSize: 20 }} />
            </Box>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{
                    mt: 1,
                    "& .MuiPaper-root": {
                        boxShadow: "0px 24px 64px -4px rgba(27, 37, 51,0.15) !important",
                        p: 1,
                        width: 180,
                    }
                }}
            >
                {menuList?.map((item, key) => (
                    <MenuItem key={`${Math.round()}_${key}`} onClick={() => handleRedirect(item)} sx={{ fontSize: "16px", color: "text.primary", fontWeight: 600, px: 1 }}>{item.name}</MenuItem>
                ))}
            </Menu>
        </Box >
    )
}

export default DropDownNavMenu