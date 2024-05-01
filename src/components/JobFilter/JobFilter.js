import React from 'react';
import Filter from './Filter';
import styles from './JobFilter.module.css'
import { Box, Typography } from '@mui/material';
const JobFilter = (props) => {
    const [, setFilter] = props?.state || [{}, () => { }];
    return (
        <Box width={'100%'} display={'flex'} flexDirection={{
            xs: 'column',
            md: 'row',
        }} my={5} textAlign={'center'} alignItems={'center'} justifyContent={'space-between'} >
            <Filter />
            <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Typography component="p" mx={2} width={200} >Sort By</Typography>
                <select onChange={(e) => setFilter({
                    value: e.target.value,
                    label: e.target.options[e.target.selectedIndex].text
                })} style={{
                    height: '2rem',
                    border: 'none',
                    outline: 'none',
                    padding: '0 10px',
                    border: '1px solid #E5E5E5',
                    borderRadius: '5px',
                    height: '40px',
                    width: '100%',

                }} name="" id="">
                    <option value="Popular">Popular</option>
                    <option value="date">Date</option>
                    <option value="location">Location</option>
                    <option value="company">Company</option>
                </select>
                <Typography width={220} sx={{
                    cursor: 'pointer'
                }} mx={2} > Reset All</Typography>
            </Box>
        </Box>
    );
};

export default JobFilter;