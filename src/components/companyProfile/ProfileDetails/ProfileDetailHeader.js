import { Add } from '@mui/icons-material';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import React from 'react';
import { LiaEdit } from 'react-icons/lia';

const ProfileDetailHeader = ({
    showAdd,
    showEdit,
    handleAdd,
    handleEdit,
    title,
}) => {
    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography
                variant="h5"
                color="text.darkBlue"
                sx={{ fontWeight: 800, fontFamily: 'Nunito, sans-serif' }}
            >
                {title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
                {showAdd ? (
                    <IconButton
                        sx={{
                            height: 40,
                            width: 40,
                            border: 2,
                            borderColor: 'primary.light',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 1,
                        }}
                        onClick={handleAdd}
                    >
                        <Add
                            sx={{ fontSize: 24, color: 'primary.dark' }}
                            color={'primary.dark'}
                        />
                    </IconButton>
                ) : null}

                {showEdit ? (
                    <Box
                        sx={{
                            height: 40,
                            width: 40,
                            border: 2,
                            borderColor: 'primary.light',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onClick={handleEdit}
                    >
                        <LiaEdit
                            fontSize={24}
                            color={theme.palette.primary.dark}
                        />
                    </Box>
                ) : null}
            </Box>
        </Box>
    );
};

export default ProfileDetailHeader;
