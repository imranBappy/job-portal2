import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Images } from '@/utils/imagePath';
const Company = ({ data }) => {
    const { name, description, logoUrl, id } = data || {};
    return (
        <Grid
            display={'flex'}
            gap={10}
            alignItems={'center'}
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
                    lg: '50%',
                    xl: '50%',
                }}
            >
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'space-between'}
                    gap={5}
                >
                    <Box display={'flex'} gap={3}>
                        <Image
                            src={logoUrl || Images.NO_IMAGE}
                            width={80}
                            height={80}
                            alt="-"
                        />
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            justifyContent={'space-between'}
                        >
                            <Typography variant="h3" component="h3">
                                {name}
                            </Typography>
                            <Link
                                href={`/companies/${id}`}
                                style={{
                                    textDecoration: 'none',
                                    color: '#0079D1',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 5,
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography
                                    pt={2}
                                    fontSize={'1.4rem'}
                                    variant="h5"
                                    mb={2}
                                    component="p"
                                >
                                    Read more about Stripe
                                </Typography>
                                <ArrowRightAltIcon />
                            </Link>
                        </Box>
                    </Box>
                    <Box>
                        <Typography
                            color="text.secondary"
                            variant="body1"
                            mb={2}
                            component="p"
                        >
                            {description}
                        </Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid
                flexGrow={1}
                width={{
                    xs: '100%',
                    sm: '100%',
                    md: '100%',
                    lg: '50%',
                    xl: '50%',
                }}
            >
                <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    flexDirection={{
                        xs: 'column',
                        sm: 'column',
                        md: 'column',
                        lg: 'row',
                        xl: 'row',
                    }}
                    gap={2}
                >
                    <Box>
                        <Image
                            alt="-"
                            src="/images/comp1.svg"
                            width={550 - 150}
                            height={550 - 150}
                            style={{
                                borderRadius: 5,
                                // width:"100%",
                                // height:"100%"
                            }}
                        />
                    </Box>
                    <Box>
                        <Box>
                            <Image
                                alt="-"
                                src="/images/comp2.svg"
                                width={250 - 100}
                                height={250 - 100}
                                style={{
                                    width: "100%",
                                    height: "100%"
                                }}
                            />
                        </Box>
                        <Box>
                            <Image
                                alt="-"
                                src="/images/comp3.svg"
                                width={250 - 100}
                                height={250 - 100}
                                style={{
                                    width: "100%",
                                    height: "100%"
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Company;
