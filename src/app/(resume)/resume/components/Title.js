import { Box, Typography } from '@mui/material';
import React from 'react';

const Title = ({ title, subTitle, ...rest }) => {
    return (
        <Box
            {...rest}
            mb={5}
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                ...rest.sx,
            }}
        >
            <Typography
                color="text.darkBlue"
                align="center"
                variant="h2"
                maxWidth={500}
                fontWeight={800}
            >
                {title}
            </Typography>
            <Typography
                align="center"
                variant="subHeader2"
                mt={1}
                color="text.lightBlue"
            >
                {subTitle}
            </Typography>
        </Box>
    );
};

export default Title;
