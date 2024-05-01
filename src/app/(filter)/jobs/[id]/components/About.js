import Progress from '@/components/Progress/Progress';
import calculatePersentage from '@/utils/calculatePersentage';
import { Box, Typography } from '@mui/material';
import React from 'react';

const About = ({ details, totalApplicant, vacancy }) => {
    const makeLowercase = (value) => {
        if (typeof value === "string") {
            return value.toLowerCase()
        }
        return value
    };
    return (
        <Box>
            <Typography variant="h3" mb={2} component="h3">
                About this role
            </Typography>

            <Box width={'100%'} bgcolor={`#F8F8FD`} p={2}>
                <Typography
                    sx={{
                        fontWeight: '700',
                    }}
                >
                    {totalApplicant} applied
                </Typography>
                <Progress
                    value={`${calculatePersentage(totalApplicant, vacancy)}%`}
                />
            </Box>
            <Box mt={3} display={'flex'} flexDirection={'column'} gap={2}>
                {details.map((detail = {
                    name: "",
                    value: ""
                }, index) => (
                    <Box
                        key={index}
                        display={'flex'}
                        justifyContent={'space-between'}
                        gap={2}
                    >
                        <Typography
                            color="text.secondary"
                            variant="body1"
                            component="p"
                        >
                            {detail.name}
                        </Typography>
                        <Typography
                            color="text.secondary"
                            variant="body1"
                            component="p"
                            sx={{
                                textTransform: 'capitalize'
                            }}
                        >
                            {makeLowercase(detail?.value) || "N/A"}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default About;