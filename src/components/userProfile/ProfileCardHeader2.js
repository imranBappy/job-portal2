import { Add } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';

const ProfileCardHeader2 = ({ title, onOpen }) => {
    return (
        <>
            {/* <ProfileCardHeader2 title="Skills" /> */}
            <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Typography variant="h6" color={'text.primary'}>
                    {title}
                </Typography>
                <Button
                    onClick={onOpen}
                    variant="outlined"
                    style={{
                        borderColor: '#D6DDEB',
                        borderRadius: '0',
                        maxWidth: 40,
                        mxaHeight: 40,
                    }}
                >
                    <Add />
                </Button>
            </Box>
        </>
    );
};

export default ProfileCardHeader2;
