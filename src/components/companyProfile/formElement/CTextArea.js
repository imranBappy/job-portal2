import {
    Box,
    FormHelperText,
    TextareaAutosize,
    Typography,
} from '@mui/material';
import React from 'react';

const CTextArea = ({
    label,
    name,
    value,
    minRow,
    style,
    error,
    onChange,
    placeholder,
    maxRows
}) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography
                variant="bodyNormal"
                sx={{ fontWeight: 700, color: 'text.darkBlue' }}
            >
                {label}
            </Typography>
            <TextareaAutosize
                minRows={minRow || 5}
                onChange={onChange}
                maxLength={maxRows}
                value={value}
                name={name}
                placeholder={placeholder}
                style={{
                    borderRadius: 20,
                    borderColor: 'rgba(0,0,0,0.2)',
                    padding: 10,
                    fontFamily: 'inherit',
                    ...style,
                }}
            />
            {error ? (
                <FormHelperText sx={{ color: 'red' }}>{error}</FormHelperText>
            ) : null}
        </Box>
    );
};

export default CTextArea;
