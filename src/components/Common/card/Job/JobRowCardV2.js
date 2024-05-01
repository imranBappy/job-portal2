"use client"
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import Button from '../../UI/Button';
import { Images } from '@/utils/imagePath';
import JobType from './JobType';
import cutDescription from '@/utils/cutDescription';
import calculatePersentage from '@/utils/calculatePersentage';
import Progress from '@/components/Progress/Progress';
import Link from 'next/link';
import moment from 'moment';
import ApplyJob from './ApplyJob';
import handleAddress from '@/utils/handleAddress';

const JobRowCardV2 = (props) => {
    const { job: {
        title = '',
        category,
        description,
        maxSalary,
        minSalary,
        minExperienceYears,
        company,
        vacancy,
        totalCandidate,
        totalApplicant,
        jobType,
        id,
        createdOn,
        isApplied,
    } = {}, style, ...rest } = props;
    const {

        city,
        country,
        id: companyId,
    } = props?.job?.company;
    const progress = calculatePersentage(
        totalApplicant,
        vacancy
    );
    const [open, setOpen] = useState(false);
    const handleApply = () => {
        setOpen(true);
    };
    return (
        <>
            <ApplyJob handleRefetch={props.handleRefetch} data={props.job} open={open} setOpen={setOpen} />
            <Box
                {...rest}
                flexGrow={1}
                sx={{
                    border: "1px solid #D6DDEB",
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.1)',
                    },
                }}
                p={3}
                display="flex"
                justifyContent="space-between"
                style={style}
                gap={4}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    gap={3}
                    pb={2}
                    mb={2}
                    alignSelf={'flex-start'}
                >
                    <Link
                        href={`/jobs/${id}`}
                        style={{
                            textDecoration: 'none',
                        }}
                    >
                        <Image src={
                            company.logoUrl
                                ? company.logoUrl
                                : Images.NO_IMAGE
                        } width={100} height={100} alt={name} />
                    </Link>
                </Box>
                <Box
                    pb={1}
                    flexGrow={1}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    gap={1}

                >
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'flex-start'}
                        gap={1}

                    >
                        <Link
                            href={`/jobs/${id}`}
                            style={{
                                textDecoration: 'none',
                            }}
                        >
                            <Typography variant='h6'>
                                {title}
                            </Typography>
                        </Link>
                        <Typography
                            color="text.secondary"
                            mb={2}
                            variant="subHeader3"
                        >
                            <Link href={`/companies/${companyId}`}>

                                <Typography
                                    component={'span'}
                                    fontWeight={600}
                                    sx={{
                                        '&:hover': {
                                            color: '#4640DE',
                                        },
                                    }}
                                >
                                    {company?.name ? company?.name : 'Company'}
                                </Typography>
                            </Link>
                            &nbsp;.&nbsp;
                            <span>
                                {
                                    handleAddress(city, country)
                                }
                            </span>
                        </Typography>
                    </Box>
                    <Typography color="text.secondary" variant='subHeader3'> {cutDescription(description)} </Typography>

                    <Box display={'flex'} flexWrap={'wrap'}

                        alignItems={'center'}
                    >
                        <Box
                            display={'flex'}
                            alignItems={'center'}
                            gap={0.5}
                            borderRight={'1px solid #1C3E5E1A'}
                            pr={1}
                        >
                            <Typography
                                variant='span'
                                color={'#56CDAD'}
                                bgcolor={'#56CDAD1A'}
                                px={2}
                                py={1}
                                fontWeight={600}
                                align='center'
                                fontSize={16}
                                borderRadius={50}
                            >
                                {jobType === "FULL_TIME" ? "Full Time" : 'Part Time'}
                            </Typography>
                        </Box>

                        <Box
                            pl={1}

                            display={'flex'}
                            alignItems={'center'}
                            gap={1}
                        >
                            <JobType type={category?.name} />
                        </Box>
                    </Box>

                    <Box>

                        <Box my={1} display={'flex'}>
                            <Typography
                                color="text.secondary"
                                variant="subHeader2"
                            >
                                Posted On :
                            </Typography>
                            <Typography variant="subHeader2"> &nbsp;
                                {
                                    createdOn ? moment(createdOn).fromNow() : ''
                                }
                            </Typography>
                        </Box>
                        <Box my={1} display={'flex'}>
                            <Typography color="text.secondary" variant='subHeader2'> Salary : </Typography>
                            <Typography variant='subHeader2'>   {minSalary ? (
                                <>
                                    {minSalary} - {maxSalary} USD
                                </>
                            ) : (
                                <>Negotiable</>
                            )} </Typography>
                        </Box>
                        <Box display={'flex'}>
                            <Typography color="text.secondary" variant='subHeader2'>Minmum Experience :{' '} </Typography>
                            <Typography variant='subHeader2'>{minExperienceYears
                                ? minExperienceYears + ' Years '
                                : '-'} </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box
                    alignSelf={'center'}
                    flexBasis={400}
                    display="flex"
                    flexDirection={'column'}
                    alignItems="center"
                    justifyContent="space-between"
                    gap={1}
                >
                    <Box>
                        <Button
                            disabled={isApplied === 'true'}
                            onClick={handleApply}
                            style={{
                                width: 180,
                                height: 45,
                                fontSize: '1rem',
                            }} label='Apply' />
                    </Box>
                    <Box bgcolor={`#D6DDEB`} sx={{ width: 170, height: 5, }} >
                        <Progress value={`${progress}%`} />
                    </Box>
                    <Box>
                        <Typography variant='body1'> {totalCandidate} applied of 10 capacity </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default JobRowCardV2;