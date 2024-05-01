import { Box } from '@mui/material';
import React from 'react';
import TextareaItem from './TextareaItem';

const Textarea = ({ children , sx}) => {
    return (
        <Box
            minHeight={200}
            border="1px solid rgba(28, 62, 94, 0.50)"
            borderRadius="12px"
            sx={{
                ...sx,
            }}
        >
            <ul
                style={{
                    padding: '5px 30px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                }}
            >
                {children}
            </ul>
        </Box>
    );
};

export default Textarea;
