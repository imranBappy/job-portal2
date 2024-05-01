import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_SINGLE_JOB } from '../graphql/query';
import Toaster from '@/common/Toaster';
import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import CircularLoader from '@/components/Loader/CircularLoader';
import Image from 'next/image';
import { Images } from '@/utils/imagePath';
import moment from 'moment';
import Button from '@/components/Common/UI/Button';
import ApplicantList from '../ApplicantList';
import Link from 'next/link';
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { BiLogoFacebook, BiLogoLinkedin } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

const SocialIcon = ({ link, icon }) => {
    return (
        <Link href={link}>
            <IconButton
                sx={{
                    height: 35,
                    width: 35,
                    bgcolor: 'primary.light',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'primary.main',
                }}
            >
                {icon}
            </IconButton>
        </Link>
    );
};

const SectionTitle = ({ title }) => {
    return (
        <Typography
            sx={{
                color: 'common.darkBlue',
                fontSize: '30px',
                fontWeight: 800,
                mb: 1,
            }}
        >
            {title}
        </Typography>
    );
};
const DetailText = ({ text, isShowTick }) => {
    return (
        <Box sx={{ display: 'flex', gap: 1 }}>
            {isShowTick ? (
                <Image
                    src={Images.TICK_ICON}
                    alt="tick icon"
                    height={19}
                    width={19}
                    style={{ marginTop: '2px' }}
                />
            ) : null}

            <Typography
                sx={{
                    color: 'text.grey',
                    fontSize: '15px',
                    fontWeight: 400,
                    mb: 1,
                    textTransform: 'capitalize'
                }}
            >
                {text}
            </Typography>
        </Box>
    );
};

const AboutList = ({ label, value }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography
                sx={{
                    color: 'text.grey',
                    fontSize: '15px',
                    fontWeight: 400,
                }}
            >
                {label}
            </Typography>
            <Typography
                sx={{
                    color: 'text.darkBlue',
                    fontSize: '15px',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                }}
            >
                {value}
            </Typography>
        </Box>
    );
};

const calculateApplicantPercentage = (totalCount, applyCount) => {
    let percentage = (+applyCount * 100) / +totalCount;
    return !isNaN(percentage) ? applyCount > totalCount ? "100%" : `${percentage}%` : '0%';
};

const JobPostDetail = ({ id, }) => {
    const router = useRouter()

    const [totalApplicantCount, setTotalApplicantCount] = useState(0);

    const [getSingleJob, { data, loading }] = useLazyQuery(GET_SINGLE_JOB, {
        fetchPolicy: 'network-only',

        onError: (err) => {
            Toaster({
                type: 'error',
                message: err.message,
            });
        },
    });


    useEffect(() => {
        getSingleJob({ variables: { id } });
    }, []);

    if (loading) {
        return (
            <Box sx={{ height: '90vh' }}>
                <CircularLoader />
            </Box>
        );
    }
    return (
        <Box sx={{ pt: 2 }}>
            <Typography variant="h2">
                {data?.singleRecruiterJob?.title}
            </Typography>

            <Divider sx={{ my: 2.5 }} />
            <Grid container spacing={6} mb={3}>
                <Grid item xs={12} md={8}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2.5,
                        }}
                    >
                        <Box>
                            <SectionTitle title="Description" />
                            <DetailText
                                text={
                                    data?.singleRecruiterJob?.description ?? ''
                                }
                            />
                        </Box>
                        <Box>
                            <SectionTitle title="Responsibilities" />
                            {data?.singleRecruiterJob?.responsibilities?.edges?.map(
                                (item, key) => {
                                    return (
                                        <DetailText
                                            key={`Responsibilities_${key}`}
                                            isShowTick
                                            text={item.node.title}
                                        />
                                    );
                                },
                            )}
                        </Box>

                        <Box>
                            <SectionTitle title="Educational Requirements" />

                            <DetailText
                                isShowTick
                                text={
                                    data?.singleRecruiterJob
                                        ?.educationRequirements ?
                                        data?.singleRecruiterJob
                                            ?.educationRequirements?.toLowerCase()
                                        : '-'
                                }
                            />
                        </Box>
                        <Box>
                            <SectionTitle title="Experience" />

                            <DetailText
                                isShowTick
                                text={
                                    data?.singleRecruiterJob?.minExperienceYears
                                        ? `${data?.singleRecruiterJob?.minExperienceYears} Year`
                                        : '-'
                                }
                            />
                        </Box>
                        <Box>
                            <SectionTitle title="Benefits" />

                            {data?.singleRecruiterJob?.benefits && JSON.parse(data?.singleRecruiterJob?.benefits) ?
                                Object.values(JSON.parse(data?.singleRecruiterJob?.benefits)).map((item, key) => {
                                    return <DetailText
                                        key={`benefits_${item}_${key}`}
                                        isShowTick
                                        text={item}
                                    />
                                })
                                : "-"}

                        </Box>
                    </Box>

                    <Button
                        style={{
                            px: 5,
                            fontSize: '18px',
                            fontWeight: 700,
                            mt: 5,
                        }}
                        onClick={() => router.push(`/recruiter/post_a_job/${id}`)}
                        label="Edit Job post"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box>
                        <SectionTitle title="About this role" />

                        <Box
                            sx={{
                                bgcolor: '#F8F8FD',
                                p: 1.4,
                                mb: 2,
                                width: '100%',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '15px',
                                    fontWeight: 600,
                                    color: 'text.darkBlue',
                                }}
                            >
                                {totalApplicantCount} applied
                            </Typography>

                            <Box
                                sx={{
                                    width: '100%',
                                    height: 8,
                                    bgcolor: '#D6DDEB',
                                    mt: 1,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: calculateApplicantPercentage(
                                            data?.singleRecruiterJob?.vacancy,
                                            totalApplicantCount,
                                        ),
                                        bgcolor: '#56CDAD',
                                        height: '100%',
                                    }}
                                />
                            </Box>
                        </Box>

                        <AboutList
                            label="Designation"
                            value={data?.singleRecruiterJob?.designation?.name ?? "-"}
                        />
                        <AboutList
                            label="Expertise Level"
                            value={
                                data?.singleRecruiterJob?.expertiseLevel
                                    ? data?.singleRecruiterJob?.expertiseLevel?.toLowerCase()
                                    : "-"
                            }
                        />
                        <AboutList
                            label="Deadline"
                            value={
                                data?.singleRecruiterJob?.applicationDeadline
                                    ? moment(
                                        data?.singleRecruiterJob
                                            ?.applicationDeadline,
                                    ).format('MMM DD,YYYY')
                                    : '-'
                            }
                        />
                        <AboutList
                            label="Job Posted On"
                            value={moment(
                                data?.singleRecruiterJob?.dateCreated,
                            ).format('MMM DD,YYYY')}
                        />
                        <AboutList
                            label="Salary"
                            value={
                                data?.singleRecruiterJob?.minSalary &&
                                    data?.singleRecruiterJob?.maxSalary
                                    ? `${data?.singleRecruiterJob?.minSalary} - ${data?.singleRecruiterJob?.maxSalary}`
                                    : data?.singleRecruiterJob?.minSalary ||
                                    data?.singleRecruiterJob?.maxSalary
                            }
                        />
                        <AboutList
                            label="Job Type"
                            value={
                                data?.singleRecruiterJob?.jobType?.replace(
                                    '_',
                                    ' ',
                                ).toLowerCase() ?? '-'
                            }
                        />
                        <AboutList
                            label="Vacancy"
                            value={data?.singleRecruiterJob?.vacancy ?? '-'}
                        />
                        <AboutList
                            label="Remote"
                            value={data?.singleRecruiterJob?.isRemote ? "Yes" : "No"}
                        />

                        <AboutList
                            label="Job Location"
                            value={`${data?.singleRecruiterJob?.address?.completeAddress ? `${data?.singleRecruiterJob?.address?.completeAddress} , ` : ""} ${data?.singleRecruiterJob?.address?.city ? `${data?.singleRecruiterJob?.address?.city} , ` : ""} ${data?.singleRecruiterJob?.address?.country ?? ""}`}
                        />
                        <AboutList
                            label="Category"
                            value={data?.singleRecruiterJob?.category?.name}
                        />
                        <AboutList
                            label="Gender"
                            value={
                                data?.singleRecruiterJob?.gender ? data?.singleRecruiterJob?.gender.toLowerCase() :
                                    'Both'
                            }
                        />
                    </Box>
                    <Divider sx={{ my: 4 }} />
                    <Box>
                        <SectionTitle title="Job Link Share" />
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <SocialIcon
                                link="https://twitter.com/"
                                icon={<AiOutlineTwitter />}
                            />
                            <SocialIcon
                                link="https://linkedin.com/"
                                icon={<BiLogoLinkedin />}
                            />
                            <SocialIcon
                                link="https://www.instagram.com/"
                                icon={<AiOutlineInstagram />}
                            />
                            <SocialIcon
                                link="https://www.facebook.com/"
                                icon={<BiLogoFacebook />}
                            />
                        </Box>
                    </Box>
                    <Divider sx={{ my: 4 }} />
                    <Box>
                        <SectionTitle title="Required Skills" />

                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                flexWrap: 'wrap',
                                mt: 2,
                            }}
                        >
                            {data?.singleRecruiterJob?.requiredSkills?.edges?.length > 0 ? data?.singleRecruiterJob?.requiredSkills?.edges.map(
                                (item) => (
                                    <Box
                                        key={`skills_${item.node.name}`}
                                        sx={{
                                            px: 3.5,
                                            py: 1.5,
                                            bgcolor: 'primary.extraLight',
                                            borderRadius: 10,
                                            color: 'common.blue',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {item?.node.name}
                                    </Box>
                                ),
                            ) : <Typography
                                sx={{
                                    textAlign: 'center',
                                    color: 'grey',
                                    fontSize: '15px',
                                }}
                            >
                                No skills available
                            </Typography>}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Typography sx={{ fontSize: '30px', fontWeight: 800, mb: 3 }}>
                Applicants List
            </Typography>
            {id ? (
                <ApplicantList
                    setTotalApplicantCount={setTotalApplicantCount}
                    initialFilter={{ job: id }}
                    hideFilter
                />
            ) : null}
        </Box>
    );
};

export default JobPostDetail;
