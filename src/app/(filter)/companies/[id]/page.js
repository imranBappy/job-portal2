'use client';
import { Grid, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect } from 'react';
import Description from './components/Description';
import About from './components/About';
import { useQuery } from '@apollo/client';
import CompanyHeader from './components/CompanyHeader';
import TeamCard from '@/components/Common/card/Team/Team';
import { COMPANY_DETAILS_QUERY } from '@/graphql/company/companyQuery';
import moment from 'moment';
import Loading from '../../loading';
import { notFound } from 'next/navigation';


const CompanyDetails = ({ params }) => {
    const [setOpen] = React.useState(false);
    const { data, loading, error } = useQuery(COMPANY_DETAILS_QUERY, {
        variables: {
            id: params.id
        }
    })

    const company = data?.singleCompany;
    const teams = company?.teamMembers?.edges?.map(item => item.node);

    const socialMediaLinks = JSON.parse(company?.socialMediaLinks || "{}");
    const socialLinks = [];
    Object.keys(socialMediaLinks).forEach((key) => {
        socialLinks.push({
            name: key,
            urlLink: socialMediaLinks[key]
        })
    });

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
            <CompanyHeader setOpen={setOpen} data={company} />
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

                        <Description data={company?.description} />



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
                        >
                            <About
                                links={socialLinks}
                                totalApplicant={10}
                                vacancy={10}
                                details={[
                                    {
                                        name: 'Company Name',
                                        value: company?.name,
                                    },
                                    {
                                        name: 'Category',
                                        value: company?.industry?.name,
                                    },
                                    {
                                        name: 'Location',
                                        value: (company?.city || company?.country) ? `${company?.city}, ${company?.country}` : '-',
                                    },
                                    {
                                        name: 'Established ',
                                        value: company?.foundedDate ? moment(company?.foundedDate).format('YYYY') : "-"
                                    },

                                    {
                                        name: 'Employees',
                                        value: company?.employeesCount,
                                    },
                                    {
                                        name: 'Phone',
                                        value: company?.contactPhone,
                                    },
                                    {
                                        name: 'Email',
                                        value: company?.contactEmail,
                                    },
                                    {
                                        name: 'Website',
                                        value: company?.website,
                                    },
                                    {
                                        name: 'Social Media',
                                        value: 'Both',
                                    },
                                ]}
                            />
                            {/* <Divider />
                            <Link href={`/jobs`}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    fullWidth
                                    sx={{
                                        height: 54,
                                        fontSize: '18px',
                                        fontWeight: 700,
                                        textTransform: 'capitalize',
                                        background: "#0079D1"
                                    }}
                                >
                                    Job Available
                                </Button>
                            </Link> */}
                        </Box>
                    </Grid>
                </Grid>

                <Box

                    mb={5}
                >
                    <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        gap={5}
                        flexWrap={'wrap'}
                    >
                        <Typography variant="h3" mb={2} component="h3">
                            Team
                        </Typography>
                    </Box>

                    <Box
                        display={'flex'}
                        gap={5}
                        flexWrap={'wrap'}

                        justifyContent={{
                            xs: 'center',
                            sm: 'center',
                            md: 'center',
                            lg: 'flex-start',
                            xl: 'flex-start',
                        }}

                    >{
                            teams?.length === 0 && <Typography variant="h6" sx={{
                                width: '100%',
                                textAlign: 'center',
                                color: '#7C8493',
                                mt: 5

                            }}>There are no any team members   </Typography>
                        }
                        {

                            teams?.map((item) => <TeamCard data={item} key={item.id} />)
                        }

                    </Box>

                </Box>

                {/* <LatestJob companyId={params.id} /> */}
            </Container >
        </>
    );
};

export default CompanyDetails;
