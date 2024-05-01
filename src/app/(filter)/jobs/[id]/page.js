'use client';
import Button from '@/components/Common/UI/Button';
import { Divider, Grid, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Description from './components/Description';
import List from './components/List';
import About from './components/About';
import Links from './components/Links';
import Skills from './components/Skills';
import Questions from './components/Questions';
import { GET_JOB_BY_ID } from '@/graphql/job/jobQuery';
import { useQuery } from '@apollo/client';
import ApplyJob from '@/components/Common/card/Job/ApplyJob';
import moment from 'moment';
import SimilarJobs from '@/components/SimilarJobs/SimilarJobs';
import { GET_SINGLE_JOB } from '@/components/companyProfile/graphql/query';
import { notFound } from 'next/navigation';
import Loading from '../../loading';

const JobDetails = ({ params }) => {


    const [open, setOpen] = useState(false);
    const { data, refetch, error, loading } = useQuery(GET_SINGLE_JOB, {
        variables: {
            id: params.id,
        },


    });
    const [applied, setApplied] = useState(false);
    const job = data?.singleRecruiterJob;




    const {
        description,
        jobType,
        dateCreated,
        maxSalary,
        minSalary,
        educationRequirements,
        minExperienceYears,
        gender,
        totalApplicant,
        vacancy,
        address,
        isApplied
    } = job || {};


    useEffect(() => {
        setApplied(isApplied === "true" ? true : false)
    }, [isApplied])





    const responsibilities =
        job?.responsibilities?.edges?.map((item) => {
            const { id, title } = item?.node;
            return { id, name: title };
        }) || [];

    let benefits = Object.values(JSON.parse(job?.benefits || "{}")).map((item, index) => {
        return { id: index, name: item };
    });

    const skills = job?.requiredSkills?.edges?.map((skill) => ({
        name: skill.node.name,
        id: skill.node.id,
    }));


    useEffect(() => {
        if (error) {
            notFound();
        }
    }, [error]);
    if (loading) {
        return <Loading />
    }

    return (
        <>
            {
                !applied && <ApplyJob data={job} open={open} setOpen={setOpen}
                    handleRefetch={refetch}
                />
            }

            <Header applied={applied} setOpen={setOpen} data={job} />
            <Container maxWidth="xl">
                <Grid
                    display={'flex'}
                    gap={5}
                    // alignItems={'center'}
                    justifyContent={'space-between'}
                    flexDirection={{
                        xs: 'column',
                        sm: 'column',
                        md: 'column',
                        lg: 'row',
                        xl: 'row',
                    }}
                    py={5}
                >
                    <Grid
                        flexGrow={1}
                        width={{
                            xs: '100%',
                            sm: '100%',
                            md: '100%',
                            lg: '70%',
                            xl: '70%',
                        }}

                    >
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            justifyContent={'space-around'}
                            gap={5}
                        >
                            <Description data={description} />

                            <List
                                title={'Responsibilities'}
                                items={responsibilities}
                            />
                            {/* <List
                                title={'Experience'}
                                items={[
                                    'Fluent in English',
                                    'Project management skills',
                                    'Copy editing skills',
                                ]}
                            /> */}
                            {
                                benefits?.length > 0 && <List title={'Benefits'} items={benefits} />
                            }

                            <Box mt={5}>
                                <Button
                                    onClick={() => setOpen(true)}
                                    style={{
                                        width: '243px',
                                        height: '57px',
                                        fontSize: '18px',
                                        fontWeight: '700',
                                    }}
                                    disabled={applied}
                                    label={applied ? "Applied" : "Apply"}
                                />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid
                        flexGrow={1}
                        alignSelf={'flex-start'}
                        width={{
                            xs: '100%',
                            sm: '100%',
                            md: '100%',
                            lg: '30%',
                            xl: '30%',
                        }}
                        display={'flex'}
                        flexDirection={'colum'}
                        justifyContent={'space-between'}
                    >
                        <Box
                            width={'100%'}
                            display={'flex'}
                            flexDirection={'column'}
                            justifyContent={'space-between'}
                            gap={5}
                            mb={4}
                        >
                            <About
                                totalApplicant={totalApplicant}
                                vacancy={vacancy}
                                details={[
                                    {
                                        name: 'Deadline',
                                        value: moment(dateCreated).format('MMM DD, YYYY'),
                                    },
                                    {
                                        name: 'Job Posted On',
                                        value: moment(dateCreated).format('MMM DD, YYYY'),
                                    },
                                    {
                                        name: 'Maxmum Salary',
                                        value: `${maxSalary || 'N\\\A'} `,
                                    },
                                    {
                                        name: 'Minmum Salary',
                                        value: `${minSalary || 'N\\\A'} `,
                                    },
                                    {
                                        name: 'Job Type',
                                        value: jobType?.split('_').join(' ').toLowerCase(),
                                    },
                                    {
                                        name: 'Education',
                                        value: `${educationRequirements?.split('_').join(' ').toLowerCase() || 'N\\\A'} `,
                                    },
                                    {
                                        name: 'Vacancy',
                                        value: vacancy,
                                    },
                                    {
                                        name: 'Experience',
                                        value: `${minExperienceYears || 'N\\\A'} `,
                                    },
                                    {
                                        name: 'Job Location',
                                        value: address?.completeAddress,
                                    },
                                    {
                                        name: 'Gender',
                                        value: `${gender || 'N\\\A'} `,
                                    },
                                ]}
                            />
                            <Divider />

                            <Box>
                                <Typography variant="h3" mb={2} component="h3">
                                    Categories
                                </Typography>
                                <Box
                                    width={'100%'}
                                    display={'flex'}
                                    gap={2}
                                    flexWrap={'wrap'}
                                >
                                    <Box
                                        bgcolor={'#EB85331A'}
                                        py={1}
                                        px={2}
                                        borderRadius={10}
                                    >
                                        <Typography color="#EB8533">
                                            {job?.category?.name}
                                        </Typography>
                                    </Box>
                                    {/* <Box
                                        bgcolor={'#56CDAD1A'}
                                        py={1}
                                        px={2}
                                        borderRadius={10}
                                    >
                                        <Typography color="#56CDAD">
                                            Development
                                        </Typography>
                                    </Box> */}
                                </Box>
                            </Box>
                            {/* <Links job={job} /> */}

                            <Divider />

                            <Skills data={skills} />
                        </Box>
                    </Grid>
                </Grid>


                <SimilarJobs categoryId={job?.category?.id} />
                <Questions data={job} />
            </Container>
        </>
    );
};

export default JobDetails;
