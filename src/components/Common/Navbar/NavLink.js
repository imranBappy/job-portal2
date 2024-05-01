"use client"
import { Button, } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import styles from './Navbar.module.css'
const NavLink = (props) => {
    return (
        <Button className={styles.navlink} onClick={props.onClick} sx={{
            ...props.style,
            textTransform: 'none',
            color: 'black',
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: '20px',
            "&:hover": {
                color: 'primary.main'
            },
            fontFamily: 'Nunito',
            position: 'relative',

        }} >
            <Link style={{
                color: 'inherit',
                textDecoration: 'none',
            }} href={props.href || "#"}>
                {props.page}
            </Link>
        </Button>
    );
};

export default NavLink;