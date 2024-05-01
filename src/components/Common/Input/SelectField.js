import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
const SelectField = (props) => {
    const {
        register,
        borderRadius = 100,
        label,
        style,
        required,
        options,
        height,
        ...rest
    } = props;
    return (
        <FormControl

            fullWidth
            sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderRadius: borderRadius,
                        borderColor: style.borderColor,
                        borderWidth: style.borderWidth,

                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#3f51b5',
                    },
                },
                ...style,
            }}
        >
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                {...(register
                    ? { ...register(props.name, required) }
                    : { name: props.name })}
                {...rest}
                sx={{
                    height: height,
                    color: style.color,
                    fontWeight: style.fontWeight,
                }}

            >
                {options?.map((op, index) => (
                    <MenuItem key={index} value={op.value}>
                        {op.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectField;
