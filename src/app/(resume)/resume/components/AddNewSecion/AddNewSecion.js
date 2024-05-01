import { Box, Typography } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const AddNewSecion = ({ label, openLinks, setOpenLinks, sx, ...rest }) => {
    const handleOpenLink = () => {
        setOpenLinks(!openLinks);
    };
    return (
        <Box
            onClick={handleOpenLink}
            display={'flex'}
            gap={2}
            color="primary.main"
            sx={{ cursor: 'pointer', mb: 3, ...sx }}
        >
            {!openLinks ? (
                <AddIcon width={50} height={50} />
            ) : (
                <RemoveIcon width={50} height={50} />
            )}

            <Typography>{label}</Typography>
        </Box>
    );
};

export default AddNewSecion;
