import Button from '@/components/Common/UI/Button';
import { Delete, Edit } from '@mui/icons-material';
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Typography,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';
import PlaceIcon from '@mui/icons-material/Place';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import WorkIcon from '@mui/icons-material/Work';
const ResumeInfoCard = ({
    handleDelete,
    handleEdit,
    data,
    experience,
    ...rest
}) => {
    const {
        designationName,
        institute,
        location = 'Location',
        degree,
        company,
    } = data;
    return (
        <Card
            {...rest}
            sx={{
                boxShadow: 'none',
                borderColor: 'rgba(28, 62, 94, 0.75)',
                borderRadius: '30px',
                border: '2px solid',
                '&:hover': {
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    borderColor: 'rgba(28, 62, 94, 0.75)',
                    borderRadius: '30px',
                    border: '2px solid',
                },
            }}
        >
            <CardActionArea>
                <CardContent
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                            padding: '10px',
                        }}
                    >
                        <Typography
                            style={{
                                fontWeight: '700',
                                fontSize: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 5,
                            }}
                        >
                            {designationName ? (
                                <Image
                                    src="/icons/jobTitle.svg"
                                    width={24}
                                    height={24}
                                    alt="jonTitle"
                                />
                            ) : (
                                <Image
                                    src="/icons/Institute.svg"
                                    width={24}
                                    height={24}
                                    alt="Institute"
                                />
                            )}
                            {designationName || institute}
                        </Typography>
                        <Typography
                            style={{
                                fontWeight: '700',
                                fontSize: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 5,
                            }}
                        >
                            <PlaceIcon
                                src="/icons/linkedin-login.svg"
                                width={24}
                                height={24}
                                color="error"
                                alt="Logo"
                            />
                            {location}
                        </Typography>

                        <Typography
                            style={{
                                fontWeight: '700',
                                fontSize: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 5,
                            }}
                        >
                            {degree ? (
                                <Image
                                    src="/icons/degree.svg"
                                    width={24}
                                    height={24}
                                    alt="degree"
                                />
                            ) : (
                                <Image
                                    src="/icons/Company.svg"
                                    width={24}
                                    height={24}
                                    alt="Company"
                                />
                            )}

                            {degree || company}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            gap: 1,
                        }}
                    >
                        <Button style={{ width: '100px' }} onClick={handleEdit}>
                            <Edit fontSize="small" />
                            <Typography ml={1}>Edit</Typography>
                        </Button>
                        <Button
                            onClick={handleDelete}
                            style={{
                                borderColor: 'red',
                                width: '100px',
                            }}
                            variant="outlined"
                        >
                            <Delete color="error" fontSize="small" />
                            <Typography color="error" ml={1}>
                                Delete
                            </Typography>
                        </Button>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ResumeInfoCard;
