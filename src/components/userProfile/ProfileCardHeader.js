import { Box, Typography } from '@mui/material';
import React from 'react';
import Button from '../Common/UI/Button';
import { Add, Edit } from '@mui/icons-material';

const ProfileCardHeader = ({ title, onClick, type = '', hideBtn }) => {

    return (
        <Box
            width={'100%'}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            gap={5}
        >
            <Typography variant="h6" color={'text.primary'}>
                {title}
            </Typography>
            {!hideBtn ? <Button
                onClick={onClick}
                variant="outlined"
                style={{
                    borderColor: '#D6DDEB',
                    borderRadius: '0',
                    maxWidth: 40,
                    mxaHeight: 40,
                }}
            >
                {type === 'add' ? <Add /> : <Edit />}
            </Button> : <></>}

        </Box>
    );
};

export default ProfileCardHeader;
