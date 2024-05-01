import Button from '@/components/Common/UI/Button';
import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import ShareIcon from '@mui/icons-material/Share';
import Image from 'next/image';
import { Images } from '@/utils/imagePath';
import Link from 'next/link';
import Toaster from '@/common/Toaster';


const handleType = (type) => {
    switch (type) {
        case 'FULL_TIME':
            return 'Full Time';
        case 'PART_TIME':
            return 'Part Time';
        case 'CONTRACT':
            return 'Contract';
        case 'TEMPORARY':
            return 'Temporary';
        case 'INTERNSHIP':
            return 'Internship';
        case 'VOLUNTEER':
            return 'Volunteer';
        case 'OTHER':
            return 'Other';
        default:
            return type;
    }

};

const Header = ({ data = {}, setOpen, applied }) => {
    const {
        company: { logoUrl, name, country } = {},
        title,
        jobType,
    } = data;
    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${data?.id}`)
        Toaster({
            type: 'success',
            message: 'Copied to share link'
        })
    }
    return (
        <Box
            sx={{
                backgroundImage: `url(/images/hero-bg.svg)`,
                width: '100%',
                height: '200px',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
        >
            <Container maxWidth="xl">
                <Box
                    height={200}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}

                >
                    <Box
                        sx={{
                            width: '100%',
                            height: '140px',
                            backdropFilter: 'blur(3.5px)',
                        }}
                        display={'flex'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        p={3}
                        border={'1px solid #D6DDEB'}
                        flexDirection={{
                            xs: 'column',
                            sm: 'column',
                            md: 'column',
                            lg: 'row',
                            xl: 'row',
                        }}
                        gap={2}

                        borderRadius={'20px'}
                    >
                        <Box
                            display={'flex'}
                            gap={3}
                            alignItems={'center'}
                            justifyContent={'center'}
                            py={2}
                        >

                            <Link href={`/companies/${data?.company?.id}`}>

                                <Image
                                    alt={data?.company?.name}
                                    src={logoUrl || Images.NO_IMAGE}
                                    width={80}
                                    height={80}
                                    style={{
                                        borderRadius: '5px',
                                    }}
                                />
                            </Link>
                            <Box
                                sx={{
                                    // height: 120,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                }}
                                gap={0.3}
                            >

                                <Typography variant="h3" mb={1} component="h1"
                                    fontSize={{
                                        xs: '1.5rem',
                                        sm: '1.5rem',
                                        md: '2rem',
                                    }}
                                >
                                    {title}
                                </Typography>

                                <Box display={'flex'} gap={1} flexWrap={{
                                    xs: 'wrap',
                                    sm: 'wrap',
                                    md: 'wrap',
                                    lg: 'nowrap',
                                    xl: 'nowrap',
                                }}>
                                    <Link href={`/companies/${data?.company?.id}`}>
                                        <Typography
                                            variant="body1"
                                            component="p"
                                            color="primary"
                                            fontWeight={700}
                                        >
                                            {name}
                                        </Typography>
                                    </Link>
                                    <Box display={'flex'}>
                                        <Typography
                                            color="text.secondary"
                                            variant="body1"
                                            component="p"
                                        >
                                            {country ? ` . ${country}` : ""}
                                        </Typography>
                                        <Typography
                                            color="text.secondary"
                                            variant="body1"
                                            component="p"
                                        >
                                            {jobType ? ` . ${handleType(jobType)}` : ""}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        <Box
                            display={'flex'}
                            gap={3}
                            alignItems={'center'}
                            justifyContent={{
                                xs: 'space-between',
                                sm: 'space-between',
                                md: 'space-between',
                                lg: 'flex-end',
                                xl: 'flex-end',
                            }}
                        >
                            <Box
                                sx={{
                                    borderRight: '1px solid #D6DDEB',
                                }}
                            >
                                <Button
                                    variant="normal"
                                    onClick={handleCopyLink}
                                >
                                    <ShareIcon
                                        color="text.secondary"
                                        width={32}
                                        height={32}
                                    />
                                </Button>

                            </Box>
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
                </Box>
            </Container>
        </Box>
    );
};

export default Header;
