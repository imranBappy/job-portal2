import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormHelperText } from '@mui/material';

export default function CCheckbox(props) {
    return (
        <FormControl
            required={props.required ? props.required : false}
            error={props.error ? props.error : false}
            style={{ ...props.style }}
            sx={{ ...props.sx }}
        >
            <FormControlLabel
                sx={{
                    '& .MuiFormControlLabel-label': {
                        color: 'text.darkBlue',
                        ...props.labelStyle,
                    },
                }}
                control={
                    <Checkbox
                        required={props.required ? props.required : false}
                        onChange={props.onChange}
                        checked={props.value ? props.value : false}
                        inputProps={props.inputProps}
                    />
                }
                label={props.label}
            />
            {props?.error ? (
                <FormHelperText sx={{ color: 'red' }}>
                    {props?.error}
                </FormHelperText>
            ) : null}
        </FormControl>
    );
}
