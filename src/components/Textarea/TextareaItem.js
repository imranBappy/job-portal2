import React from 'react';

const TextareaItem = ({ ...rest }) => {
    return (
        <li>
            <input
                style={{
                    border: 'none',
                    outline: 'none',
                    width: '100%',
                    color: '#1C3E5E',
                    fontFamily: 'Nunito',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '700',
                    lineHeight: '160%',
                }}
                {...rest}
                type="text"
            />
        </li>
    );
};

export default TextareaItem;
