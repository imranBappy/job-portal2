"use client"
import React from 'react';
import { Box, Typography } from '@mui/material';
import ApplicationsList from './ApplicationsList';
import { BsArrowRight } from 'react-icons/bs';
import { ALL_APPLIED_JOBS } from '@/graphql/appliedJobs/appliedJobQuery';
import calcluteDate from '@/utils/calcluteDate';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import NotFound from '@/components/Common/UI/NotFound';

const RecentApplicationsHistory = () => {
    const { data, } = useQuery(ALL_APPLIED_JOBS, {
        variables: {
            first: 10,
            offset: 0,
            startDate: calcluteDate(1)
        },
    });
    const jobs = data?.candidateList?.edges.map((edge) => edge.node);


    return (
        <>
            {
                jobs?.length > 0 ? (<Box sx={{ border: 2, borderColor: '#D6DDEB' }}>
                    <Box sx={{ borderBottom: 2, borderColor: '#D6DDEB', p: 3 }}>
                        <Typography fontWeight={600} variant="subHeader1">
                            Recent Applications History
                        </Typography>
                    </Box>

                    <Box sx={{ p: 3 }} width={'100%'}

                        overflow={{
                            xs: 'scroll',
                            sm: 'scroll',
                            md: 'scroll',
                            lg: 'hidden',
                            xl: 'hidden',
                        }}
                    >
                        {jobs?.map((item, key) => (
                            <ApplicationsList
                                isEven={key % 2 === 0}
                                item={item}
                                key={`applicant_${item.id}`}
                            />
                        ))}
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            p: 3,
                        }}
                    >
                        <Link href={`/candidate/applied_jobs`}>
                            <Typography
                                sx={{
                                    color: 'primary.main',
                                    fontWeight: 600,
                                    textAlign: 'center',
                                    p: 2,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                                variant="bodyLarge"
                            >
                                View all applications history
                                <BsArrowRight
                                    sx={{
                                        fontSize: '1.5rem',
                                        verticalAlign: 'middle',
                                        marginLeft: '0.5rem',
                                    }}
                                />
                            </Typography>
                        </Link>

                    </Box>
                </Box>) : <NotFound/>
        }
        
        </>
    );
};

export default RecentApplicationsHistory;
