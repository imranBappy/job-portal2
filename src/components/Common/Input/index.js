import React from 'react';
import TextField from './TextField';
import CheckboxFiled from './CheckboxField';
import SelectField from './SelectField';

const Input = (props) => {
    const { type, ...rest } = props;

    switch (type) {
        case 'text':
            return <TextField type={type} {...rest} />;
        case 'email':
            return <TextField type={type} {...rest} />;
        case 'password':
            return <TextField type={type} {...rest} />;
        case 'checkbox':
            return <CheckboxFiled type={type} {...rest} />;
        case 'select':
            return <SelectField type={type} {...rest} />;
                default:
            return <TextField type={type} {...rest} />;
    }
};

export default Input;
