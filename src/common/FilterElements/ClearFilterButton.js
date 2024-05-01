import Button from '@/components/Common/UI/Button';
import React from 'react';

const ClearFilterButton = ({ onClick }) => {
    return (
        <Button
            onClick={onClick}
            style={{
                border: 1,
                borderColor: 'primary.main',
                background: 'transparent',
                color: 'primary.main',
                borderRadius: 0,
                fontWeight: 700,
                borderRadius: 10,
                '&:hover': {
                    backgroundColor: 'primary.light',
                    boxShadow: 'none',
                },
            }}
            label="Clear All Filter"
        />
    );
};

export default ClearFilterButton;
