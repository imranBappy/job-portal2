import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

const CInput = ({
    name,
    label,
    value,
    type,
    placeholder,
    style,
    size,
    InputProps,
    required,
    error,
    disabled,
    onChange,
    boxStyle,
    register,
    onBlur,
    autoComplete,
    onKeyDown,
    ...rest
}) => {
    return (
        <Box sx={{ ...boxStyle }}>
            <Typography
                variant="bodyNormal"
                sx={{ fontWeight: 700, color: 'text.darkBlue' }}
            >
                {label}
            </Typography>

            <TextField
                {...(register
                    ? { ...register(name, required) }
                    : { name: name })}
                {...rest}
                sx={{
                    mt: 1,
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 10,
                        // overflow: 'hidden',
                        '& fieldset': {
                            borderRadius: 10,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#3f51b5',
                        },
                        // auto fill background color
                        '&:-webkit-autofill': {
                            '-webkit-box-shadow': '0 0 0 1000px white inset',
                            backgroundColor: 'white',
                        },
                        '&:-webkit-autofill:focus': {
                            '-webkit-box-shadow': '0 0 0 1000px white inset',
                            backgroundColor: 'white',
                        },
                        '&:-webkit-autofill:hover': {
                            '-webkit-box-shadow': '0 0 0 1000px white inset',
                            backgroundColor: 'white',
                        },

                    },
                    ...style,
                }}
                id="outlined-basic"
                variant="outlined"
                name={name}
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                color="primary"
                autoComplete={autoComplete}
                size={size ? size : 'normal'}
                InputProps={InputProps}
                placeholder={placeholder}
                required={required ? required : false}
                error={error ? error : false}
                disabled={disabled ? disabled : false}
                helperText={error ? error : ''}
                type={type ?? 'text'}
                value={value}
                onChange={onChange}
            />
        </Box>
    );
};

export default CInput;
