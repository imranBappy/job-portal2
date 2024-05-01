import { Box, Typography } from '@mui/material';
import React from 'react';
import { PiPlusCircle } from 'react-icons/pi';

const ProfileCreateResume = () => {
    return (
        <Box
            sx={{
                width: '100%',
                height: 450,
                border: '1px dashed rgba(28, 62, 94, 0.75)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                background: '#F2F8FD;'

            }}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            flexDirection={'column'}
            gap={2}
        >
            <Box>
                <PiPlusCircle
                    style={{
                        fontSize: '4rem',
                        color: '#1C3E5E',
                        fontWeight: 300,
                    }}
                />
            </Box>
            <Typography
                fontSize={"1.5rem"}
                variant="h6" color="text.primary">
                Create New Resume
            </Typography>
        </Box>
    );
};

export default ProfileCreateResume;
