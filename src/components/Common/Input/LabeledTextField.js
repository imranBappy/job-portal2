import styled from '@emotion/styled';
import {
    TextField as MuiTextField,
    inputLabelClasses,
    outlinedInputClasses,
} from '@mui/material';
import React from 'react';

const TextField = styled(MuiTextField)({
    [`& .${inputLabelClasses.formControl}`]: {
        transform: 'translate(5px, -35px)', // scale(1s.75)
    },

    [`& .${outlinedInputClasses.notchedOutline} span`]: {
        display: 'none',
    },
    [`& .${outlinedInputClasses.root}`]: {
        borderRadius: 100,
        '&:hover $notchedOutline': {
            borderColor: '#0079D1',
        },
        '&$focused $notchedOutline': {
            borderColor: '#0079D1',
        },
    },
    [`& .${outlinedInputClasses.input}`]: {
        padding: '14px 18px',
        fontFamily: 'Nunito',
        fontSize: '14px',
        fontWeight: '400',
    },
    [`& .${outlinedInputClasses.focused}`]: {
        borderColor: 'red',
    },
    [`& .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: '#1C3E5E',
    },
});
const LabeledTextField = (props) => {
    const { disabled, register, required = false, ...rest } = props;
    return (
        <TextField
            {...(register
                ? { ...register(props.name, required) }
                : { name: props.name })}
            {...rest}
            sx={{ mt: '3.5rem', ...rest.sx }}
            InputLabelProps={{
                ...rest.InputLabelProps,
                shrink: true,
                disableAnimation: true,
                sx: {
                    color: 'text.primary',
                    fontFamily: 'Nunito',
                    fontSize: '1rem',
                    fontWeight: '700',
                },
            }}
        />
    );
};

export default LabeledTextField;
