import React from 'react';

// ----- Material UI Provider -----
import { Box, Dialog, IconButton, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const CModal = ({ title, children, maxWidth, open, onClose, style }) => {
    return (
        <Dialog
            scroll='body'
            fullWidth={true}
            maxWidth={maxWidth ? maxWidth : 'sm'}
            className='common_modal'
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    width: '100vw',
                    ...style,
                },
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            open={open}
            onClose={onClose}
        >
            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3,
                        position: "sticky",
                        top: 0,
                        bgcolor: 'white',
                        p: 3,
                        pb: 1,
                        zIndex: 'modal'
                    }}
                >
                    <Box>
                        <Typography
                            variant="h5"
                            fontWeight={600}
                            sx={{ textTransform: 'capitalize' }}
                        >
                            {title}
                        </Typography>
                    </Box>
                    <IconButton onClick={onClose} size="small">
                        <CancelIcon sx={{ fontSize: 27 }} />
                    </IconButton>
                </Box>
                <Box p={3} pt={0}>
                    {children}
                </Box>
            </Box>
        </Dialog>
    );
};

export default CModal;
