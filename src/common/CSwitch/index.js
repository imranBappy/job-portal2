import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomSwitch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
        backgroundColor: 'white',
    },
}));

export default function CSwitch(props) {
    return (
        <FormControl
            required={props.required ? props.required : false}
            error={props.error ? props.error : false}
            style={{ ...props.style }}
            sx={{ ...props.sx }}
        >
            <FormControlLabel
                control={
                    <CustomSwitch
                        required={props.required ? props.required : false}
                        onChange={props.onChange}
                        checked={props.value ? props.value : false}
                        inputProps={props.inputProps}
                    />
                }
                label={props.label}
            />
        </FormControl>
    );
}
