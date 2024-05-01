import React from 'react';
import Btn from '@mui/material/Button';

function Button(props) {
    const {
        style,
        sx,
        fullWidth,
        variant,
        isLoading,
        disabled,
        children,
        ...rest
    } = props;
    return (
        <Btn
            {...rest}
            sx={{
                textTransform: 'none',
                boxShadow: 'none',
                color: 'primary',
                position: 'relative',
                borderWidth: '2px',
                fontWeight: 'bold',
                borderRadius: '50px 50px',
                '&:hover': {
                    borderWidth: '2px',
                    fontWeight: 'bold',
                },
                ...style,
                ...sx,
            }}
            variant={variant ? variant : 'contained'}
            disabled={isLoading || disabled}
            color="primary"
            fullWidth={fullWidth}

        >
            {props.isLoading ? 'Loading...' : props.label || children}
        </Btn>
    );
}

export default Button;
