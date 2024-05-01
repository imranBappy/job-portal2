"use client"
import React, { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useQuery } from '@apollo/client';
import { CATEGORIES_QUERY } from '@/graphql/categories/categoriesQuery';
import FilterList from '../Layout/FilterLayout/common/FilterList';
import DateFilterList from '../Layout/FilterLayout/common/DateFilterList';

const JobFilterListContainer = (props) => {
    const { handleOpenFilter, jobTypeState, jobLevelState, JobCategoryState, jobSalaryState, jobDateFilterState } = props
    const [jobType, setJobType] = jobTypeState || useState([])
    const [jobLevel, setJobLevel] = jobLevelState || useState([])
    const [JobCategory, setJobCategory] = JobCategoryState || useState([])
    const [jobSalary, setJobSalary] = jobSalaryState || useState([])
    const [jobDateFilter, setJobDateFilter] = jobDateFilterState || useState([]);



    const { data } = useQuery(CATEGORIES_QUERY)
    const categories = data?.categories?.edges?.map((edge) => (
        { label: edge.node.name, value: edge.node.id }
    ))

    const handleJobType = (value) => {
        setJobType((pre) => {
            if (pre.includes(value)) {
                return pre.filter((v) => v !== value)
            } else {
                return [...pre, value]
            }
        })
    }

    const handleJobLevel = (value) => {
        setJobLevel((pre) => {
            if (pre.includes(value)) {
                return pre.filter((v) => v !== value)
            } else {
                return [...pre, value]
            }
        })
    }

    const handleJobCategory = (value) => {
        setJobCategory((pre) => {
            if (pre.includes(value)) {
                return pre.filter((v) => v !== value)
            } else {
                return [...pre, value]
            }
        })
    }

    const handleJobSalary = (value) => {
        setJobSalary((pre) => {
            if (pre.includes(value)) {
                return pre.filter((v) => v !== value)
            } else {
                return [...pre, value]
            }
        })
    }

    const handleJobDate = (value, name) => {
        if (name === 'date') {
            if (jobDateFilter === value && jobDateFilter !== "") {
                setJobDateFilter("")
            } else {
                setJobDateFilter(value)
            }
        } else {
            setJobDateFilter(value)
        }
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
            <Box

                mt={4} mb={2} width={'100%'} display={{
                    xs: 'flex',
                    sm: 'flex',
                    md: 'flex',
                    lg: 'none',
                    xl: 'none'
                }}
                justifyContent={'flex-end'}
            >

                <Button

                    onClick={handleOpenFilter}


                >
                    <ClearIcon style={{
                        color: '#000',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        borderRadius: '50%',
                        border: '1px solid #000',
                    }} />
                </Button>
            </Box>
            <FilterList onClick={handleJobType} label='Type of Employment'
                list={[
                    { label: 'Full Time', value: 'full_time' },
                    { label: 'Part Time', value: 'part_time' },
                    { label: 'Contract', value: 'contract' },
                    { label: 'Freelance', value: 'freelance' },
                    { label: 'Internship', value: 'internship' },
                    { label: 'Temporary', value: 'temporary' },
                    { label: 'Volunteer', value: 'volunteer ' },
                    { label: 'Apprenticeship', value: 'apprenticeship ' },
                ]}
                state={[jobType, setJobType]}
            />
            <FilterList
                onClick={handleJobCategory}
                label='Categories'
                list={categories || []}
                state={[JobCategory, setJobCategory]}
            />
            <FilterList label='Job Level'
                onClick={handleJobLevel}
                list={[
                    { label: 'Entry Level', value: 'entry' },
                    { label: 'Junior Level', value: 'junior' },
                    { label: 'Mid Level', value: 'mid' },
                    { label: 'Top Level', value: 'senior' },
                ]}
                state={[jobLevel, setJobLevel]}
            />
            <FilterList onClick={handleJobSalary} label='Salary Range'
                list={[
                    { label: '0 - 10,000', value: '0-10000' },
                    { label: '10,000 - 20,000', value: '10000-20000' },
                    { label: '20,000 - 30,000', value: '20000-30000' },
                    { label: '30,000 - 40,000', value: '30000-40000' },
                    { label: '40,000 - 50,000', value: '40000-50000' },
                    { label: '50,000 - 60,000', value: '50000-60000' },
                    { label: '60,000 - 70,000', value: '60000-70000' },
                    { label: '70,000 - 80,000', value: '70000-80000' },
                    { label: '80,000 - 90,000', value: '80000-90000' },
                ]}
                state={[jobSalary, setJobSalary]}
            />
            <DateFilterList
                onClick={(value) => handleJobDate(value, 'date')}
                label='Date Of Post'
                list={[
                    { label: 'Last 24 Hours', value: '1' },
                    { label: 'Last 7 Days', value: '7' },
                    { label: 'Last 14 Days', value: '14' },
                    { label: 'Last 30 Days', value: '30' },
                ]}
                state={[jobDateFilter, setJobDateFilter]}
            />

        </Grid>
    );
};

export default JobFilterListContainer;