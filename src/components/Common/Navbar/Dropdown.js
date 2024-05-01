"use client"
import { Button } from '@mui/material';
import styles from './Navbar.module.css'
import Link from 'next/link';

const Dropdown = (props) => {
    return (
        <ul className={styles.dropdown}>
            <li>
                <Link className={styles.navlink} style={{
                    color: 'inherit',
                    textDecoration: 'none',
                }} href={'' || "#"}>
                    Link
                </Link>
            </li>

        </ul>
    );
};

export default Dropdown;