import { Search } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import React from 'react';

const FilterInput = ({ placeholder, onChange, value, name, label }) => {
    return (
        <TextField
            sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderRadius: 10,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#3f51b5',
                    },
                },
            }}
            size="small"
            name={name}
            value={value}
            label={label}
            onChange={onChange}
            placeholder={placeholder}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="start">
                        <Search />
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default FilterInput;
