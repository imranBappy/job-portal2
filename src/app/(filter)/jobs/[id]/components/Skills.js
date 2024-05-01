import { Box, Typography } from '@mui/material';
import React from 'react';

const Skills = ({ data }) => {
    return (
        <Box mt={3}>
            <Typography variant="h3" mb={2} component="h3">
                Required Skills
            </Typography>
            <Box width={'100%'} display={'flex'} gap={2} flexWrap={'wrap'}>

                {
                    !data?.length && <Typography color="gray" variant="h6" mb={2} component="h6">
                        No skills required
                    </Typography>
                }
                {data?.map((item) => (
                    <Box bgcolor={'#0079d126'} py={1} px={2} key={item.id}>
                        <Typography color="primary">{item.name}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Skills;
