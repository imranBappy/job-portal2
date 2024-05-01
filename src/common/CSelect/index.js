import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import React from 'react';

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 70 * 4.5 + 8,
        },
    },
};

const CSelect = ({
    style,
    listData,
    display,
    value,
    label,
    selectValue,
    onChange,
    error,
    size,
    multiple,
    name,
    placeholder,
    disabled
}) => {
    return (
        <FormControl fullWidth sx={{ ...style }} size={size ? size : 'large'}>
            <Typography
                variant="bodyNormal"
                sx={{ fontWeight: 700, color: 'text.darkBlue' }}
            >
                {label}
            </Typography>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectValue}
                // label={label}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                MenuProps={MenuProps}
                multiple={multiple}
                name={name}
                sx={{ mt: 1, borderRadius: 10 }}
            >
                {listData.map((item, idx) => {
                    return (
                        <MenuItem key={`${label}_${idx}`} value={item[value]}>
                            {item[display]}
                        </MenuItem>
                    );
                })}
            </Select>
            <FormHelperText sx={{ color: 'red' }}>
                {error && error}
            </FormHelperText>
        </FormControl>
    );
};

export default CSelect;
