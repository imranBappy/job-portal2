'use client'

import { Images } from '@/utils/imagePath';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const CountBox = ({ title, count, isEven }) => {
    return (
        <Box
            sx={{
                border: 2,
                borderColor: '#D6DDEB',
                p: 3,
                pb: 0,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Typography
                variant="bodyNormal"
                sx={{ fontWeight: 600, color: 'text.darkBlue' }}
            >
                {title}
            </Typography>
            <Typography
                sx={{
                    fontSize: '72px',
                    fontWeight: 600,
                    color: 'text.darkBlue',
                }}
            >
                {count}
            </Typography>
            <Box
                sx={{
                    height: 60,
                    width: 70,
                    position: 'absolute',
                    bottom: 0,
                    right: 30,
                }}
            >
                <Image
                    src={
                        isEven
                            ? Images.DOC_ICON_LOGO
                            : Images.QUESTION_ICON_LOGO
                    }
                    style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                    }}
                    alt="logo"
                />
            </Box>
        </Box>
    );
};

export default CountBox;
