'use client';
import React, { useEffect, useState } from 'react';
import FilterBar from './common/FilterBar';
import { Container, Grid } from '@mui/material';

const FilterLayout = (props) => {
    const {
        header,
        filterBar,
        setLayout,
        children,
        totalCount,
        filterContainer,
        paginationState,
        filterOpenState,
    } = props;

    const [openFilter, setOpenFilter] = filterOpenState || useState(false);
    const handleOpenFilter = () => {
        setOpenFilter((pre) => !pre);
    };

    // pagination
    const { PER_PAGE, totalState } = paginationState;
    const [total, setTotal] = totalState || useState(0);
    useEffect(() => {
        if (totalCount) {
            setTotal(Math.ceil(totalCount / PER_PAGE));
        }
    }, [totalCount, PER_PAGE, total, setTotal]);


    return (
        <>
            {header}
            <Container maxWidth="xl">
                <Grid
                    mt={5}
                    display={'flex'}
                    position={'relative'}
                    gap={2}
                    flexWrap={'nowrap'}
                    justifyContent={'space-between'}
                >
                    {/* Filter Area */}
                    <Grid
                        overflow={{
                            xs: 'auto',
                            sm: 'auto',
                            md: 'auto',
                            lg: 'visible',
                            xl: 'visible',
                        }}
                        bgcolor={{
                            xs: 'bg.transparent',
                            sm: 'bg.transparent',
                            md: 'bg.transparent',
                            lg: 'white',
                            xl: 'white',
                        }}
                        sx={{ transition: 'all 0.3s ease-in-out' }}
                        position={{
                            xs: 'fixed',
                            sm: 'fixed',
                            md: 'fixed',
                            lg: 'static',
                            xl: 'static',
                        }}
                        flexBasis={{ lg: '300px', xl: '300px' }}
                        // drawer
                        zIndex={openFilter ? "drawer" : ""}
                        flexShrink={1}
                        flexGrow={1}
                        minHeight={'100vh'}
                        width={{
                            xs: openFilter ? '100%' : 0,
                            sm: openFilter ? '100%' : 0,
                            md: openFilter ? '100%' : 0,
                            lg: '300px',
                            xl: '300px',
                        }}
                        left={{
                            xs: openFilter ? 0 : -400,
                            sm: openFilter ? 0 : -400,
                            md: openFilter ? 0 : -400,
                            lg: 'auto',
                            xl: 'auto',
                        }}
                        top={{
                            xs: 0,
                            sm: 0,
                            md: 0,
                            lg: 'auto',
                            xl: 'auto',
                        }}
                    >
                        {/* Filter Container, All Filter list here */}
                        {filterContainer}
                    </Grid>

                    {/* Data Layout Area Area */}
                    <Grid flexGrow={1} flexShrink={1}

                        width={'100%'}
                    >
                        {/* Job Bar */}
                        <FilterBar
                            filterState={props.filterState}
                            setLayout={setLayout}
                            openFilter={openFilter}
                            handleOpenFilter={handleOpenFilter}
                            {...filterBar}
                        />
                        {/* All data here  */}
                        {
                            children
                        }

                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default FilterLayout;
