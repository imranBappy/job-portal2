import styled from '@emotion/styled';
import {
    FormControl as MuiFormControl,
    InputLabel,
    MenuItem,
    Select,
    FormHelperText,
} from '@mui/material';
import React from 'react';
const FormControl = styled(MuiFormControl)({
    [`& .MuiInputBase-root`]: {
        borderRadius: 100,
    },
    [`& .MuiSelect-select`]: {
        padding: '14px 18px',
        fontFamily: 'Nunito',
        fontSize: '14px',
        fontWeight: '400',
    },
    // label transform
    [`& .MuiInputLabel-formControl`]: {
        transform: 'translate(5px, -35px)',
    },
    // border color in normal state
    [`& .MuiOutlinedInput-notchedOutline`]: {
        borderColor: '#1C3E5E',
    },
});

const LabeledSelectField = (props) => {
    const {
        disabled,
        label,
        options = [],
        register,
        required = false,
        helperText,
        ...rest
    } = props;
    return (
        <FormControl
            fullWidth
            sx={{
                mt: '3.5rem',
                ...rest.sx,
            }}
        >
            <InputLabel
                sx={{
                    color: 'text.primary',
                    fontFamily: 'Nunito',
                    fontSize: '1rem',
                    fontWeight: '700',
                }}
                id="demo-simple-select-label"
            >
                {label}
            </InputLabel>
            <Select
                disabled={disabled}
                {...(register
                    ? { ...register(props.name, required) }
                    : { name: props.name })}
                {...rest}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText id="my-helper-text">{helperText}</FormHelperText>
        </FormControl>
    );
};

export default LabeledSelectField;
