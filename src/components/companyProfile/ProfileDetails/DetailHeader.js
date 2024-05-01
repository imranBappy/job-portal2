import { Images } from '@/utils/imagePath';
import { Settings } from '@mui/icons-material';
import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import { AiOutlineFire } from 'react-icons/ai';
import { BsBuildings } from 'react-icons/bs';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { LiaEdit } from 'react-icons/lia';
import { MdOutlineLocationOn } from 'react-icons/md';
import CudCompanyDetail from './CudCompanyDetail';
import { useState } from 'react';
import moment from 'moment';

const DataCounts = ({ icon, data, title }) => {
    return (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', width: { xs: "40%", sm: "auto" } }}>
            <Box
                sx={{
                    height: 44,
                    width: 44,
                    borderRadius: '50%',
                    border: 1,
                    borderColor: '#D6DDEB',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {icon}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="bodyNormal">{title}</Typography>
                <Typography
                    fontWeight={600}
                    color="text.darkBlue"
                    variant="bodyNormal"
                >
                    {data}
                </Typography>
            </Box>
        </Box>
    );
};


const DetailHeader = ({ data, refetch, userId }) => {
    const theme = useTheme();
    const isTabletView = useMediaQuery('(max-width:1250px)');
    const isMobileView = useMediaQuery('(max-width:750px)');

    const [open, setOpen] = useState(false);

    const onClose = () => {
        setOpen(false);
    };

    return (
        <Box
            sx={{
                mt: 4,
                display: 'flex',
                gap: 4,
                alignItems: 'center',
                flexDirection: isTabletView ? "column" : "row"
            }}
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Box
                    sx={{
                        height: 190,
                        minWidth: 190,
                        position: 'relative',
                        border: 2,
                        borderRadius: "50%",
                        overflow: 'hidden',
                        borderColor: "rgba(0,0,0,0.1)"
                    }}
                >
                    <Image
                        src={data?.logoUrl}
                        width={190}
                        height={190}
                        style={{ borderRadius: '50%', objectFit: 'cover' }}
                        alt="company logo"
                    />
                    {/* <Box
                    sx={{
                        border: '1px solid #D6DDEB',
                        height: 40,
                        width: 40,
                        position: 'absolute',
                        top: 20,
                        bgcolor: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    >
                    <LiaEdit fontSize={24} color={theme.palette.primary.dark} />
                </Box> */}
                </Box>
            </Box>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, flexWrap: 'wrap', alignItems: 'center', mb: { xs: 2, sm: 0 } }}>
                    <Typography sx={{ fontSize: { xs: "2rem", sm: "3rem" }, fontWeight: 600, }} color="text.darkBlue">
                        {data?.name}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                        <IconButton
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                border: 2,
                                borderColor: 'primary.light',
                                borderRadius: 0,
                                color: 'primary.dark',
                                p: 1,
                                width: 170,

                            }}
                            onClick={() => setOpen(true)}
                        >
                            <Settings />
                            <Typography fontWeight={600}>
                                Profile Settings
                            </Typography>
                        </IconButton>
                    </Box>
                </Box>
                {data?.website ?
                    <Typography
                        onClick={() => window.open(data?.website, '_blank')}
                        sx={{ fontWeight: 600, mt: 3, cursor: "pointer" }}
                        variant="subHeader3"
                        color="primary.dark"
                    >
                        {data?.website}
                    </Typography>

                    : "-"}


                <Box
                    sx={{
                        mt: 2,
                        display: 'flex',
                        gap: 5,
                        alignItems: 'center',
                        flexWrap: "wrap",
                        gap: 2
                    }}
                >
                    <DataCounts

                        icon={
                            <AiOutlineFire
                                fontSize={22}
                                color={theme.palette.primary.main}
                            />
                        }
                        title="Founded"
                        data={data?.foundedDate ? moment(data.foundedDate).format("DD MMM YYYY") : '-'}
                    />
                    <DataCounts

                        icon={
                            <HiOutlineUserGroup
                                fontSize={22}
                                color={theme.palette.primary.main}
                            />
                        }
                        title="Employees"
                        data={data?.employeesCount ? data.employeesCount : '-'}
                    />
                    <DataCounts

                        icon={
                            <MdOutlineLocationOn
                                fontSize={25}
                                color={theme.palette.primary.main}
                            />
                        }
                        title="Location"
                        data={`${data?.teamMembers?.totalCount} Countries`}
                    />
                    <DataCounts

                        icon={
                            <BsBuildings
                                fontSize={20}
                                color={theme.palette.primary.main}
                            />
                        }
                        title="Industry"
                        data={data?.industry ? data.industry.name : '-'}
                    />
                </Box>
            </Box>
            <CudCompanyDetail
                open={open}
                onClose={onClose}
                data={data}
                refetch={refetch}
                userId={userId}
            />
        </Box >
    );
};

export default DetailHeader;
