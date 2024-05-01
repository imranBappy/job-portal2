import { Box, List, Typography } from '@mui/material';
import React from 'react';

const ListData = ({ sx, children }) => {
    return (
        <Box
            sx={{
                border: '1px solid rgba(28, 62, 94, 0.20)',
                width: '100%',
                ...sx,
            }}
        >
            <Typography
                sx={{
                    color: '#1C3E5E',
                    fontFamily: 'Nunito',
                    fontWeight: 700,
                    fontSize: '14px',
                    padding: '10px 0 10px 10px',
                    borderBottom: '1px solid rgba(28, 62, 94, 0.20)',
                }}
            >
                Ready to Use example
            </Typography>

            <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 300,
                }}
            >
                {children}
            </List>
        </Box>
    );
};

export default ListData;
