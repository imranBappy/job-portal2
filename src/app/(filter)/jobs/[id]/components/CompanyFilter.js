"use client"
import React, { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useQuery } from '@apollo/client';
import { CATEGORIES_QUERY } from '@/graphql/categories/categoriesQuery';
import FilterList from '@/components/JobFilter/FilterList';
const CompanyFilter = (props) => {
    const { handleOpenFilter, companyCategoryState, } = props
    const [, setCompanyCategory] = companyCategoryState || useState([])
    const { data } = useQuery(CATEGORIES_QUERY)


    const categories = data?.categories?.edges?.map((edge) => (
        { label: edge.node.name, value: edge.node.id }
    ))



    const handleCountryCategory = (value) => {
        setCompanyCategory((pre) => {
            if (pre.includes(value)) {
                return pre.filter((v) => v !== value)
            } else {
                return [...pre, value]
            }
        })
    }






    return (
        <Grid
            bgcolor={'#fff'}
            minHeight={'100vh'}

            position={{
                xs: 'absolute',
                sm: 'absolute',
                md: 'absolute',
                lg: 'static',
                xl: 'static'
            }}
            width={300}
            overflow={'auto'}
            // css scroll bar style
            sx={{
                zIndex: 'fab',
                '&::-webkit-scrollbar': {
                    width: '0.4em'
                },
                '&::-webkit-scrollbar-track': {
                    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0,0,0,.1)',
                }
            }}
        >
            <Box mt={4} mb={2} width={'100%'} display={{
                xs: 'flex',
                sm: 'flex',
                md: 'flex',
                lg: 'none',
                xl: 'none'
            }}
                justifyContent={'flex-end'}
            >
                <Button onClick={handleOpenFilter}  >
                    <ClearIcon style={{
                        color: '#000',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        borderRadius: '50%',
                        border: '1px solid #000',
                    }} />
                </Button>
            </Box>

            <FilterList
                onClick={handleCountryCategory}
                label='Company Categories'
                list={categories || []}
                state={companyCategoryState}
            />



        </Grid>
    );
};

export default CompanyFilter;