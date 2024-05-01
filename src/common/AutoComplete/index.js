import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, FormHelperText, Typography } from '@mui/material';

export default function AutoComplete(props) {
    let options = props.options ? props.options : [];
    return (
        <Box sx={{ ...props.boxStyle }}>
            <Typography
                variant="bodyNormal"
                sx={{ fontWeight: 700, color: 'text.darkBlue' }}
            >
                {props.label}
            </Typography>

            <Autocomplete
                size={props.size}
                value={props.value}
                onChange={props.onOptionChange}

                options={options}
                disabled={!!props.disabled}
                isOptionEqualToValue={props.isOptionEqualToValue}
                loading={props.loading}
                getOptionLabel={props.getOptionLabel}
                multiple={props.multiple ? props.multiple : false}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        margin="normal"
                        sx={{
                            marginTop: 1,
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderRadius: 10,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#3f51b5',
                                },
                            },
                            ...props.style,
                        }}
                        label={props.inputLabel}
                        variant="outlined"
                        classes={{ root: 'material-input' }}
                        onChange={props.onQueryChange}
                    />
                )}
            />
            <FormHelperText
                sx={{
                    color: 'red',
                    ml: '12px',
                    mt: props?.error ? -1 : 0,
                    ...props.errorStyle,
                }}
            >
                {props?.error && props.error}
            </FormHelperText>
        </Box>
    );
}
