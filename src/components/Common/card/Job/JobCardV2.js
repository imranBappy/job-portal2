'use client';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Button from '../../UI/Button';
import JobType from './JobType';
import Progress from '@/components/Progress/Progress';
import Link from 'next/link';
import ApplyJob from './ApplyJob';
import calculatePersentage from '@/utils/calculatePersentage';
import useAuthCheck from '@/hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation'
import { Images } from '@/utils/imagePath';
import cutDescription from '@/utils/cutDescription';
import moment from 'moment';
import handleAddress from '@/utils/handleAddress';

const JobCardV2 = (props) => {
    const {
        job: {
            title = '',
            category,
            description,
            maxSalary,
            minSalary,
            expertiseLevel,
            minExperienceYears,
            company,
            vacancy,
            totalApplicant,
            jobType,
            createdOn,
            id,
            isApplied,
        } = {},
        style,
        ...rest
    } = props;

    const [open, setOpen] = React.useState(false);
    const {
        id: companyId,
        city,
        country,
    } = props?.job?.company;
    const searchParams = useSearchParams();
    const { isAuthenticated } = useAuthCheck()
    const router = useRouter();
    const [isError, setIsError] = useState(false)
    // cut the description

    const progress = calculatePersentage(
        totalApplicant,
        vacancy
    );
    const handleApply = () => {
        if (isAuthenticated) {
            setOpen(true);
            props?.handleRefetch();
        } else {
            router.push('/login')
        }
    };

    useEffect(() => {
        if (id === searchParams?.get('jobId')) {
            router.replace('/jobs')
            setOpen(true);
        }
    }, [searchParams?.get('apply'), searchParams?.get('jobId')]);



    return (
        <>
            <ApplyJob handleRefetch={props?.handleRefetch} data={props.job} open={open} setOpen={setOpen} />
            <Box
                flexShrink={1}
                {...rest}
                // flexGrow={1}
                flexBasis={340}
                // maxWidth={385}
                sx={{
                    border: '1.5px solid #D6DDEB',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.1)',
                    },
                    padding: '24px',
                }}

                display="flex"
                justifyContent="space-between"
                style={style}
                flexDirection={'column'}
            >
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Box
                        display="flex"
                        alignItems="center"
                        gap={2}
                        pb={1}
                        alignSelf={'flex-start'}
                    >
                        <Link
                            href={`/jobs/${id}`}
                            style={{
                                textDecoration: 'none',
                            }}
                        >
                            <Image
                                src={
                                    isError ? Images.NO_IMAGE :
                                        company.logoUrl
                                            ? company.logoUrl
                                            : Images.NO_IMAGE
                                }
                                width={100}
                                height={100}
                                alt="img"
                                onEmptied={() => { setIsError(true) }}
                                onError={() => { setIsError(true) }}
                            />
                        </Link>
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                border: '2px solid #4640DE',
                                padding: '8px 10px',

                                fontSize: '1rem',
                                borderRadius: 0,
                                borderColor: '#4640DE',
                                color: '#4640DE',
                                fontWeight: 600,
                            }}

                        >
                            {jobType === "FULL_TIME" ? "Full Time" : 'Part Time'}
                        </Typography>
                    </Box>
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
                            <Typography variant="h6">{title}</Typography>
                        </Link>

                        <Typography
                            color="text.secondary"
                            mb={1}
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
                                    {company?.name || ''}
                                </Typography>
                            </Link>
                            &nbsp;  &nbsp;  &nbsp; &nbsp;


                            <span>
                                {
                                    handleAddress(city, country)
                                }
                            </span>
                        </Typography>
                    </Box>
                    <Typography textAlign={'justify'} color="text.secondary" variant="subHeader3">
                        {cutDescription(description)}{' '}
                    </Typography>

                    <Box display={'flex'} flexWrap={'wrap'}>
                        <Box display={'flex'} alignItems={'center'} gap={1}>
                            <JobType type={category?.name} />
                        </Box>
                    </Box>
                    {
                        !props.isLatest ? (<Box>

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
                            {
                                minSalary && <Box my={1} display={'flex'}>
                                    <Typography
                                        color="text.secondary"
                                        variant="subHeader2"
                                    >
                                        Salary :
                                    </Typography>
                                    <Typography variant="subHeader2">
                                        {minSalary} - {maxSalary} USD

                                    </Typography>
                                </Box>
                            }

                            <Box display={'flex'}>
                                <Typography
                                    color="text.secondary"
                                    variant="subHeader2"
                                >
                                    Minmum Experience :
                                </Typography>
                                <Typography variant="subHeader2">
                                    {minExperienceYears ? minExperienceYears + ' Years ' : expertiseLevel ? expertiseLevel : '-'}
                                </Typography>
                            </Box>
                        </Box>) : null
                    }

                </Box>

                {
                    !props.isLatest ?
                        (
                            <Box
                                sx={{ width: '100%' }}
                                alignSelf={'center'}
                                display="flex"
                                flexDirection={'column'}
                                alignItems="center"
                                justifyContent="space-between"
                                gap={1}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                    }}
                                >
                                    <Button
                                        disabled={isApplied === 'true'}
                                        onClick={handleApply}
                                        fullWidth={true}
                                        style={{
                                            height: 45,
                                            fontSize: '1rem',
                                        }}
                                        label={isApplied === 'true' ? "Applied" : "Apply"}
                                    />
                                </Box>
                                <Progress value={`${progress}%`} />
                                <Box>
                                    <Typography display={'flex'} gap={1} variant="body1">
                                        <Typography
                                            fontWeight={600}
                                        > {totalApplicant} applied</Typography> of {vacancy} Vacancy{' '}
                                    </Typography>
                                </Box>
                            </Box>
                        ) : null
                }

            </Box>
        </>
    );
};

export default JobCardV2;
