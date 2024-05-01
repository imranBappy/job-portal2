import Input from '@mui/material/TextField';
import React from 'react';

const TextField = (props) => {
    const { register, style, required, ...rest } = props;
    return (
        <Input
            {...(register
                ? { ...register(props.name, required) }
                : { name: props.name })}
            {...rest}

            sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderRadius: 100,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#3f51b5',
                    },
                },
                ...style,
            }}
        />
    );
};

export default TextField;