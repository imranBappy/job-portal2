import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';

function CheckboxFiled(props) {
    const { name, style, register, required, ...rest } = props;
    return (
        <FormControlLabel
            {...rest}
            name={name}
            {...(register ? { ...register(name, required) } : { name: name })}
            sx={{ ...style }}
            control={<Checkbox error={!!true} name={name} />}
        />
    );
}

export default CheckboxFiled;
