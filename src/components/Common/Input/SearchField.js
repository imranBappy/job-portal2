import { Search } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import React from 'react';
import LabeledTextField from './LabeledTextField';
import { useForm } from 'react-hook-form';

const SearchField = ({ handleChange, fullWidth }) => {
    const {
        register,
        formState: { errors },
    } = useForm();
    return (
        <LabeledTextField
            onChange={handleChange}
            fullWidth={fullWidth}
            {...(register
                ? { ...register(props.name, required) }
                : { name: props.name })}
            {...rest}
            required={{ required: '' }}
            name="institute"
            label="Institute"
            type="text"
            helperText={errors?.name?.message}
            error={!!errors?.name}
            placeholder="Search for a skill"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <Search color="primary" fontSize="medium" />
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default SearchField;
